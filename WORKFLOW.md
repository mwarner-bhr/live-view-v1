# Git Workflow Quick Reference

## Current Branch Structure

- **`main`** - Clean template for distribution
- **`experiments`** - Your personal experimental work

## Daily Workflow

### Working on Template (for distribution)

```bash
# Switch to main
git checkout main

# Make changes...

# Commit and push
git add .
git commit -m "Your commit message"
git push
```

### Working on Experiments (personal prototypes)

```bash
# Switch to experiments
git checkout experiments

# Make changes...

# Commit (local only, or push if you want backup)
git add .
git commit -m "Experiment: trying new animation"
git push  # optional
```

### Pulling Template Updates into Experiments

```bash
# Switch to experiments
git checkout experiments

# Merge latest from main
git merge main

# If there are conflicts, resolve them, then:
git add .
git commit -m "Merge main into experiments"
```

## Checking Where You Are

```bash
# See which branch you're on
git branch

# See which files changed
git status

# See what changed in files
git diff
```

## Emergency: "I made changes on the wrong branch!"

### If you haven't committed yet:

```bash
# Save your changes temporarily
git stash

# Switch to correct branch
git checkout experiments

# Apply your changes
git stash pop
```

### If you already committed to wrong branch:

```bash
# Note the commit hash (first 7 characters)
git log

# Switch to correct branch
git checkout experiments

# Bring the commit over (replace abc1234 with your hash)
git cherry-pick abc1234

# Switch back and undo the commit on wrong branch
git checkout main
git reset --hard HEAD~1
```

## VS Code Integration

- Bottom left corner shows current branch
- Click branch name to switch branches
- Git icon in sidebar shows changes
- Source Control panel handles commits

## Safety Reminders

- ✅ Git won't let you switch branches if you have uncommitted changes
- ✅ All your code is safe in `.git/` even if files disappear
- ✅ You can always `git checkout main` to get back to safety
- ✅ Use `git status` constantly to know where you are

## When Designer Wants to Contribute Back

```bash
# Designer creates branch from main
git checkout main
git checkout -b payroll-improvements

# Designer works and commits
git add .
git commit -m "Add new Payroll features"

# Designer pushes their branch
git push origin payroll-improvements

# Designer creates Pull Request on GitHub
# You review and merge into main via GitHub UI
```
