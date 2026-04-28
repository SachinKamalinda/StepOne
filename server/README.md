# StepOne — Backend

Express.js REST API backed by MongoDB via Mongoose.

## Setup

```bash
npm install
cp .env.example .env
```

Edit `.env`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/todo-app   # or Atlas URI
CLIENT_URL=http://localhost:3000
```

```bash
npm run dev    # development (nodemon)
npm start      # production
```

## API Endpoints

| Method | Endpoint              | Description              |
|--------|-----------------------|--------------------------|
| GET    | /api/todos            | Get all todos            |
| POST   | /api/todos            | Create a todo            |
| PUT    | /api/todos/:id        | Update title/description |
| PATCH  | /api/todos/:id/done   | Toggle done status       |
| DELETE | /api/todos/:id        | Delete a todo            |

## MongoDB

- **Local**: Install MongoDB Community and run `mongod`. Default URI: `mongodb://localhost:27017/todo-app`
- **Atlas**: Create a free cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas), copy the connection string into `.env`.

## Assumptions & Limitations

- No authentication — todos are shared globally.
- `description` is optional and defaults to an empty string.
- Mongoose timestamps (`createdAt`, `updatedAt`) are auto-managed.
- Input is trimmed and validated server-side; title max 200 chars, description max 1000 chars.
