# Todo Manager App

A modern, minimal single-page React application for managing todos.

## Features

- **Add** new todos with input and save
- **Edit** todos inline and save/cancel
- **Delete** todos instantly
- **Toggle-complete** todos with a checkbox
- **Persist** todos across refresh using localStorage
- Modern and responsive UI with light theme, #3b82f6 (primary) and #06b6d4 (success) color accents
- No backend required

## Usage

1. Clone the repository or copy the `frontend_react` folder to your React workspace.
2. In the directory, run:

   ```
   npm install
   npm start
   ```

3. Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure Highlights

- Components: `src/components/`
  - `Header.jsx` - App header
  - `TodoInput.jsx` - Input for add/edit todos
  - `TodoList.jsx` - List of todos
  - `TodoItem.jsx` - Single todo item
- Styling: `src/styles.css` with theme tokens (#3b82f6, #06b6d4, etc.)

## Styling & Theme

- Primary: #3b82f6
- Success: #06b6d4
- Secondary: #64748b
- Error: hsl(0 84% 60%)
- Modern, accessible design, responsive to mobile

## Environment

Runs fully client-side—no backend is needed or used.

## License

MIT
