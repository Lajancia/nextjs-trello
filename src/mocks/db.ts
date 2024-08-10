import Dexie, { type EntityTable } from "dexie";

interface Data {
  id: number;
  title: string;
  todo: string[];
}

const db = new Dexie("TodoListDatabase") as Dexie & {
  todoList: EntityTable<
    Data,
    "id" // primary key "id" (for the typings only)
  >;
};

// Schema declaration:
db.version(1).stores({
  todoList: "++id, todo", // primary key "id" (for the runtime!)
});

export type { Data };
export { db };
