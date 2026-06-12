# GEMINI.md - Project Context and Architectural Patterns

## Project Overview
**Kingdom Running Club (KRC) Member Dashboard** is a React-based single-page application (SPA) serving as a member dashboard. It integrates into a WordPress site and communicates with the WordPress REST API for authentication and data.

### Main Technologies:
- **Frontend Framework:** React 18
- **Styling & UI Library:** Material UI (MUI) 5
- **Routing:** React Router 6 (using `createBrowserRouter` declarative routing)
- **State Management:** Redux Toolkit
- **Backend Integration:** WordPress REST API (JWT Auth plugin)
- **Media Storage:** Custom WordPress plugin (`krc-wp-plugin.php`) and IBM Cloud Object Storage

---

## Architectural Patterns

### 1. Declarative Routing & Loader Pattern
- The application uses React Router 6's `createBrowserRouter` in [App.jsx](file:///c:/Users/NLazarevic/ME/KRC/krc-client/src/App.jsx).
- Data fetching is integrated directly with route definition using React Router **Loaders** (e.g., `homePageLoader`, `classesLoader`, `handoutsLoader`).
- Routes are protected via the [ProtectedRoute](file:///c:/Users/NLazarevic/ME/KRC/krc-client/src/util/ProtectedRoute.jsx) component wrapping page views.

### 2. State Management (Redux Slices)
- Global application state is managed via Redux Toolkit.
- Slices reside in the `src/store/` directory:
  - `auth`: Manages authentication state, user emails, and token storage.
  - `ui`: Handles navigation drawer visibility and toggle states.
  - `resources`: Handles resource states.

### 3. Separation of Concerns (Pages vs. Components)
- **Pages** (`src/pages/`): Coordinate actions, form submission actions, and load data (via loaders).
- **Components** (`src/components/`): Presentational and interactive elements (e.g., [LoginComp.jsx](file:///c:/Users/NLazarevic/ME/KRC/krc-client/src/components/login/LoginComp.jsx), navigation elements).

### 4. Styling & Theming
- The design system uses MUI Theme Provider.
- A centralized theme definition is located in `src/theme/BeautifulTheme.jsx`.

### 5. Authentication & Environment Dev Bypass
- JWT-based authentication. The JWT tokens, emails, and niceNames are saved into local storage.
- In [LoginComp.jsx](file:///c:/Users/NLazarevic/ME/KRC/krc-client/src/components/login/LoginComp.jsx), there is a development-only login bypass enabled when `process.env.NODE_ENV === "development"`.
