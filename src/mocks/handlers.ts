// src/mocks/handlers.ts

import { rest } from "msw";

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
];
