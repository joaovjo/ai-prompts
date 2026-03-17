import { readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';

interface TimeApiResponse {
  datetime: string;
}

interface Args {
  command: string;
  name?: string;
  request?: string;
  id?: string;
  message?: string;
}

function parseArgs(): Args {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('Usage: bun run task_manager.ts <command> [options]');
    console.log('Commands:');
    console.log('  add <name> [--request <request>]  - Add a new task');
    console.log('  update <id> <message>              - Update a task');
    console.log('  list                               - List all tasks');
    process.exit(1);
  }
  
  const command = args[0];
  const parsed: Args = { command };
  
  if (command === 'add') {
    parsed.name = args[1];
    parsed.request = '';
    
    // Parse --request flag
    const requestIndex = args.indexOf('--request');
    if (requestIndex !== -1 && args[requestIndex + 1]) {
      parsed.request = args[requestIndex + 1];
    }
  } else if (command === 'update') {
    parsed.id = args[1];
    parsed.message = args[2];
  } else if (command !== 'list') {
    console.log(`Unknown command: ${command}`);
    process.exit(1);
  }
  
  return parsed;
}

async function getUtcTime(): Promise<string> {
  try {
    const response = await fetch('http://worldtimeapi.org/api/timezone/UTC', {
      signal: AbortSignal.timeout(5000),
    });
    const data: TimeApiResponse = await response.json();
    return data.datetime;
  } catch {
    return new Date().toISOString();
  }
}

async function main(): Promise<void> {
  const args = parseArgs();
  const rootDir = process.cwd();
  const memoriesDir = join(rootDir, '.memories');
  const scriptDir = dirname(fileURLToPath(import.meta.url));
  
  // Check if .memories directory exists
  const memoriesDirFile = Bun.file(memoriesDir);
  if (!(await memoriesDirFile.exists())) {
    console.log('Error: .memories directory not found. Run init_memories.ts first.');
    return;
  }
  
  if (args.command === 'add') {
    if (!args.name) {
      console.log('Error: Task name is required for add command.');
      process.exit(1);
    }
    
    // Generate ID
    const files = readdirSync(memoriesDir);
    const existingTasks = files.filter((f) => f.startsWith('TASK'));
    const nextId = existingTasks.length + 1;
    const taskId = `TASK${String(nextId).padStart(3, '0')}`;
    
    const utcTime = await getUtcTime();
    
    // Load template
    const templatePath = join(scriptDir, '..', 'assets', 'templates', 'task_template.md');
    const templateFile = Bun.file(templatePath);
    let content = await templateFile.text();
    
    content = content.replace('{{TASK_ID}}', taskId);
    content = content.replace('{{TASK_NAME}}', args.name);
    content = content.replace('{{UTC_DATETIME}}', utcTime);
    content = content.replace('{{DATE}}', utcTime);
    content = content.replace('{{REQUEST}}', args.request ?? '');
    
    const filename = `${taskId}-${args.name.replace(/\s+/g, '-').toLowerCase()}.md`;
    const filepath = join(memoriesDir, filename);
    
    await Bun.write(filepath, content);
    
    // Update index
    const indexPath = join(memoriesDir, '_index.md');
    const indexFile = Bun.file(indexPath);
    if (await indexFile.exists()) {
      const indexContent = await indexFile.text();
      await Bun.write(indexPath, `${indexContent}\n- [${taskId}] ${args.name} - Pending`);
    }
    
    console.log(`Created task ${taskId}: ${filename}`);
  } else if (args.command === 'update') {
    if (!args.id || !args.message) {
      console.log('Error: Task ID and message are required for update command.');
      process.exit(1);
    }
    
    // Find file by ID
    const files = readdirSync(memoriesDir);
    let targetFile: string | null = null;
    
    for (const f of files) {
      if (f.startsWith(args.id!)) {
        targetFile = f;
        break;
      }
    }
    
    if (!targetFile) {
      console.log(`Task ${args.id} not found.`);
      return;
    }
    
    const filepath = join(memoriesDir, targetFile);
    const utcTime = await getUtcTime();
    
    const file = Bun.file(filepath);
    const content = await file.text();
    const updateText = `\n### ${utcTime}\n- ${args.message}\n`;
    
    await Bun.write(filepath, content + updateText);
    
    console.log(`Updated ${targetFile}`);
  } else if (args.command === 'list') {
    console.log('Tasks:');
    const files = readdirSync(memoriesDir);
    for (const f of files) {
      if (f.startsWith('TASK')) {
        console.log(` - ${f}`);
      }
    }
  }
  
  // Auto-sync
  const syncScriptPath = join(scriptDir, 'sync_metadata.ts');
  console.log('\nRunning sync_metadata.ts...');
  
  return new Promise<void>((resolve, reject) => {
    const child = spawn(process.execPath, ['run', syncScriptPath], {
      stdio: 'inherit',
    });
    
    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`sync_metadata.ts exited with code ${code}`));
      }
    });
    
    child.on('error', reject);
  });
}

main().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});