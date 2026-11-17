## Agent skills

### Issue tracker

Issues and PRDs for this repo live as GitHub issues. PRs as a request surface: no. See `docs/agents/issue-tracker.md`.

### Triage labels

Triage roles are mapped to standard label strings (e.g., `needs-triage`, `ready-for-agent`). See `docs/agents/triage-labels.md`.

### Domain docs

Single-context documentation layout. See `docs/agents/domain.md`.


## Instructions

1. My personal GitHub: https://github.com/nikolalazarevic011
2. Work GitHub:
   - Work user: https://github.com/nlazarevic733
   - Work repo/org: https://github.com/lwcc-web
3. Use `gh` CLI for GitHub operations.
4. Use the installed `jira-cli` (`jira`) for Jira operations instead of the MCP server. Run `jira --help` if you need to see available commands. Jira space for this project is called KRC 
5. Use the Notion CLI (`C:\Users\NLazarevic\.local\bin\notion.exe` or `notion.exe`) for Notion operations (the Notion MCP is disabled). Create sub-pages inside pages if you cannot fit all thoughts on one page due to body limits, and to keep content organized. notion space for this project - https://app.notion.com/p/KRC-d3bee2ebe7fb40f9a7851d4224e4db7a
6. If you are unsure about how to implement a specific pattern or library feature, always use the Context7 MCP to query up-to-date documentation and examples.
7. Use the Playwright MCP in headless execution for browser debugging, web development, and live UI/runtime inspection, or other similar mcp that are available if playwright isnt available
   - When to use: Debugging frontend code, inspecting DOM elements/CSS styles, monitoring console logs and JavaScript errors, analyzing live network requests, checking local storage/session data, or validating UI layouts in real-time.
   - How to use: Connect to active Chrome instances or inspect local web server previews to diagnose and verify visual or functional bugs directly in the browser environment before making code changes.
8. If any of the previous cli or MCP or CLI commands fail TELL USER/ME so he can fix it   
9. NEVER add any AI-agent attribution (e.g. `Co-authored-by:` trailers, `Authored-by`, agent names) to commits or PRs. Every commit/PR must look authored purely by the user; strip any such marker before pushing/merging.
10. **Pushing to Work GitHub vs Personal GitHub:**
   - **Personal repo (`nikolalazarevic011`):** All files and folders (including AI tools, `.agents`, `AGENTS.md`, `CONTEXT.md`, `skills-lock.json`, `docs/`, `scripts/`, `GLOSSARY.md`, `.vscode/`) ARE completely fine and tracked.
   - **Work repo (`lwcc-web` / `FMA-next.js`):**
     - **Always double check with HUMAN (me) before pushing.**
     - **Never push AI files or non-work assets:** Strip out `.agents`, `.claude`, `AGENTS.md`, `CONTEXT.md`, `skills-lock.json`, `docs/`, `scripts/`, `GLOSSARY.md`, `.vscode/`, `.translations/`, etc.
     - **Clean `.gitignore`:** Ensure `.gitignore` on the work repo contains no mentions of AI tools (`.agents`, `.playwright-mcp`, etc.).
     - **Clean `package.json`:** Ensure `package.json` scripts do not point to omitted scripts.
     - **Push as work user:** Switch credentials via `gh auth switch --hostname github.com --user nlazarevic733` for the push, then immediately switch back to `nikolalazarevic011`.
11. After/grill-me-with-docs is done dont start automaticly implement, confirm with me always
12.  you can ssh into http://lwccwebportal.com:2276 as n08bcc5 using
C:UsersNLazarevic.sshcpanel2026 under /home/n08bcc5/public_html/krc/running_dashboard/members youl'll find this project, and i think the /build is what's actually getting served, use SCP to upload files u need to cPanel
1.  localhost for this portal at - https://localhost:3000/ , even tho when u do npm start it goes to https://localhost:3000/running_dashboard/members/build thats because we added /running_dashboard/members/build  , because our production site (this krc portal) is on https://kingdomrunningclub.org/running_dashboard/members/build/ and the https://kingdomrunningclub.org is our WP site



### Environment & Workflow Rules

- **PowerShell Syntax:** Remember that PowerShell uses `;` instead of `&&` as a command separator.
- **GitHub Authentication:**
  - Before performing GitHub operations, always run `gh auth status` to check active credentials.
  - Switch active accounts using `gh auth switch --hostname github.com --user <user>` when accessing work repositories (under `lwcc-web`) vs. personal repositories.
  - If `gh auth status` shows no authenticated account or if `gh auth switch` fails, stop the operation and report the exact error output to the user. Do not attempt to re-authenticate automatically.
  - **Always restore the personal account (`nikolalazarevic011`) as the active credential when finished** by running:
    ```bash
    gh auth switch --hostname github.com --user nikolalazarevic011
    ```

---

# Always-on instructions

Use subagents to keep the main chat context lean and fast.

## When to delegate

Push anything that does **not** need to be in the main chat context into a subagent:

- **Codebase exploration** — Map the project, find where a feature lives, or understand an unfamiliar area before editing. Prefer the `Explore` agent with a thoroughness level (`quick` / `medium` / `thorough`).
- **Research** — Look up docs, API facts, or web sources on the side and report findings back compactly.
- **Breadth-first searches** — Multiple keyword or file searches that would otherwise clutter the main conversation.
- **Any multi-step read/report loop** that only produces a short conclusion.

## Rules

1. **Keep the main thread on the primary task.** When you receive context, work on the main task; push everything secondary to subagents.
2. **Write detailed, self-contained subagent prompts.** Include the goal, what to look for, exact file paths/keywords to search, and *exactly* what to return. Subagents are stateless — they cannot ask follow-ups.
3. **Specify research-only vs. write code.** Tell the subagent explicitly whether it should write code or just research/read/fetch.
4. **Request compact reports.** Ask subagents to return a short summary (bullet points, key `file:line` references, conclusions) rather than dumping raw content.
5. **Run independent subagents in parallel** when there is no dependency between them.
6. **Don't duplicate the subagent's work** in the main thread afterwards — trust the report and only re-read a specific section if it is ambiguous.

## Output

Deliver the main task to completion. Surface a concise summary of what each subagent was asked to do and the key findings you used, so the user can see where context was saved.

## Spec & Ticket Commit Tracking
### Spec & Ticket Commit Tracking
When completing any Spec issue or child ticket:
1. Always create and push an annotated git tag linking the spec/ticket to the exact commit SHA (e.g. `git tag -a spec-<num> -m "..." <sha>; git push origin --tags`).
2. Post a closing comment on GitHub referencing the exact commit SHA, branch, PR link, and git tag with instructions on how future agents can inspect or checkout that exact codebase snapshot (`git checkout <tag>` or `git checkout <sha>`).
3. In commit messages, reference the ticket numbers (e.g. `(closes #19)` or `(part of #18)`).