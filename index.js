const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const todos = [
  { id: 2, message: "Happy Birthday reminder" },
  { id: 1, message: "Buy groceries" },
  { id: 3, message: "Complete assignment" },
];


app.get("/todos/sort/id", (req, res) => {
  const { k } = req.query;
  const sorted = [...todos].sort((a, b) =>
    k === "desc" ? b.id - a.id : a.id - b.id
  );
  res.json(sorted);
});


app.get("/todos/sort/message", (req, res) => {
  const { k } = req.query;
  const sorted = [...todos].sort((a, b) =>
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
  console.log(`Server running on http://localhost:${PORT}`);
});
