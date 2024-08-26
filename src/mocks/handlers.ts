// src/mocks/handlers.ts

import { rest } from "msw";
import { db } from "./db";

export const handlers = [
  rest.post("http://localhost:3000/login", async (req, res, ctx) => {
    const { id, password } = await req.json();

    if (id === "admin" && password === "admin") {
      return res(
        ctx.delay(5000),
        ctx.status(200),
        ctx.json({ message: "Login successful" }),
      );
    } else {
      return res(
        ctx.delay(5000),
        ctx.status(401), // 401 Unauthorized
        ctx.json({ message: "Invalid credentials" }),
      );
    }
  }),
  rest.get("http://localhost:3000/todoList", async (req, res, ctx) => {
    const lists = await db.todoList.toArray();
    return res(
      ctx.status(200),
      ctx.json({
        todoList: lists,
      }),
    );
  }),
  rest.post("http://localhost:3000/todo", async (req, res, ctx) => {
    const { id, title } = await req.json();
    console.log("id", id, "title", title);

    try {
      const item = await db.todoList.get(id);
      if (item) {
        item.todo.push(title);
        await db.todoList.put(item);
        console.log("Item updated successfully");
        return res(ctx.json({ message: "Item updated successfully" }));
      } else {
        throw new Error("Item not found");
      }
    } catch (error) {
      console.error("Failed to update item:", error);
      return res(
        ctx.status(500),
        ctx.json({ message: "Failed to update item" }),
      );
    }
  }),
  rest.post("http://localhost:3000/list", async (req, res, ctx) => {
    const { title } = await req.json();
    console.log("title", title);

    try {
      await db.todoList.add({ title, todo: [] });
      return res(ctx.json({ message: "Item updated successfully" }));
    } catch (error) {
      console.error("Failed to update List:", error);
      return res(
        ctx.status(500),
        ctx.json({ message: "Failed to update List" }),
      );
    }
  }),

  rest.post("http://localhost:3000/listDrag", async (req, res, ctx) => {
    const { prev, current } = await req.json();
    console.log("drag prev to current", prev, current);

    try {
      // 데이터베이스에서 todoList 가져오기
      const todoList = await db.todoList.toArray();

      // prev와 동일한 id를 가진 항목 찾기
      const itemIndex = todoList.findIndex((item) => item.id === prev);
      if (itemIndex === -1) {
        throw new Error("Item with the given id not found");
      }

      // 해당 항목을 배열에서 제거
      const [item] = todoList.splice(itemIndex, 1);

      // current 위치에 항목 삽입
      todoList.splice(current, 0, item);

      // 데이터베이스 업데이트
      db.todoList.clear();
      await db.transaction("rw", db.todoList, async () => {
        for (const item of todoList) {
          await db.todoList.put({ title: item.title, todo: item.todo });
        }
      });
      return res(ctx.json({ message: "Item updated successfully" }));
    } catch (error) {
      console.error("Failed to update List:", error);
      return res(
        ctx.status(500),
        ctx.json({ message: "Failed to update List" }),
      );
    }
  }),

  rest.post("http://localhost:3000/todoDrag", async (req, res, ctx) => {
    const { prevList, currentList, prevTodo, currentTodo } = await req.json();
    console.log(
      "drag prev to current",
      prevList,
      currentList,
      prevTodo,
      currentTodo,
    );
    try {
      const todoList = await db.todoList.toArray();
      const [prevTodoList] = todoList[prevList].todo.splice(prevTodo, 1);
      console.log("prevTodoList", prevTodoList);
      todoList[currentList].todo.splice(currentTodo, 0, prevTodoList);
      console.log("currentTodoList", todoList[currentList].todo);
      console.log("todoList", todoList);
      // 데이터베이스 업데이트
      db.todoList.clear();
      await db.transaction("rw", db.todoList, async () => {
        for (const item of todoList) {
          await db.todoList.put({ title: item.title, todo: item.todo });
        }
      });
      return res(ctx.json({ message: "Item updated successfully" }));
    } catch (error) {
      console.error("Failed to update List:", error);
      return res(
        ctx.status(500),
        ctx.json({ message: "Failed to update List" }),
      );
    }
  }),
];
