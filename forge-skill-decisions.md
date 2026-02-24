# Forge Skill Design Decisions & Context

**Date:** February 2, 2026
**Project:** BambooHR UI Template - Job Description Feature
**Context:** Decisions made while implementing SuccessNotification from Figma

---

## Background

We used `/forge` to implement a SuccessNotification (Slidedown) component from Figma. During this process, we discovered several gaps and issues with how the Figma MCP tools work and how the forge skill was using them.

**Figma URL used:** https://www.figma.com/design/3Vs1Yo2HwNrSFJoqBIr6ya/2026-AI-Framework?node-id=1008-206892

---

## Problems Discovered

### 1. Colors Not Included in `get_design_context`

**What happened:**
- Called `get_design_context` for the Slidedown component
- Received typography specs, shadow effects, component structure
- **Did NOT receive background fill color**
- Initially implemented with gradient from existing codebase: `linear-gradient(180deg, #008A00 0%, #006B00 100%)`
- Figma's actual spec was solid color: `#016d00`

**Why it happened:**
- `get_design_context` focuses on component structure, typography, and effects
- When Code Connect is present, it returns component props (`type="Success"`) instead of raw CSS values
- Fill colors are stored in design variables/tokens, not in the component itself

**Solution:**
- Always call `get_variable_defs` in addition to `get_design_context`
- `get_variable_defs` returns actual color values from Figma's design tokens

### 2. Code Connect Points to Different Codebase

**What happened:**
- `get_design_context` returned Code Connect mappings:
  ```
  import Slidedown from "src/components/slidedown/types/SimpleSlidedownProps.ts"
  import Button from "src/components/button/components/button/button.tsx"
  ```
- These paths don't exist in the user's codebase
- They point to BambooHR's internal design system codebase

**Why it happened:**
- Code Connect is configured in Figma to link components to BambooHR's official design system
- The user is building templates/demos in a different codebase structure
- Code Connect will ALWAYS point to the wrong codebase for this use case

**Solution:**
- Ignore import paths from Code Connect completely
- Search the actual user codebase with Glob/Grep to find equivalent components
- Use Code Connect for semantic information only (see next section)

### 3. Code Connect Semantic Info Is Still Valuable

**Realization:**
Even though the import paths are wrong, Code Connect provides valuable semantic context:

**What Code Connect tells us:**
- Component names (`Slidedown`, `Button`) → what to search for
- Props/variants (`type="Success"`, `size="Small"`) → design intent
- Component hierarchy (`Slidedown` contains `Button`) → structure
- Prop values (`isDismissable={true}`) → requirements

**How to use it:**
- **IGNORE:** Import paths (`src/components/slidedown/...`)
- **USE:** Component names to search actual codebase
- **USE:** Props to understand design intent and build interfaces
- **USE:** Hierarchy to understand composition

**Example:**
```tsx
// Code Connect shows:
<Slidedown
  isDismissable={true}
  titleText="Filled 6 fields"
  type="Success"
>
  <Button size="Small" />
</Slidedown>

// Use this to:
// 1. Search for: notification/toast/slidedown components
// 2. Find: SuccessNotification.tsx in user codebase
// 3. Build interface:
interface SuccessNotificationProps {
  title: string;           // from titleText
  description?: string;    // inferred
  onDismiss?: () => void;  // from isDismissable
  actionLabel?: string;    // from Button child
  onAction?: () => void;   // from Button child
}
```

---

## Tool Responsibilities Matrix

| Tool | Returns | Does NOT Return | Use For |
|------|---------|-----------------|---------|
| `get_metadata` | Dimensions (width/height), position (x/y), node tree | Any styles or colors | Structure and sizing |
| `get_design_context` | Typography specs, shadow/blur effects, Code Connect snippets | Fill colors (when CC exists) | Fonts, effects, semantic info |
| `get_variable_defs` | Color values, spacing tokens, design variables | Component structure | Colors and tokens |
| `get_screenshot` | Visual capture | Style values | Layout context only |

**Key insight:** Information is intentionally split across multiple tools. You MUST call multiple tools to get complete specs.

---

## Forge Skill Changes Made

### Added Critical Rule #5
```markdown
5. **ALWAYS call `get_variable_defs` for colors.** The `get_design_context`
   tool does NOT return fill colors when Code Connect is present. You MUST
   call `get_variable_defs` to get actual color values from design tokens.
```

### Added Critical Rule #6
```markdown
6. **IGNORE Code Connect paths, but USE the semantic info.** Code Connect
   paths point to a different codebase (BambooHR internal), NOT the user's
   project. IGNORE import paths like `src/components/slidedown/...`. BUT
   extract useful semantic context: component names ("Slidedown" → search
   for toast/notification), props (`type="Success"`, `size="Small"`), and
   hierarchy (what contains what). Use this to search the actual codebase
   with Glob/Grep.
```

