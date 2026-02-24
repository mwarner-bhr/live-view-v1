---
name: forge
description: Build pixel-perfect pages from Figma URLs - simple and accurate
argument-hint: ""
allowed-tools: Read, Write, Edit, Glob, Grep, Bash, Task, TodoWrite, mcp__figma-desktop__*
---

# /forge - Simple Figma URL Builder

Build pixel-perfect pages from Figma URLs using a straightforward workflow that achieves better results than complex multi-phase approaches.

## Initial Prompt

When invoked, **immediately respond with this:**

```
Ready to build from Figma URLs!

I'll decompose your URLs, fetch all component specs in parallel, and build everything.

**What I need:**
1. Full-page screenshot (for layout context)
2. One or more Figma URLs

**How to get URLs:**
- Right-click components in Figma Desktop → "Copy link"
- Can provide parent frame URLs (I'll auto-discover children)
- Or provide individual component URLs

**Paste your screenshot and URLs now.**
```

**STOP and wait for user to provide screenshot and URLs.**

---

## Workflow

### Step 1: Decompose URLs

For each URL provided:

1. **Extract node ID:**
   - URL format: `https://www.figma.com/design/...?node-id=656-22960`
   - Extract `656-22960`
   - Convert to node ID: `656:22960` (replace dash with colon)

2. **Check for children:**
   ```
   mcp__figma-desktop__get_metadata(nodeId="656:22960")
   ```
   - Parse XML response
   - Look for child `<instance>` and `<frame>` elements (not primitives like `<text>` or `<rectangle>`)
   - Extract child node IDs

3. **Build component list:**
   - If parent has meaningful children (named components like "Global Header", "Sidebar"), add them to build list
   - If no children or just primitives, use parent itself

### Step 2: Fetch Specs in Parallel

For each component in the build list, call in parallel:

```
mcp__figma-desktop__get_design_context(nodeId="656:22960", clientLanguages="typescript", clientFrameworks="react")
mcp__figma-desktop__get_screenshot(nodeId="656:22960", clientLanguages="typescript", clientFrameworks="react")
```

**Save results:**
- Component specs contain exact styling (colors, spacing, typography, dimensions)
- Screenshots provide visual reference
- Keep all data in context for build phase

### Step 3: Optional Clarification

**Before building, check for ambiguity:**

Common ambiguous scenarios:
- Interactive behavior (buttons, modals, navigation)
- Data sources (APIs, mock data, static)
- Functional vs. styled-only components (tabs, dropdowns)

**If ambiguous:**
Ask specific questions:
- "Should 'Request a change' button open a modal or navigate?"
- "Is this employee list static or should I wire to an API?"
- "Are these tabs functional with routing or just visual?"

**If not ambiguous:**
Make reasonable assumptions:
- Buttons with clear actions → implement onClick handlers
- Lists with demo data → use static mock data
- Tabs/navigation → implement functional routing

### Step 4: Build in Parallel

Spawn **separate Task agents** (one per component) to build in parallel:

```
Task 1: Build GlobalHeader component
Task 2: Build Sidebar component
Task 3: Build PerformanceContent component
```

**Each agent:**
- Receives its component's specs and screenshot
- Creates component file in `/src/components/[ComponentName]/[ComponentName].tsx`
- Implements exact styling from Figma specs
- Uses existing design tokens from codebase
- Exports component properly

**Agent instructions:**
```
Build the [ComponentName] component.

Specs: [paste component specs from get_design_context]
Screenshot: [reference screenshot]

Requirements:
- Match Figma specs exactly (colors, spacing, typography, dimensions)
- Use existing design tokens from /src/index.css
- TypeScript with proper types
- Export via index.ts
```

### Step 5: Assemble Page

After all component agents complete:

1. **Create page component:**
   - File: `/src/pages/[PageName]/[PageName].tsx`
   - Import all built components
   - Arrange based on screenshot layout

2. **Use screenshot for layout:**
   - Reference user's full-page screenshot
   - Match spatial relationships (positioning, nesting, flexbox/grid)
   - Ensure components are composed correctly

**Example page structure:**
```typescript
import { GlobalHeader } from '@/components/GlobalHeader';
import { Sidebar } from '@/components/Sidebar';
import { PerformanceContent } from '@/components/PerformanceContent';

export default function PerformancePage() {
  return (
    <div className="page-layout">
      <GlobalHeader />
      <div className="body-layout">
        <Sidebar />
        <PerformanceContent />
      </div>
    </div>
  );
}
```

3. **Export page:**
   - Add to `/src/pages/index.ts`
   - Update routing if needed

---

## Final Output

Report to user:

```
✓ Built [N] components in parallel
✓ Assembled [PageName] page

Components created:
- /src/components/GlobalHeader/GlobalHeader.tsx
- /src/components/Sidebar/Sidebar.tsx
- /src/components/PerformanceContent/PerformanceContent.tsx

Page created:
- /src/pages/PerformancePage/PerformancePage.tsx

Forging complete.
```

---


## Tips for humans

**Good URL selection:**
- Parent frame URLs work great (auto-discovers children)
- Select 2-4 main sections for best results
- Can mix parent and individual URLs

**Component granularity:**
- Smaller, focused components often work better
- 6-12 components per page is ideal
- Let decomposition handle finding the right level

**When to use:**
- Building new pages from Figma
- Refining existing pages to match Figma updates
