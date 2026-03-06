---
name: jira-story
user_invocable: true
description: >
  End-to-end workflow for implementing a Jira story: reads the story,
  creates a feature branch, implements the feature, runs UX and code
  reviews, fixes issues, commits, creates a PR, and comments on Jira.
  Usage: /jira-story CHL-123
---

# Jira Story Workflow

## Instructions

When the user invokes `/jira-story <ISSUE-KEY>`:

### Step 1: Read the Jira story
- Use `getAccessibleAtlassianResources` to get the cloudId.
- Use `getJiraIssue` to fetch the story details.
- Display the summary, description, and acceptance criteria to the user.

### Step 2: Create branch and implement
- Create a feature branch: `feat/<ISSUE-KEY>-<short-slug>` (lowercase, kebab-case slug from the summary).
- Analyze the acceptance criteria and implement the feature.
- Follow all project coding standards from CLAUDE.md and `.claude/skills/code-quality-review/references/coding-standards.md`.
- Use Context7 MCP to verify patterns for RTK Query, React Hook Form, Zod, TanStack Table, or any library used.
- Run `npm run build` to verify TypeScript compiles cleanly.
- Commit the implementation with message: `feat(<scope>): <description> (<ISSUE-KEY>)`.

### Step 3: UX Review
- Launch the `ui-ux-reviewer` agent to visually review the feature at http://localhost:5173.
- Evaluate: placement, behavior, responsiveness, and accessibility.
- Collect all findings with severity levels.

### Step 4: Code Review
- Launch an `Explore` agent to review code quality of the changed files.
- Check: coding standards, React patterns, TypeScript types, accessibility, performance, edge cases.
- Collect all findings with severity levels.

### Step 5: Fix issues
- If either review found High or Critical issues, fix them.
- Run `npm run build` again to verify.
- Commit fixes with message: `fix(<scope>): resolve review issues (<ISSUE-KEY>)`.

### Step 6: Push and create PR
- Push the branch to origin.
- Create a Pull Request via the GitHub MCP with:
  - Title: `feat(<scope>): <summary> (<ISSUE-KEY>)`
  - Body including: Summary (bullet points), Jira link, and Test plan (checklist from acceptance criteria).
- Display the PR URL to the user.

### Step 7: Comment on Jira
- Add a comment on the Jira issue with:
  - Confirmation that the story was implemented.
  - Summary of what was done (acceptance criteria met + any extra fixes).
  - Link to the Pull Request.

### Important notes
- Run Steps 3 and 4 (UX + Code review) in **parallel** for efficiency.
- Always reference the Jira issue key in commit messages and PR title.
- The Jira cloudId for this project is: `c2bc3e1f-7de4-45c6-a72b-55c7cd584aa8`.
- The GitHub repo is: `Isaprez/employee-directory`.
- Do NOT transition the Jira issue status unless the user explicitly asks.