### Updated Workflow
Changed Step 3 from:
```
│ 3. FETCH SPECS - design_context only for BUILD nodes        │
```

To:
```
│ 3. FETCH SPECS - design_context + variable_defs for colors  │
```

### Added "Handling Code Connect" Section

Added comprehensive guidance in Step 3:

**From Code Connect snippets, EXTRACT:**
- ✅ Component names → "Slidedown", "Button" (what to search for)
- ✅ Props/variants → `type="Success"`, `size="Small"` (design intent)
- ✅ Component hierarchy → Slidedown contains Button (structure)
- ✅ Prop values → `isDismissable={true}`, `titleText="..."` (requirements)

**From Code Connect, IGNORE:**
- ❌ Import paths
- ❌ Source file references

**Example workflows for:**
1. REUSE - when component exists in codebase
2. BUILD - when building new component from scratch

### Added Troubleshooting Section

```markdown
**Colors missing from design_context:**
- This happens when Code Connect is configured on the component
- ALWAYS call `get_variable_defs` to get actual color values
- Look for tokens like `surface/success/surface-success-strong: #016d00`

**Codebase component has different colors than Figma:**
- Code Connect assumes your component is correct, but it may be outdated
- Use `get_variable_defs` to get the source-of-truth colors from Figma
- Update your component to match Figma's design tokens
```

---

## Key Takeaways

### 1. Multi-Tool Requirement
You cannot get complete specs from a single Figma MCP tool call. Always call:
- `get_metadata` for dimensions
- `get_design_context` for typography and effects
- `get_variable_defs` for colors
- `get_screenshot` for visual layout reference only

### 2. Code Connect Is a Hint, Not Truth
When Code Connect is present:
- It points to a different codebase (BambooHR internal)
- Use it as semantic documentation, not as actual import paths
- Always search the user's actual codebase with Glob/Grep

### 3. Design Variables Are Source of Truth for Colors
Don't trust existing codebase components to have correct colors. Always verify against Figma's design tokens via `get_variable_defs`.

### 4. Code Connect Helps Even for New Components
When building new components, Code Connect tells you:
- What props to implement
- What variants might exist
- Component composition patterns
- The semantic API the component should have

---

## Implementation Result

**What we built:**
- SuccessNotification component
- Exact match to Figma spec: `#016d00` solid color (not gradient)
- Props derived from Code Connect semantic info
- Found existing component in codebase (didn't rebuild)
- Updated colors to match Figma exactly

**Files changed:**
- `src/components/SuccessNotification/SuccessNotification.tsx` - updated background color
- `~/.claude/skills/forge/SKILL.md` - updated with all learnings

---

## Questions Answered

**Q: Can Figma Code Connect be turned on or off?**
A: It's per-component, not global. Each component in Figma can have Code Connect configured or not. But even without Code Connect, `get_design_context` doesn't reliably return fill colors, so `get_variable_defs` is always needed.

**Q: Is Code Connect helpful to know the component hierarchy/structure as semantic context?**
A: Yes! Even though import paths are wrong, the semantic info (names, props, hierarchy) is valuable for both reusing existing components AND building new ones. It tells you what to search for and what API to implement.

**Q: Does this still work if similar components don't exist and forge needs to build new?**
A: Yes, arguably MORE valuable. Code Connect semantics tell you what props to implement, what variants to support, and what the component composition should be.

---

## Files Created

1. **forge-skill-original-backup.md** - Original forge skill from Jan 30 (before changes)
2. **forge-skill-decisions.md** - This document
3. **Updated:** `~/.claude/skills/forge/SKILL.md` - Production skill with all improvements

---

## Future Considerations

### Potential Improvements
1. **Check for Code Connect automatically** - Detect when paths don't match user codebase structure
2. **Better semantic extraction** - Parse Code Connect props more systematically
3. **Design token mapping** - Map Figma variables to codebase CSS variables automatically
4. **Variant detection** - When seeing `type="Success"`, look for other variants (Error, Warning, Info)

### Known Limitations
1. `get_design_context` with Code Connect will never return raw fill colors
2. Code Connect paths will always point to BambooHR internal codebase
3. Must always call multiple tools to get complete specs
4. No way to "turn off" Code Connect per query (it's in the Figma file)

---

## Summary

The forge skill now handles the reality that:
1. Figma specs are split across multiple MCP tools
2. Code Connect points to wrong codebase but has valuable semantics
3. Colors must come from `get_variable_defs`, not `get_design_context`
4. Semantic info from Code Connect helps both reusing and building components

These changes make forge work correctly in environments where Code Connect exists but points to a different codebase structure.
