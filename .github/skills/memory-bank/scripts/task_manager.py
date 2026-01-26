
import sys
import os
import argparse
import datetime
import urllib.request
import json
import re

def get_utc_time():
    try:
        with urllib.request.urlopen("http://worldtimeapi.org/api/timezone/UTC", timeout=5) as response:
            data = json.loads(response.read().decode())
            return data["datetime"]
    except:
        return datetime.datetime.now(datetime.timezone.utc).isoformat()

def main():
    parser = argparse.ArgumentParser(description="Manage Memory Bank tasks")
    subparsers = parser.add_subparsers(dest="command")

    add_parser = subparsers.add_parser("add", help="Add a new task")
    add_parser.add_argument("name", help="Task name")
    add_parser.add_argument("--request", help="Original request", default="")

    update_parser = subparsers.add_parser("update", help="Update a task")
    update_parser.add_argument("id", help="Task ID (e.g., TASK001)")
    update_parser.add_argument("message", help="Progress log message")

    list_parser = subparsers.add_parser("list", help="List tasks")

    args = parser.parse_args()

    root_dir = os.getcwd()
    memories_dir = os.path.join(root_dir, ".memories")
    script_dir = os.path.dirname(os.path.abspath(__file__))
    
    if not os.path.exists(memories_dir):
        print("Error: .memories directory not found. Run init_memories.py first.")
        return

    if args.command == "add":
        # Generate ID
        existing_tasks = [f for f in os.listdir(memories_dir) if f.startswith("TASK")]
        next_id = len(existing_tasks) + 1
        task_id = f"TASK{next_id:03d}"
        
        utc_time = get_utc_time()
        
        # Load template
        template_path = os.path.join(script_dir, "..", "assets", "templates", "task_template.md")
        with open(template_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        content = content.replace("{{TASK_ID}}", task_id)
        content = content.replace("{{TASK_NAME}}", args.name)
        content = content.replace("{{UTC_DATETIME}}", utc_time)
        content = content.replace("{{DATE}}", utc_time) # Simplified
        content = content.replace("{{REQUEST}}", args.request)
        
        filename = f"{task_id}-{args.name.replace(' ', '-').lower()}.md"
        filepath = os.path.join(memories_dir, filename)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        
        # Update index (Simplified append for now)
        index_path = os.path.join(memories_dir, "_index.md")
        if os.path.exists(index_path):
            with open(index_path, 'a', encoding='utf-8') as f:
                f.write(f"\n- [{task_id}] {args.name} - Pending")
        
        print(f"Created task {task_id}: {filename}")

    elif args.command == "update":
        # Find file by ID
        target_file = None
        for f in os.listdir(memories_dir):
            if f.startswith(args.id):
                target_file = f
                break
        
        if not target_file:
            print(f"Task {args.id} not found.")
            return
            
        filepath = os.path.join(memories_dir, target_file)
        utc_time = get_utc_time()
        
        with open(filepath, 'a', encoding='utf-8') as f:
            f.write(f"\n### {utc_time}\n- {args.message}\n")
            
        print(f"Updated {target_file}")

    elif args.command == "list":
         print("Tasks:")
         for f in os.listdir(memories_dir):
            if f.startswith("TASK"):
                print(f" - {f}")

    # Auto-sync
    import subprocess
    sync_script = os.path.join(script_dir, "sync_metadata.py")
    subprocess.run([sys.executable, sync_script])

if __name__ == "__main__":
    main()
