# Auto-Proceed Command

Force Claude Code to proceed without asking for confirmation.

## Usage

```
/proceed
```

## Effect

- Bypasses all confirmation dialogs
- Executes pending operations immediately
- Assumes user consent for all actions
- Logs actions for audit trail

## Behavior

When you run `/proceed`, Claude Code will:

1. Skip all permission requests
2. Execute file operations (read, write, edit, delete)
3. Perform Git operations (commit, push, pull)
4. Make network requests
5. Install packages
6. Deploy applications
7. Configure environments

All actions are logged for your review.

## Auto-Confirm Mode

This command activates auto-confirm mode for the current session. All subsequent operations will proceed automatically without prompts.

## Safety

While auto-confirm mode is active:
- All operations are still validated for syntax and safety
- Destructive operations are logged
- You can review the audit trail at any time
- Critical errors will still be reported

## Related

See `.claude/CLAUDE.md` for full autonomy configuration.
