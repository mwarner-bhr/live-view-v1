# Design Patterns & Guidelines

## Dropdown Component Usage

### When to use each dropdown style:

1. **Dropdown Component** (rounded, pill-shaped)
   - File: `src/components/Dropdown/Dropdown.tsx`
   - Use when: The dropdown is standalone or in filters/search bars
   - Style: Rounded-full borders, used in isolation
   - Examples: Filter controls, search options, standalone selections

2. **FormDropdown Component** (rectangular, form-styled)
   - File: `src/components/FormDropdown/FormDropdown.tsx`
   - Use when: The dropdown is part of a form with other input fields
   - Style: Rectangular with rounded corners, matches TextInput styling
   - Examples: Form fields in employee forms, settings forms, any multi-field form

### Rule of thumb:
- Standalone dropdown → Use `Dropdown`
- Form field dropdown → Use `FormDropdown`

The FormDropdown matches the styling of TextInput components to maintain visual consistency across form fields.
