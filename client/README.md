# StepOne — Frontend

React frontend for the StepOne TODO app.

## Setup

```bash
npm install
npm start       # starts on http://localhost:3000
npm run build   # production build
```

The CRA proxy in `package.json` forwards `/api/*` to `http://localhost:5000`, so no extra config is needed for local development.

## Environment Variables

Only needed when deploying frontend and backend separately:

```env
REACT_APP_API_URL=https://your-backend.com/api/todos
```

## Architecture

```
src/
├── api/
│   └── todos.js        # All HTTP calls — single source of truth
├── hooks/
│   └── useTodos.js     # State management + optimistic updates
├── components/
│   ├── TodoForm.jsx    # Add new todos with client-side validation
│   ├── TodoList.jsx    # Splits todos into pending / completed sections
│   ├── TodoItem.jsx    # Individual item — view, edit, toggle, delete
│   └── ErrorBanner.jsx # Dismissible error display
├── App.js
└── App.css
```

## Design Decisions

- **Optimistic UI**: All mutations update the local state immediately and roll back on API error, making the app feel instant.
- **Custom hook** (`useTodos`): All server state lives here, keeping components presentational and easy to test.
- **API layer** (`api/todos.js`): Fetch wrapper centralises base URL, headers, and error parsing — easy to swap for axios or React Query later.
- **No external state library**: The app is simple enough that React `useState` + a custom hook is sufficient.

## Assumptions & Limitations

- No pagination; all todos load at once. Add pagination if the list grows large.
- No authentication.
- Relies on the backend running on port 5000 (or `REACT_APP_API_URL` being set).
