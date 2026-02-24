# BambooHR UI Template - Project Status

## Tech Stack
- React + Vite + TypeScript + Tailwind CSS v4
- Font Awesome icons + Lucide icons
- Custom fonts: Fields (headlines), Inter (body)
- Design tokens defined in `src/index.css`
- React Router for navigation

## Pages Completed

### 1. Home (`src/pages/Home/`)
- Dashboard with gridlets
- Welcome section

### 2. My Info (`src/pages/MyInfo/`)
- Personal information form with multiple sections
- Job information, contact details, emergency contacts
- Avatar display with user info
- Mock data: Employee profile information

### 3. Directory/People (`src/pages/People/`)
- Employee cards with search, grouping by name/department/location/division, department filtering
- Mock data: 23 employees with realistic avatars from pravatar.cc

### 4. Hiring (`src/pages/Hiring/`)
- Job openings table with tabs (Job openings, Candidates, Talent pools)
- Status filter dropdown (Draft and open, Open only, Draft only)
- Mock data: 6 job openings

### 5. Analytics/Reports (`src/pages/Reports/`)
- Sidebar navigation with 13 categories
- AI question input using TextArea component with gradient border
- Suggestion question cards
- Insights section with 3 cards
- Recently viewed reports table (16 reports)
- Layout: Header at top spanning full width, sidebar + main content below

