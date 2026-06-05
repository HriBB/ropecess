#!/usr/bin/env bash
# One Ralph iteration (HITL). Implements the next ready issue end-to-end with the
# /tdd skill loaded, then STOPS so a human can review before the AFK loop continues.
#
# Runs inside the 'ralph-ropecess' Docker sandbox (sbx) — full agent autonomy
# contained to the mounted workspaces below, no --dangerously-skip-permissions
# on the host.
#
# Usage: ./ralph/ralph-once.sh
set -uo pipefail
cd "$(dirname "$0")/.."

mkdir -p ralph
ts=$(date +%Y%m%d-%H%M%S)
log="ralph/iteration-$ts.log"

source ralph/sandbox-lib.sh
SANDBOX=ralph-ropecess
ralph_sandbox_ensure "$SANDBOX" \
  /Users/bojan/www/ropecess \
  /Users/bojan/.agents/skills:ro || exit 1

echo "===== Ralph (HITL) single iteration -> $log ====="
{ printf '/tdd '; cat ralph/PROMPT.md; } | \
  sbx exec -i -w /Users/bojan/www/ropecess "$SANDBOX" \
  claude -p \
  --model claude-sonnet-4-6 \
  --dangerously-skip-permissions \
  --add-dir /Users/bojan/www/ropecess \
  2>&1 | tee "$log"

echo "===== Iteration done. Review the commit + issue before running afk-ralph.sh ====="
