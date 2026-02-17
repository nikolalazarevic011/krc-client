# GEMINI.md - Project Context

## Project Overview
**Kingdom Running Club (KRC) Member Dashboard** is a React-based single-page application (SPA) designed to serve as a dashboard for members of the Kingdom Running Club. It is integrated into a WordPress site and communicates with the WordPress REST API for authentication and data.

### Main Technologies:
- **Frontend:** React 18, Material UI (MUI) 5, Redux Toolkit, React Router 6.
- **State Management:** Redux (slices for `auth`, `ui`, and `resources`).
- **Backend Integration:** WordPress REST API (using JWT Auth plugin).
- **Media Storage:** Integrated with IBM Cloud Object Storage via a custom WordPress plugin (`krc-wp-plugin.php`).

## Building and Running
The project is managed with `npm` and `react-scripts`.

### Key Commands:
- `npm start`: Runs the app in development mode at `https://localhost:3000`. Note that HTTPS is enabled via `.env` and requires `cert.pem` and `key.pem`.
- `npm run build`: Builds the app for production. The production build is configured to run at the subpath `/running_dashboard/members/build/` as specified in `package.json` and `.env.production`.
- `npm test`: Launches the test runner in interactive watch mode.

## Development Conventions
- **Routing:** Uses React Router 6's `createBrowserRouter` for declarative routing. Routes are protected using a `ProtectedRoute` component (`src/util/ProtectedRoute.jsx`).
- **Theming:** Centralized MUI theme in `src/theme/BeautifulTheme.jsx`.
- **Authentication:** JWT-based authentication. Tokens and user profiles are stored in `localStorage` upon successful login via `src/pages/Auth/Login.jsx`.
- **Environment Variables:**
  - `REACT_APP_API_URL`: Points to the WordPress REST API endpoint (`https://kingdomrunningclub.org/wp-json`).
  - `REACT_APP_DEFAULT_PATH`: The base path for the application (differs between development and production).

## Project Structure & Key Files
- `src/App.jsx`: Main entry point for routing, theme provision, and global configuration.
- `src/index.js`: Standard React entry point, wrapping the app with the Redux Provider.
- `src/store/`: Contains Redux slices and store configuration.
- `src/pages/`: Contains all page-level components (Home, Classes, Handouts, Homework, etc.).
- `src/components/`: Modular UI components organized by feature (navigation, login, detail views).
- `krc-wp-plugin.php`: A WordPress plugin file that facilitates displaying media from IBM Cloud Object Storage using shortcodes (`[krc_image]`, `[krc_gallery]`).
- `.env.production`: Configures the production build for the specific deployment subdirectory on the KRC website.
