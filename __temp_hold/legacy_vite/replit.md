# Boardy - Board Game Rental Platform

## Overview
Boardy is a board game rental platform for hostels, allowing guests to browse and rent board games, as well as join Saturday Night gaming events.

## Project Architecture

### Tech Stack
- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with shadcn/ui components
- **Routing**: React Router DOM v6
- **State Management**: TanStack React Query
- **Forms**: React Hook Form with Zod validation

### Project Structure
```
src/
├── components/          # Reusable components
│   ├── ui/             # shadcn/ui components
│   ├── EventCard.tsx   # Event display card
│   ├── FiltersBar.tsx  # Filtering controls
│   ├── GameCard.tsx    # Game display card
│   ├── Header.tsx      # Navigation header
│   └── ...
├── data/
│   └── mockData.ts     # Mock data for development
├── hooks/              # Custom React hooks
├── lib/
│   └── utils.ts        # Utility functions
├── pages/              # Route pages
│   ├── Admin.tsx       # Admin dashboard
│   ├── EventDetail.tsx # Event details page
│   ├── Events.tsx      # Events listing
│   ├── GameDetail.tsx  # Game details page
│   ├── Games.tsx       # Games catalog
│   ├── Home.tsx        # Landing page
│   ├── Profile.tsx     # User profile
│   └── Rentals.tsx     # User rentals
└── types/
    └── index.ts        # TypeScript type definitions
```

### Running the Project
- Development: `npm run dev` (runs on port 5000)
- Build: `npm run build`
- Preview: `npm run preview`

## Recent Changes
- 2026-01-04: Migrated from Lovable to Replit environment
  - Updated vite.config.ts to use port 5000 and allow all hosts
  - Configured deployment for static hosting

## User Preferences
- None recorded yet
