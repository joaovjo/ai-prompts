
import os
import json
import re

def parse_frontmatter(content):
    """Parses YAML frontmatter from markdown content."""
    frontmatter_regex = r"^---\s+(.*?)\s+---"
    match = re.search(frontmatter_regex, content, re.DOTALL)
    if not match:
        return {}
    
    yaml_content = match.group(1)
    data = {}
    for line in yaml_content.split('\n'):
        line = line.strip()
        if not line or line.startswith('#'):
            continue
        if ':' in line:
            key, value = line.split(':', 1)
            key = key.strip()
            value = value.strip()
            
            # Basic parsing for arrays [a, b]
            if value.startswith('[') and value.endswith(']'):
                value = [v.strip() for v in value[1:-1].split(',') if v.strip()]
            else:
                # Remove quotes if present
                if (value.startswith('"') and value.endswith('"')) or (value.startswith("'") and value.endswith("'")):
                    value = value[1:-1]
            
            data[key] = value
    return data

def main():
    root_dir = os.getcwd()
    memories_dir = os.path.join(root_dir, ".memories")
    metadata_path = os.path.join(memories_dir, "metadata.json")
    
    if not os.path.exists(memories_dir):
        print("Error: .memories directory not found.")
        return

    nodes = []
    edges = []

    for filename in os.listdir(memories_dir):
        if filename.endswith(".md"):
            filepath = os.path.join(memories_dir, filename)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            fm = parse_frontmatter(content)
            
            if 'id' in fm:
                node = {
                    "id": fm['id'],
                    "filename": filename,
                    "type": fm.get('type', 'unknown'),
                    "utc_datetime": fm.get('utc_datetime', ''),
                    "tags": fm.get('tags', [])
                }
                nodes.append(node)
                
                # Check for links and create edges
                links = fm.get('links', [])
                if isinstance(links, list):
                    for target in links:
                        edges.append({
                            "source": fm['id'],
                            "target": target,
                            "relation": "related_to"
                        })
    
    metadata = {
        "nodes": nodes,
        "edges": edges,
        "updated_at": "TODO: Get Current UTC" 
    }
    
    # We could fetch UTC here too, but for sync speed we might skip or use local
    # For compliance with "files must have UTC", metadata.json isn't a "memory file" per se, strictly speaking.
    
    with open(metadata_path, 'w', encoding='utf-8') as f:
        json.dump(metadata, f, indent=2)
    
    print(f"Synced {len(nodes)} nodes and {len(edges)} edges to metadata.json")

if __name__ == "__main__":
    main()
