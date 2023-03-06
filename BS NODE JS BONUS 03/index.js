import {
  addTodo,
  readTodos,
  deleteTodo,
  getTodoById,
  markTodoAsDone,
} from "./file_system.js";

readTodos("./todos.json");

addTodo("./todos.json", "Study node html and css", false);
// deleteTodo("./todos.json", "f66dd2f7-9a66-40d0-9994-fc86ea958bed");
getTodoById("./todos.json", "00fcdbfe-574e-4dcd-8a04-a7c88275fdaa");
markTodoAsDone("./todos.json", "f3fd9954-fe99-4a8c-8847-07ed6b50a408");
