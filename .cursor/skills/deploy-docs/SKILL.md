---
name: deploy-docs
description: >-
  Deploy the docs site to GitHub Pages by triggering the Deploy Docs workflow.
  Use when the user says "deploy docs", "publish docs", "update the site",
  "push docs live", or asks to deploy documentation changes.
---

# Deploy Docs

Trigger the `Deploy Docs` GitHub Actions workflow and monitor it to completion.

## Prerequisites

- The GitHub CLI (`gh`) must be authenticated
- The repo must have GitHub Pages enabled
- The workflow file `.github/workflows/docs.yml` must exist

## Steps

1. **Ensure changes are pushed** — check for unpushed commits on the current branch. If there are unpushed docs changes, push them first.

2. **Trigger the workflow**:

```bash
gh workflow run docs.yml
```

3. **Wait for the run to appear** — it takes a few seconds for GitHub to register the dispatch. Poll until the new run shows up:

```bash
sleep 5
gh run list --workflow=docs.yml --limit=1 --json databaseId,status,conclusion,createdAt
```

4. **Watch the run** until it completes:

```bash
gh run watch <run-id>
```

5. **Report the result** — tell the user whether the deploy succeeded or failed, and link to the live site:

   - Success: `https://jtenniswood.github.io/immich-frame/`
   - Failure: share the run URL so the user can inspect logs (`gh run view <run-id> --web`)
