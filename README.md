# KRC Running Club App

A modern React-based member dashboard for the Kingdom Running Club, providing members with easy access to manage their information and view upcoming running classes.

## Features

- **Member Dashboard**: Centralized location for member details.

## Tech Stack

- **Framework**: [React 18](https://react.dev/) with React Router for routing.
- **UI Library**: [Material UI (MUI)](https://mui.com/) for a comprehensive set of UI components.
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) for predictable state management.
- **Styling**: Theme-based styling using Material UI's theme system.
- **Backend Integration**: Communicates with a WordPress REST API.

## Installation

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

Start the development server:

```bash
npm run dev
```

## Development

This project uses environment variables for configuration. A `.env.example` file is provided to list the necessary variables. Create a `.env` file and add the required configuration.

## Folder Structure

```
krc-client/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page-level components
│   ├── store/          # Redux Toolkit store and slices
│   ├── theme/          # Theme configuration and styles
│   ├── App.jsx         # Main application component and router setup
│   └── index.jsx       # Entry point
├── .env.example        # Environment variable template
└── package.json        # Project dependencies and scripts
```


