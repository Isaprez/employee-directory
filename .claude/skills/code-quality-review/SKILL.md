---
name: code-quality-review
description: >
  Review code quality, check for deprecated patterns, audit feature
  implementations, and verify adherence to project coding standards.
  Triggered when the user asks to "review code", "check quality",
  "audit feature", or "check for deprecated patterns".
---

# Code Quality Review

## Instructions

When asked to review code quality for a feature or file:

### Step 1: Read the target code
Read all files in the feature directory indicated by the user.
Identify the key patterns being used (API slices, form handling,
type definitions, component structure).

### Step 2: Verify patterns with Context7
Use Context7 MCP to check the latest documentation for:
- **RTK Query**: endpoint definitions, tag management, mutations
- **React Hook Form**: form setup, validation integration
- **Zod**: schema definitions, resolver patterns

Compare the code's patterns against the latest recommended approaches.