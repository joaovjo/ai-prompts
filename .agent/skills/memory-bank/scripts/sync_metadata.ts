import { existsSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

interface Frontmatter {
  id: string;
  type?: string;
  utc_datetime?: string;
  tags?: string[];
  links?: string[];
}

interface Node {
  id: string;
  file: string;
  type: string;
  tags: string[];
}

interface Edge {
  from: string;
  to: string;
}

interface Metadata {
  version: string;
  lastUpdated: string;
  nodes: Node[];
  edges: Edge[];
}

function parseFrontmatter(content: string): Frontmatter | null {
  // Extract YAML frontmatter between --- delimiters
  const frontmatterRegex = /^---\s+(.*?)\s+---/s;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return null;
  }

  const yamlContent = match[1];

  try {
    // Use Bun's native YAML parser
    const data = Bun.YAML.parse(yamlContent) as Frontmatter;

    // Ensure we have the required fields
    if (!data.id) {
      return null;
    }

    return {
      id: data.id,
      type: data.type ?? 'unknown',
      utc_datetime: data.utc_datetime ?? '',
      tags: Array.isArray(data.tags) ? data.tags : [],
      links: Array.isArray(data.links) ? data.links : [],
    };
  } catch (error) {
    console.warn(`Warning: Failed to parse YAML frontmatter: ${error}`);
    return null;
  }
}

function collectMarkdownFiles(dir: string, results: string[]): void {
  const entries = readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const entryPath = join(dir, entry.name);

    if (entry.isDirectory()) {
      collectMarkdownFiles(entryPath, results);
      continue;
    }

    if (entry.isFile() && entry.name.endsWith('.md')) {
      results.push(entryPath);
    }
  }
}

async function main(): Promise<void> {
  const rootDir = process.cwd();
  const preferredDir = process.env.MEMORY_BANK_DIR ?? process.env.MEMORIES_DIR;
  const candidates = preferredDir
    ? [join(rootDir, preferredDir)]
    : [join(rootDir, 'memory-bank'), join(rootDir, '.memories')];
  let memoriesDir = '';

  for (const candidate of candidates) {
    if (existsSync(candidate) && statSync(candidate).isDirectory()) {
      memoriesDir = candidate;
      break;
    }
  }

  if (!memoriesDir) {
    console.log('Error: memory-bank or .memories directory not found.');
    return;
  }

  const metadataPath = join(memoriesDir, 'metadata.json');

  const nodes: Node[] = [];
  const edges: Edge[] = [];

  const markdownFiles: string[] = [];
  collectMarkdownFiles(memoriesDir, markdownFiles);

  for (const filepath of markdownFiles) {
    const file = Bun.file(filepath);
    const content = await file.text();

    const fm = parseFrontmatter(content);

    if (fm) {
      const relativePath = relative(memoriesDir, filepath).split('\\').join('/');
      const node: Node = {
        id: fm.id,
        file: relativePath,
        type: fm.type,
        tags: fm.tags,
      };
      nodes.push(node);

      // Check for links and create edges
      const links = fm.links ?? [];
      for (const target of links) {
        edges.push({
          from: fm.id,
          to: target,
        });
      }
    }
  }

  nodes.sort((left, right) => left.id.localeCompare(right.id));
  edges.sort((left, right) => {
    const fromCompare = left.from.localeCompare(right.from);
    return fromCompare !== 0 ? fromCompare : left.to.localeCompare(right.to);
  });

  const metadata: Metadata = {
    version: '1.0.0',
    lastUpdated: new Date().toISOString(),
    nodes,
    edges,
  };

  // Write metadata.json
  await Bun.write(metadataPath, JSON.stringify(metadata, null, 2));

  console.log(`Synced ${nodes.length} nodes and ${edges.length} edges to ${metadataPath}`);
}

main().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});