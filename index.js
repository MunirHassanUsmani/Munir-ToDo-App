const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let todos = [
  { id: 1, message: "This todo has been fully replaced" },
  { id: 2, message: "Happy Birthday reminder" },
  { id: 3, message: "Complete assignment" },
  { id: 4, message: "Read DSA Book" }
];

app.get("/", (req, res) => {
  res.send("✅ Munir's To-Do API is running.");
});

app.get("/todos", (req, res) => {
  res.json(todos);
});

app.post("/todos", (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "Message is required" });

  const newTodo = {
    id: todos.length ? todos[todos.length - 1].id + 1 : 1,
    message
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.put("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { message } = req.body;
  const index = todos.findIndex(todo => todo.id === id);
  if (index === -1) return res.status(404).json({ error: "Todo not found" });

  todos[index] = { id, message };
  res.json(todos[index]);
});

app.patch("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { message } = req.body;
  const todo = todos.find(todo => todo.id === id);
  if (!todo) return res.status(404).json({ error: "Todo not found" });

  if (message) todo.message = message;
  res.json(todo);
});

app.delete("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex(todo => todo.id === id);
  if (index === -1) return res.status(404).json({ error: "Todo not found" });

  const deleted = todos.splice(index, 1);
  res.json(deleted[0]);
});

app.get("/todos/sort/id", (req, res) => {
  const { k } = req.query;
  const sorted = todos
    .slice()
    .sort((a, b) => (k === "desc" ? b.id - a.id : a.id - b.id));
  res.json(sorted);
});

app.get("/todos/sort/message", (req, res) => {
  const { k } = req.query;
  const sorted = todos
    .slice()
    .sort((a, b) =>
      k === "desc"
        ? b.message.localeCompare(a.message)
        : a.message.localeCompare(b.message)
    );
  res.json(sorted);
});

app.get("/todos/search", (req, res) => {
  const q = req.query.q?.toLowerCase() || "";
  const result = todos.filter(todo =>
    todo.message.toLowerCase().includes(q)
  );
  res.json(result);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
