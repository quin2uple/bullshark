# Catalog Explorer

BullShark Catalog Explorer

🔗 **[Live Demo](https://bullshark-six.vercel.app/)**

## Features

### Core Functionality ✅

- ✅ **Data Fetching**: Fetches product data from local JSON file with simulated loading delay
- ✅ **Product Display**: Shows name, category, price, rating, and favorite toggle (★/☆)
- ✅ **Search**: Case-insensitive partial matching by product name
- ✅ **Category Filter**: Dropdown with "All" + unique categories from data
- ✅ **Sorting**: Sort by price and rating (ascending/descending)
- ✅ **Favorites**:
  - Toggle favorite status for any item
  - Persisted in localStorage across page reloads
  - "Show favourites only" switch
- ✅ **Empty States**: Friendly messages when no results match filters
- ✅ **Loading State**: Beautiful skeleton UI during data fetch

### Bonus Features ✅

- ✅ **Debounced Search**: 300ms debounce on search input for better performance
- ✅ **Client-side Pagination**: 9 items per page with elegant pagination controls
- ✅ **Unit Tests**: Comprehensive test coverage for critical functionality

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **Testing**: Vitest + React Testing Library
- **State Management**: React hooks (no external libraries)

## Getting Started

### Prerequisites

- Node.js (v20.11+)
- npm

### Installation

```bash
# Install dependencies
npm install
```

### Running the App

```bash
# Development mode
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Running Tests

```bash
# Run tests once
npm test -- --run

# Run tests in watch mode
npm test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## Project Structure

```
src/
├── components/
│   ├── catalog/
│   │   ├── CatalogExplorer.tsx       # Main container component
│   │   ├── CatalogHeader.tsx         # Header with title
│   │   ├── CatalogFilters.tsx        # Search, filters, sort controls
│   │   ├── CatalogList.tsx           # Grid of product cards
│   │   ├── CatalogItemCard.tsx       # Individual product card
│   │   ├── CatalogListSkeleton.tsx   # Loading skeleton
│   │   ├── NoCatalog.tsx             # Empty state
│   │   └── index.ts                  # Barrel exports
│   └── index.ts                      # Component exports
├── elements/
│   ├── Pagination.tsx                # Pagination controls
│   ├── Rating.tsx                    # Star rating display
│   └── index.ts                      # Barrel exports
├── hooks/
│   ├── useCatalogData.ts             # Data fetching hook
│   ├── useDebouncedValue.ts          # Search debounce hook
│   ├── useFavorites.ts               # Favorites management hook
│   ├── useFavorites.test.ts          # ✅ Unit test
│   └── index.ts                      # Barrel exports
├── utils/
│   ├── catalog.ts                    # Filter, sort, format utilities
│   ├── catalog.test.ts               # ✅ Unit test
│   └── index.ts                      # Barrel exports
├── types/
│   ├── catalog.ts                    # Catalog Type definitions
│   └── index.ts                      # Barrel exports
├── constants/
│   ├── catalog.ts                    # Catalog constants
│   └── index.ts                      # Barrel exports
├── test/
│   └── setup.ts                      # Test configuration
├── App.tsx                           # App entry point
└── main.tsx                          # React root
```

## Test Coverage

### Test Files (8 tests total)

#### 1. `catalog.test.ts` - Filtering & Sorting (5 tests)

- ✅ Filter items by name (case-insensitive search)
- ✅ Filter by category
- ✅ Sort by price (ascending)
- ✅ Sort by rating (descending)
- ✅ Filter favorites only

#### 2. `useFavorites.test.ts` - Favorites Persistence (3 tests)

- ✅ Toggle favorite on and off
- ✅ Persist favorites to localStorage
- ✅ Load favorites from localStorage on mount

### Running Tests

```bash
# Run tests once
npm test -- --run

# Run tests in watch mode
npm test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

### Test Results

```
✓ src/utils/catalog.test.ts (5 tests)
✓ src/hooks/useFavorites.test.ts (3 tests)

Test Files  2 passed (2)
     Tests  8 passed (8)
```

## Architecture Decisions

### Component Organization

- **Separation of Concerns**: Components are organized by feature (catalog) and reusability (elements)
- **Barrel Exports**: Each folder has an `index.ts` for clean imports
- **TypeScript**: Full type safety throughout the application

### State Management

- **No External Libraries**: Uses React's built-in hooks (useState, useMemo, useCallback)
- **Custom Hooks**: Encapsulates complex logic (data fetching, debouncing, favorites)
- **localStorage**: Direct persistence for favorites (no overhead of state management library)

### Path Aliases

- **`@/` prefix**: Maps to `src/` for cleaner imports
- Example: `import { CatalogList } from "@/components/catalog"`

### Performance Optimizations

- **Debounced Search**: 300ms delay prevents excessive filtering
- **useMemo**: Memoized filtering/sorting calculations
- **useCallback**: Stable function references to prevent re-renders
- **Pagination**: Only renders 9 items at a time

### Styling

- **Tailwind CSS v4**: Utility-first CSS with modern features
- **Responsive Design**: Mobile-first approach with breakpoints
- **Gradient Backgrounds**: Modern, polished UI
- **SVG Stars**: Custom SVG-based rating component
- **Accessibility**: ARIA labels, semantic HTML, keyboard navigation

## Assumptions

1. **Data Source**: Items are fetched from `/items.json` in the public folder
2. **Currency**: All prices are in USD (simplified from original over-engineered approach)
3. **Favorites**: Stored per browser (localStorage), not synced across devices
4. **Loading Delay**: Minimum 500ms to ensure skeleton is visible
5. **Pagination**: Fixed at 9 items per page (3x3 grid)
6. **Search**: Searches only product names (not descriptions or categories)

## Completed vs Skipped

### Functional Requirements ✅

- [x] Fetch data from local JSON (simulated API with loading delay)
- [x] List view shows name, category, price, rating, and favorite toggle (★/☆)
- [x] Search by name (case-insensitive, partial matches)
- [x] Filter by category (dropdown with "All" + unique categories)
- [x] Sort by price and rating (ascending/descending)
- [x] Favorites:
  - [x] Toggle favorite for any item
  - [x] Persist in localStorage (survives reload)
  - [x] "Show favourites only" switch
- [x] Empty states: Friendly message for no results
- [x] Loading state: Loading indicator while fetching

### Non-Functional Requirements ✅

- [x] Clean structure (components/hooks organization)
- [x] Tailwind CSS (no heavy UI libraries)
- [x] No external state libraries (pure React hooks)

### Bonus Features ✅

- [x] Debounced search (300ms)
- [x] Client-side pagination (9 per page)
- [x] Unit tests for critical functionality (filtering/sorting/favorites)

## Development Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm test             # Run tests
npm run test:ui      # Run tests with UI
npm run test:coverage # Generate coverage report
```
