# Snapshot file
# Unset all aliases to avoid conflicts with functions
unalias -a 2>/dev/null || true
shopt -s expand_aliases
# Check for rg availability
if ! command -v rg >/dev/null 2>&1; then
  alias rg=''\''C:\Users\Hp\.claude\downloads\claude-2.0.32-win32-x64.exe'\'' --ripgrep'
fi
export PATH=$PATH
