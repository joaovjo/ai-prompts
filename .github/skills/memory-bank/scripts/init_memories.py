
import os
import shutil
import json
import urllib.request
import datetime

def get_utc_time():
    try:
        with urllib.request.urlopen("http://worldtimeapi.org/api/timezone/UTC", timeout=5) as response:
            data = json.loads(response.read().decode())
            return data["datetime"]
    except Exception as e:
        print(f"Warning: Could not fetch time from worldtimeapi.org ({e}). Using local UTC time.")
        return datetime.datetime.now(datetime.timezone.utc).isoformat()

def main():
    root_dir = os.getcwd()
    memories_dir = os.path.join(root_dir, ".memories")
    
    # Locate templates relative to this script
    script_dir = os.path.dirname(os.path.abspath(__file__))
    templates_dir = os.path.join(script_dir, "..", "assets", "templates")
    
    if not os.path.exists(memories_dir):
        print(f"Creating .memories directory at {memories_dir}")
        os.makedirs(memories_dir)
    else:
        print(f".memories directory already exists at {memories_dir}")

    # Initialize metadata.json if not exists
    metadata_path = os.path.join(memories_dir, "metadata.json")
    if not os.path.exists(metadata_path):
        initial_metadata = {"nodes": [], "edges": []}
        with open(metadata_path, 'w', encoding='utf-8') as f:
            json.dump(initial_metadata, f, indent=2)
        print("Created metadata.json")

    # Copy templates
    utc_time = get_utc_time()
    print(f"Using UTC time: {utc_time}")

    core_files = [
        "projectbrief.md",
        "productContext.md",
        "activeContext.md",
        "systemPatterns.md",
        "techContext.md",
        "progress.md",
        "_index.md"
    ]

    for filename in core_files:
        dest_path = os.path.join(memories_dir, filename)
        if not os.path.exists(dest_path):
            src_path = os.path.join(templates_dir, filename)
            if os.path.exists(src_path):
                with open(src_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Replace placeholder
                content = content.replace("{{UTC_DATETIME}}", utc_time)
                
                with open(dest_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Created {filename}")
            else:
                print(f"Warning: Template {filename} not found at {src_path}")
        else:
            print(f"File {filename} already exists. Skipping.")

    print("\nMemory Bank initialized successfully.")
    print("Don't forget to run 'sync_metadata.py' to update the graph.")

if __name__ == "__main__":
    main()
