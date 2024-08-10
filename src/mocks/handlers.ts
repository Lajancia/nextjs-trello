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
];
