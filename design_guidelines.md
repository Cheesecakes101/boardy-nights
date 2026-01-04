# Design Guidelines: Standard Tailwind Migration

## Design Approach
**System-Based Approach**: Using Tailwind's default design system with no custom tokens or CSS variables. Clean, maintainable, and production-ready styling using only Tailwind's built-in utilities.

## Core Design Principles
- **Zero Custom Tokens**: All styling uses standard Tailwind classes
- **Visual Consistency**: Maintain existing look while standardizing the token system
- **Production Ready**: Clean, maintainable code that builds without custom configuration

## Color System

### Primary Palette
- **Primary**: `blue-600` (buttons, links, accents)
- **Primary Hover**: `blue-700`
- **Primary Light**: `blue-50` (backgrounds)

### Neutrals
- **Background**: `white` (main), `gray-50` (secondary)
- **Foreground**: `slate-900` (primary text), `slate-600` (secondary text), `slate-400` (muted)
- **Borders**: `gray-200` (default), `gray-300` (emphasized)

### Semantic Colors
- **Success**: `green-600`, backgrounds `green-50`
- **Warning**: `amber-600`, backgrounds `amber-50`
- **Error**: `red-600`, backgrounds `red-50`
- **Info**: `blue-600`, backgrounds `blue-50`

### Interactive States
- **Focus Ring**: `ring-blue-500 ring-offset-2`
- **Hover**: Darken by one shade (e.g., `gray-200` → `gray-300`)

## Typography

### Font Stack
- **Sans-serif**: Tailwind default (`font-sans`)
- **Mono**: Tailwind default for code (`font-mono`)

### Scale
- **Heading 1**: `text-4xl font-bold text-slate-900`
- **Heading 2**: `text-3xl font-bold text-slate-900`
- **Heading 3**: `text-2xl font-semibold text-slate-900`
- **Heading 4**: `text-xl font-semibold text-slate-900`
- **Body**: `text-base text-slate-900`
- **Small**: `text-sm text-slate-600`
- **Tiny**: `text-xs text-slate-500`

## Spacing System
Use Tailwind's 4px base unit system: **2, 4, 6, 8, 12, 16, 24**

- **Component padding**: `p-4` to `p-6`
- **Section spacing**: `py-12` to `py-24`
- **Gap/spacing**: `gap-4`, `gap-6`, `gap-8`
- **Margins**: `mb-4`, `mb-6`, `mb-8` for vertical rhythm

## Component Library

### Buttons
- **Primary**: `bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`
- **Secondary**: `bg-white text-slate-900 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50`
- **Ghost**: `text-slate-700 hover:bg-gray-100 px-4 py-2 rounded-md`

### Cards
- **Standard**: `bg-white border border-gray-200 rounded-lg p-6 shadow-sm`
- **Hover**: Add `hover:shadow-md transition-shadow`

### Forms
- **Input**: `border border-gray-300 rounded-md px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0`
- **Label**: `text-sm font-medium text-slate-700 mb-1`
- **Helper Text**: `text-sm text-slate-500`
- **Error State**: `border-red-300 focus:border-red-500 focus:ring-red-500`

### Navigation
- **Links**: `text-slate-700 hover:text-slate-900 font-medium`
- **Active**: `text-blue-600 font-semibold`

### Modals/Overlays
- **Backdrop**: `bg-slate-900/50`
- **Panel**: `bg-white rounded-lg shadow-xl border border-gray-200`

## Layout System

### Containers
- **Max Width**: `max-w-7xl mx-auto px-4`
- **Content Width**: `max-w-4xl` for text-heavy content

### Grids
- **Standard**: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`

### Shadows
- **Subtle**: `shadow-sm`
- **Card**: `shadow-md`
- **Elevated**: `shadow-lg`

## Responsive Breakpoints
Use Tailwind defaults: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`

## Accessibility
- Maintain `focus:ring-2` on all interactive elements
- Use `focus:ring-offset-2` for white backgrounds
- Ensure text contrast: dark text on light backgrounds
- Preserve aria labels and semantic HTML

## Migration Notes
Replace all shadcn tokens systematically:
- `border-border` → `border-gray-200`
- `bg-background` → `bg-white`
- `text-foreground` → `text-slate-900`
- `text-muted-foreground` → `text-slate-600`
- `ring-ring` → `ring-blue-500`
- `bg-accent` → `bg-gray-100`
- `bg-secondary` → `bg-gray-100`