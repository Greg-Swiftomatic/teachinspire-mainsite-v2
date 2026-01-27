# Greg's Workspace

## Obsidian Vault
Location: ~/clawd/obsidian (symlinked to ~/obsidian-vault)

Before reading/searching notes, run: cd ~/obsidian-vault && git pull

## Search with QMD (Preferred)
Use mcporter to search the vault with QMD:

- **Keyword search:** `mcporter call qmd.search query="your search term"`
- **Semantic search:** `mcporter call qmd.vsearch query="your search term"`
- **Get full document:** `mcporter call qmd.get file="obsidian/path/to/file.md"`

## Manual Commands (Fallback)
- Search: grep -ri "keyword" ~/clawd/obsidian
- Read: cat ~/clawd/obsidian/path/to/note.md
- List folders: ls ~/clawd/obsidian

## After creating/editing notes
cd ~/obsidian-vault && git add . && git commit -m "Update" && git push
