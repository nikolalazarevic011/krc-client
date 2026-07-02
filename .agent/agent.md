# KRC Client - Architecture & Patterns

This document describes the architectural patterns, libraries, and design decisions used in the `krc-client` codebase.

## 1. Core Framework & Environment
- **React 18.2.0**: The UI is built using functional React components.
- **Create React App (CRA)**: The project uses `react-scripts` for its build, test, and development server configuration.
- **Build Target**: Deployed to WordPress as a members' dashboard (indicated by `homepage` in `package.json` pointing to a WordPress subpath: `https://krc.kingdomrunningclub.org/running_dashboard/members/build/`).

## 2. Architectural Patterns

### Routing & Data Fetching (React Router v6)
- **Declarative Nested Routing**: Uses `react-router-dom` v6's `createBrowserRouter` with a root layout component (`Root.jsx`) and nested children routes.
- **Loaders & Actions**: Uses React Router's `loader` and `action` APIs to keep data fetching and mutations close to the route definition.
  - Loaders (e.g., `tokenLoader`, `homePageLoader`) run before rendering to fetch necessary data.
  - Actions (e.g., `LoginAction`) handle form submissions and state updates (like authentication).

### State Management
- **Redux Toolkit**: Centralized state management using Redux Toolkit (`@reduxjs/toolkit`).
- **Slices**: State is sliced by domain:
  - `auth`: Manages session/token state.
  - `ui`: Handles global UI states (e.g., modal visibility, loading states).
  - `resources`: Manages resources files/data.
- **Integration**: Placed at the root level using React Redux's `<Provider>`.

### UI and Design System
- **Material-UI (MUI v5)**: Components are styled and themed using MUI (`@mui/material`, `@mui/icons-material`, `@mui/lab`).
- **Custom Theme**: Centralized custom theme defined in `src/theme/BeautifulTheme.js` to ensure consistent color palettes, typography, and styling.
- **CssBaseline**: Included at the top-level to normalize CSS defaults.
- **CSS-in-JS**: Powered by Emotion (`@emotion/react`, `@emotion/styled`) for component-scoped styling.

### Security & Authentication
- **Route Protection**: Active routes are wrapped in a custom `<ProtectedRoute>` component.
- **Token Management**: Handled via local storage utilities, integrated into route loaders (such as `tokenLoader`) to verify user session authenticity before loading pages.

## 3. Directory Structure
- `src/components/`: Reusable components (e.g., navigation, layout wrappers).
- `src/pages/`: Feature/domain-specific page folders (e.g., `Auth/`, `Classes/`, `Exercises/`, `Handouts/`, `HomeWork/`, `Resources/`).
- `src/store/`: Redux slices and store configuration.
- `src/theme/`: Custom MUI theme definitions.
- `src/util/`: Helper utilities (e.g., auth, route guards).
