// src/mocks/handlers.ts

// import
import { rest } from 'msw'; // msw 1.0v 기준

export const handlers = [
	// mock login
	rest.post('http://localhost:3000/login', (req, res, ctx) => {
		return res(ctx.status(200), ctx.json({ message: 'Login successful' }));
	}),
];