### 6. Files (`src/pages/Files/`)
- Sidebar with category navigation (All files, Signature Templates, Benefits Docs, Payroll, Trainings, Company Policies)
- File list with working checkboxes and select all
- Sort dropdown with actual sorting (Name A-Z/Z-A, Date Recent/Oldest, Size Largest/Smallest)
- Light green highlight on selected rows (#f0f9ed)
- File icons colored by type (red=PDF, blue=image, purple=audio)
- Mock data: 16 files in `src/data/files.ts`

### 7. Payroll (`src/pages/Payroll/`)
- **Responsive date selector** with ResizeObserver-based card visibility:
  - Cards are 160px wide with 20px minimum gap
  - Cards disappear completely (not partially) when viewport shrinks
  - Remaining cards redistribute using justify-between
  - Arrow button (40x40px circular) fixed on right
  - Grey 2px horizontal line behind all cards
  - Selected card: beige background (`--surface-neutral-xx-weak`) with green border
  - Active date number box: solid green background with white text
  - Idle date number box: light beige background with green text
  - Notification badge positioned at top-right of icon box
- **Stats cards** (horizontal layout matching Card/Info Figma component):
  - 48x48px icon boxes with `--surface-neutral-xx-weak` background
  - Value: 18px semibold, Label: 13px regular
  - Stats: 88 people, $1,234 extra pay, 113 timesheets
- **Functional reminders** section with working checkboxes and strikethrough on completion
- **Updates section** with arrows-rotate (refresh) icon, no grey background container
- **Right sidebar**: Start payroll button (48px, 18px text), 44x44px icon containers, global button styles
- **Dark mode support**: All colors use CSS variables that swap via `:root.dark`
- Mock data: 12 payroll dates (Jan-April), stats, reminders, details in `src/data/payrollData.ts`

### 8. Settings (`src/pages/Settings/`)
- Two-column layout: Left sidebar (280px) + Main content card
- **Left sidebar**: 27 settings navigation categories with icons and hover states (green text + white background)
- **Main content**: White card with Account section
- Account header with company name, account #, URL, and owner info
- Vertical sub-tabs (Account Info, Billing, ACA Settings, etc.) with selected state (light gray background)
- **My Subscription section**: Pro package card, Add-Ons (Payroll, Time Tracking), Job Postings + File Storage combined card
- **Available Upgrades**: Elite, Benefits Administration, Global Employment cards with light gray icon backgrounds
- Supercharge Your Workflow promotional card
- Data section with data center location
- Mock data: Settings nav items, account info, subscription details in `src/data/settingsData.ts`
- Settings gear icon in GlobalHeader shows selected state (gray background + green icon) when on /settings

### 9. Create Job Opening (`/hiring/new`)
- Multi-step wizard with sidebar navigation (Job Information, Application Questions, Job Pipeline, Automated Emails, Job Boards)
- **AI-Assisted Job Posting** - Main feature of this page:
  - Type job title → AI suggests field values after 600ms debounce
  - "Looking at similar roles..." loading message appears inline next to title input
  - Inline message banner with gradient background (blue-to-purple)
  - Confidence levels: High/Medium/Low based on similar roles found
  - "Fill it In" button with rainbow gradient border (green→blue→purple→peach)
  - Auto-fills 5 fields: Department, Employment Type, Experience Level, Compensation, Work Location
  - Field highlighting shows which fields were AI-filled
  - Individual "Undo" buttons per field
  - Field explanations appear on focus (shows AI reasoning)
  - "Clear all" button to undo all AI-filled fields
  - Toast notification: "Filled X fields" with "Review changes" link
  - Review modal shows all filled values in grid layout
  - **Full dark mode support** for inline message and button

### 10. AI Job Description Prototype (`/job-ai-prototype`)
- Research page showcasing 8 different UX patterns for AI-assisted job posting:
  1. **Autocomplete Dropdown** - Select from dropdown to fill all fields
  2. **Ghost Text** - Preview suggestions as ghost text in fields
  3. **Suggestion Chips** - Accept individual field chips
  4. **Side Panel** - Review all suggestions in panel
  5. **Progressive Fill** - Animated field-by-field population
  6. **Preview Card** ⭐ - Preview all before applying with granular control
  7. **Conversational** ⭐ - AI asks permission then highlights changes (implemented in `/hiring/new`)
  8. **Inline Contextual** ⭐ - Tab to accept field-by-field suggestions
- Tab-based interface to switch between variations
- Dark mode toggle
- Link back to normal flow (`/hiring/new`)

## Reusable Components Created

### TextArea (`src/components/TextArea/`)
- AI-themed input with gradient border
- Gradient: `linear-gradient(93deg, #87C276 0%, #7AB8EE 33.65%, #C198D4 66.83%, #F2A766 96.15%)`
- Circle-arrow-up submit icon
- Props: placeholder, state, note, hasValue, hasLabel

### Icon (`src/components/Icon/`)
- Wraps Font Awesome + Lucide icons
- **Settings page icons**: lock, thumbs-up, heart, sliders, bell, spa, palette, door-open, door-closed, chart-line, plane, graduation-cap, shield, check-circle, link
- **Payroll page icons**: chevron-right, arrows-rotate (refresh icon for Updates section)
- **Other icons**: folder, chevron-down, arrow-up-from-bracket, table-cells, arrow-down-to-line, trash-can, file, file-audio, image, circle-info, sparkles, rotate-left, check-circle, xmark
- Supports `style` prop for custom colors
- Lucide icons: PanelLeftOpen, PanelLeftClose, Home, UserCircle, Users, IdCard, PieChart, FileText, CircleDollarSign, Sun, Moon

### JobInformationForm (`src/components/JobInformationForm/`)
- Main form component for Create Job Opening page
- Integrates AI suggestion system
- Inner components: FieldHighlight, FieldExplanation, UndoLink
- Handles debounced AI generation on title input

### JobLocationOption (`src/components/JobLocationOption/`)
- Card-style location selector (In Office, Hybrid, Remote)
- Icon + label + checkbox layout

### ProgressBar (`src/components/ProgressBar/`)
- Created for Settings page (not yet implemented in UI)
- Horizontal bar with fill percentage
- Props: value, max, label, color

### GlobalHeader (`src/components/GlobalHeader/`)
- Logo, search bar, utility icons (inbox, help, settings)
- Settings gear icon shows selected state when on /settings (gray background + green icon)
- Uses `useLocation` to detect current route

### GlobalNav (`src/components/GlobalNav/`)
- Collapsible left navigation with 7 items: Home, My Info, People, Hiring, Reports, Files, Payroll
- Selected state: Gray background + green icon + bold text
- Theme toggle button (sun/moon icon)
- Account section with avatar
- Expand/collapse functionality with localStorage persistence

## AI Job Posting System

### Architecture
```
src/
├── types/jobAI.ts           # TypeScript interfaces
├── services/jobAIService.ts # Mock AI service (ready for API swap)
└── components/JobInformationForm/
    └── JobInformationForm.tsx # Main form with AI integration
```

### Types (`src/types/jobAI.ts`)
```typescript
interface FieldReasoning {
  field: string;
  value: string;
  reason: string;
}

interface JobSuggestion {
  title: string;
  department: string;
  location: string;
  employmentType: string;
  experienceLevel: string;
  workSchedule: string;
  compensationType: string;
  salaryMin: string;
  salaryMax: string;
  benefits: string[];
  requiredSkills: string[];
  responsibilities: string[];
  confidence: 'high' | 'medium' | 'low';
  matchCount: number;
  reasoning: FieldReasoning[];
}
```

### Service (`src/services/jobAIService.ts`)
- `fetchJobSuggestions(title: string)` - Returns AI suggestions based on job title
- Mock database with 4 pre-defined jobs: Product Designer I/II, Senior Software Engineer, Marketing Manager
- Keyword fallback for design/engineer/marketing titles
- Generic fallback for unknown titles
- Simulated 800-1200ms delay for realistic UX
- **Ready for real API integration** - just replace mock with fetch

### CSS Classes (`src/index.css`)
```css
/* AI Inline Message - light/dark mode */
.ai-inline-message { /* gradient background, border, shadow */ }
.ai-inline-message-text { color: #0066CC; }
:root.dark .ai-inline-message { /* dark gradient */ }
:root.dark .ai-inline-message-text { color: #7CB3F0; }

/* AI Fill Button - gradient border preserved in both modes */
.ai-fill-button {
  background-image: linear-gradient(white, white),
    linear-gradient(135deg, #AFD6A3 0%, #A6D0F3 34%, #D5BAE3 67%, #F6C499 96%);
}
:root.dark .ai-fill-button {
  background-image: linear-gradient(#1a1a1a, #1a1a1a),
    linear-gradient(135deg, #AFD6A3 0%, #A6D0F3 34%, #D5BAE3 67%, #F6C499 96%);
}

/* Animations */
.animate-fadeIn { animation: fadeIn 0.3s ease-out; }
.animate-slideIn { animation: slideIn 0.3s ease-out; }
```

## Global Styles (`src/index.css`)

### H1 Style
```css
h1 {
  font-family: 'Fields', system-ui, sans-serif;
  font-size: 44px;
  font-weight: 700;
  line-height: 52px;
  color: #2e7918;
  margin: 0;
}
```

### Design Tokens
- Primary green: `--color-primary-strong: #2e7918`
- Surface colors, border colors, text colors all defined as CSS variables
- Spacing and radius tokens available
- **Dark mode variables** in `:root.dark` selector:
  - `--surface-neutral-white: #1a1a1a`
  - `--surface-neutral-xx-weak: #242422`
  - `--border-neutral-x-weak: #424039`
  - `--text-neutral-strong: #d5d0cd`

## Key Data Files
- `src/data/employees.ts` - 23 employees with departments, divisions, locations
- `src/data/jobOpenings.ts` - 6 job openings
- `src/data/analytics.ts` - Insights, reports, suggestion questions
- `src/data/files.ts` - 16 files with categories and types
- `src/data/payrollData.ts` - 12 payroll dates (Jan-April for wide screens), stats, reminders (with functional checkboxes), details
- `src/data/settingsData.ts` - Settings navigation items (27 categories), account info, subscription, add-ons, upgrades
- `src/services/jobAIService.ts` - Mock job database (4 jobs) with AI suggestion logic

## Layout Patterns

### Analytics/Files Layout
```
┌─────────────────────────────────────────────────┐
│ Header: H1 title + action buttons (full width)  │
├─────────────────────────────────────────────────┤
│ Sidebar (280px) │ Main Content (flex-1)         │
│ - Categories    │ - Content sections            │
│ - pl-8 padding  │ - pr-10 pl-6 pb-10 padding    │
└─────────────────────────────────────────────────┘
- Gray background extends behind entire page including sidebar
- No border between sidebar and content
```

## Git Repository
- Remote: https://github.com/mattcmorrell/bhr-ui-template.git
- Branch: `new-job-description` - AI job posting feature development

## Dark Mode Implementation
- Uses CSS variables defined in `src/index.css` with `:root.dark` selector
- All components should use CSS variables like `var(--surface-neutral-white)` instead of hardcoded colors
- Do NOT use Tailwind `dark:` prefix classes - they don't work correctly with this setup
- Variables automatically swap values when `.dark` class is on root element
- **AI components** use dedicated CSS classes (`.ai-inline-message`, `.ai-fill-button`) for dark mode

## Responsive Patterns

### Date Selector (Payroll page)
```tsx
const CARD_WIDTH = 160;
const MIN_GAP = 20;
const BUTTON_WIDTH = 40;

// ResizeObserver calculates how many cards fit
const availableWidth = containerWidth - BUTTON_WIDTH - MIN_GAP;
const maxCards = Math.floor((availableWidth + MIN_GAP) / (CARD_WIDTH + MIN_GAP));
const visibleDates = payrollDates.slice(0, visibleCardCount);

// Cards use justify-between to distribute evenly
<div className="flex items-center justify-between flex-1">
  {visibleDates.map(...)}
</div>
```

## AI Chat Feature

### Overview
Building a dual-mode AI chat interface:
1. **Slide-in panel** - Appears on right side of any page when "Ask" button clicked
2. **Full-screen view** - Dedicated route with sidebar navigation

### Components Created

#### AIChatPanel (`src/components/AIChatPanel/`)
- Slide-in panel (399px wide) on right side with beige border container
- Header with conversation title dropdown, expand button, close button
- Message display with user bubbles (right-aligned, white background) and AI responses
- Input area with gradient border (86px height), textarea, paperclip/image/microphone icons
- Expand button navigates to `/chat/:conversationId`
- State persisted in localStorage: `bhr-chat-panel-open`

#### ChatContext (`src/contexts/ChatContext.tsx`)
- Centralized state management for conversations
- Actions: `createNewChat`, `selectConversation`, `addMessage`
- localStorage persistence for selected conversation
- Search/filter functionality for conversation list

#### ChatSidebar (`src/components/ChatSidebar/`)
- 280px wide sidebar for full-screen chat view
- Header: Green sparkle icon, collapse button (arrows inward), close button
- New Chat button creates empty conversation
- "Chats" section with search functionality
- Scrollable conversation list with active state highlighting
- No borders (removed for cleaner look)

#### ChatContent (`src/components/ChatContent/`)
- Main chat display area with rounded grey background (20px radius)
- User messages: white bubbles, no border, right-aligned
- AI messages: "BambooHR Assistant" label with green sparkle icon, left-aligned
- Suggestion chips after AI responses
- Input: pill-shaped white container (max-width 800px) with shadow on grey background
- Auto-expanding textarea

#### Chat Page (`src/pages/Chat/`)
- Full-screen chat view at `/chat` and `/chat/:conversationId`
- No GlobalHeader, no GlobalNav - completely standalone
- Two-column layout: ChatSidebar (280px) + ChatContent (flex-1)
- URL-driven conversation selection

### Navigation Flow
1. User clicks "Ask" button in GlobalHeader → slide-in panel opens
2. User clicks expand icon → navigates to `/chat/:id`, panel closes
3. User clicks collapse (arrows) → returns to home with slide-in panel open
4. User clicks X → returns to home with chat completely closed

### Data
- `src/data/chatData.ts` - 15 mock conversations (Employee Onboarding, PTO Policy, Benefits, etc.)
- Interfaces: `ChatMessage`, `ChatConversation`

## Figma Design Reference
- Main file: https://www.figma.com/design/3Vs1Yo2HwNrSFJoqBIr6ya/2026-AI-Framework
- Key nodes:
  - Create Job page: `node-id=999-30921`
  - Inline message: `node-id=999-31248`
  - Fill it In button: `node-id=1006-206561`
