import { mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

interface TimeApiResponse {
  datetime: string;
}

interface Metadata {
  nodes: unknown[];
  edges: unknown[];
}

async function getUtcTime(): Promise<string> {
  try {
    const response = await fetch('http://worldtimeapi.org/api/timezone/UTC', {
      signal: AbortSignal.timeout(5000),
    });
    const data: TimeApiResponse = await response.json();
    return data.datetime;
  } catch (error) {
    console.warn(`Warning: Could not fetch time from worldtimeapi.org (${error}). Using local UTC time.`);
    return new Date().toISOString();
  }
}

async function main(): Promise<void> {
  const rootDir = process.cwd();
  const memoriesDir = join(rootDir, '.memories');
  
  // Locate templates relative to this script
  const scriptDir = dirname(fileURLToPath(import.meta.url));
  const templatesDir = join(scriptDir, '..', 'assets', 'templates');
  
  // Create .memories directory if it doesn't exist
  try {
    mkdirSync(memoriesDir, { recursive: true });
    console.log(`Creating .memories directory at ${memoriesDir}`);
  } catch {
    console.log(`.memories directory already exists at ${memoriesDir}`);
  }
  
  // Initialize metadata.json if not exists
  const metadataPath = join(memoriesDir, 'metadata.json');
  try {
    const metadataFile = Bun.file(metadataPath);
    if (!(await metadataFile.exists())) {
      const initialMetadata: Metadata = { nodes: [], edges: [] };
      await Bun.write(metadataPath, JSON.stringify(initialMetadata, null, 2));
      console.log('Created metadata.json');
    }
  } catch {
    console.log('metadata.json already exists');
  }
  
  // Copy templates
  const utcTime = await getUtcTime();
  console.log(`Using UTC time: ${utcTime}`);
  
  const coreFiles = [
    'projectbrief.md',
    'productContext.md',
    'activeContext.md',
    'systemPatterns.md',
    'techContext.md',
    'progress.md',
    '_index.md',
  ];
  
  for (const filename of coreFiles) {
    const destPath = join(memoriesDir, filename);
    const destFile = Bun.file(destPath);
    
    if (!(await destFile.exists())) {
      const srcPath = join(templatesDir, filename);
      const srcFile = Bun.file(srcPath);
      
      if (await srcFile.exists()) {
        let content = await srcFile.text();
        
        // Replace placeholder
        content = content.replace('{{UTC_DATETIME}}', utcTime);
        
        await Bun.write(destPath, content);
        console.log(`Created ${filename}`);
      } else {
        console.log(`Warning: Template ${filename} not found at ${srcPath}`);
      }
    } else {
      console.log(`File ${filename} already exists. Skipping.`);
    }
  }
  
  console.log('\nMemory Bank initialized successfully.');
  console.log("Don't forget to run 'sync_metadata.ts' to update the graph.");
}

main().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});