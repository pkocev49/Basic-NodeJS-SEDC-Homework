import exp from "constants";
import fs from "fs";
import path from "path";
import colors from "colors";

import { v4 as uuidv4 } from "uuid";

const writeToFile = (path, data) => {
  fs.writeFileSync(path, data);
};

const appendToFile = (path, data) => {
  fs.appendFileSync(path, data);
};
const readFromFile = (path) => {
  const content = fs.readFileSync(path, { encoding: "utf-8" });

  return content;
};
export const readTodos = (path) => {
  const todos = readFromFile(path);
  const parseTodos = JSON.parse(todos);
  return parseTodos;
};

export const addTodo = (path, todoName, isTodoDone) => {
  const todo = {
    id: uuidv4(),
    name: todoName,
    done: isTodoDone,
  };
  const allTodos = readTodos(path);
  allTodos.push(todo);

  writeToFile(path, JSON.stringify(allTodos, null, 2));
};

export const deleteTodo = (path, id) => {
  const allTodos = readTodos(path);
  const filtered = allTodos.filter((todo) => todo.id != id);
  writeToFile(path, JSON.stringify(filtered, null, 2));
};
export const getTodoById = (path, id) => {
  const allTodos = readTodos(path);

  const todo = allTodos.find((todo) => todo.id === id);

  console.log(todo);
};

export const markTodoAsDone = (path, id) => {
  const allTodos = readTodos(path);

  const todo = allTodos.find((todo) => todo.id === id);

  if (todo) {
    if (todo.done === false) {
      todo.done = true;
      writeToFile(path, JSON.stringify(allTodos, null, 2));
      console.log(`Todo marked as done.`.bgGreen);
    } else {
      console.log(`Todo already done.`.bgBlue);
    }
  } else {
    console.log(`Todo not found.`.bgRed);
  }
};
