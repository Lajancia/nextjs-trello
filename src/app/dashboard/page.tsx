"use client";

import React, { useState } from "react";
import { Card } from "@mui/material";
import TodoListButton from "@/components/TodoListButton";
import {
  useTodoListQuery,
  useTodoMutation,
  useListMutation,
  useListDragMutation,
  useTodoDragMutation,
} from "@/utils/todoList";

const Dashboard = () => {
  const [draggingListId, setDraggingListId] = useState<number | null>(null);
  const [dragOverListId, setDragOverListId] = useState<number | null>(null);
  const [draggingTodoId, setDraggingTodoId] = useState<number | null>(null);
  const [dragOverTodoId, setDragOverTodoId] = useState<number | null>(null);

  const { data, isLoading } = useTodoListQuery();
  const { mutate, isLoading: todoLoading } = useTodoMutation();
  const { mutate: listMutate, isLoading: listLoading } = useListMutation();
  const { mutate: listDragMutate } = useListDragMutation();
  const { mutate: todoDragMutate } = useTodoDragMutation();

  const handleTodoAdd = (_title: string, _id?: number) => {
    if (_id !== undefined) {
      mutate({ id: _id, title: _title });
    }
  };
  const handleListAdd = (_title: string) => {
    listMutate({ title: _title });
  };

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    id: number,
    setDraggingId: (props: number) => void,
  ) => {
    e.stopPropagation();
    setDraggingId(id);
  };

  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement>,
    id: number,
    setDragOverId: (props: number) => void,
  ) => {
    e.preventDefault();
    setDragOverId(id);
  };

  const handleDragEnd = (
    e: React.DragEvent<HTMLDivElement>,
    setDraggingTodoId: (props: null) => void,
    setDragOverTodoId: (props: null) => void,
    setDraggingListId: (props: null) => void,
    setDragOverListId: (props: null) => void,
  ) => {
    e.stopPropagation();
    setDraggingTodoId(null);
    setDragOverTodoId(null);
    setDraggingListId(null);
    setDragOverListId(null);
  };

  const handleDropOn = (
    e: React.DragEvent<HTMLDivElement>,
    prevList: number | null,
    currentList: number | null,
    prevTodo: number | null,
    currentTodo: number | null,
  ) => {
    if (draggingTodoId === null) {
      e.preventDefault();
      console.log("list", draggingTodoId);
      console.log("drag on", prevList, currentList);
      listDragMutate({ prev: prevList!, current: currentList! });
    } else {
      e.preventDefault();
      console.log("todo", draggingTodoId);
      console.log("drag on", prevList, currentList);
      console.log("drag on", prevTodo, currentTodo);
      todoDragMutate({
        prevList: prevList!,
        currentList: currentList!,
        prevTodo: prevTodo!,
        currentTodo: currentTodo!,
      });
    }
  };

  const handleDragTodoStart = (
    // 선택한 Todo 카드와 List id
    e: React.DragEvent<HTMLDivElement>,
    list: number,
    id: number,
    setDraggingListId: (props: number) => void,
    setDraggingTodoId: (props: number) => void,
  ) => {
    e.stopPropagation();
    setDraggingListId(list);
    setDraggingTodoId(id);
  };

  const handleDragTodoOver = (
    // 이동하고하 하는 위치의 Todo 위치와 List id
    e: React.DragEvent<HTMLDivElement>,
    list: number,
    id: number,
    setDragOverListId: (props: number) => void,
    setDragOverTodoId: (props: number) => void,
  ) => {
    e.preventDefault();
    setDragOverListId(list);
    setDragOverTodoId(id);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div
      style={{
        display: "flex",
        height: "90vh",
        alignItems: "flex-start",
        overflowX: "auto",
      }}
    >
      {data.todoList.map((list: any, listIndex: number) => (
        <Card
          key={listIndex}
          draggable
          onDragStart={(e) => handleDragStart(e, list.id, setDraggingListId)}
          onDragOver={(e) => handleDragOver(e, listIndex, setDragOverListId)}
          onDrop={(e) =>
            handleDropOn(
              e,
              draggingListId,
              dragOverListId,
              draggingTodoId,
              dragOverTodoId,
            )
          }
          onDragEnd={(e) =>
            handleDragEnd(
              e,
              setDraggingTodoId,
              setDragOverTodoId,
              setDraggingListId,
              setDragOverListId,
            )
          }
          style={{
            minHeight: "50px",
            minWidth: "20vw",
            margin: "8px",
            padding: "10px",
            backgroundColor: "#333",
            display: "inline-block",
            flexShrink: 0,
          }}
        >
          <h2 style={{ color: "#eee", marginBottom: "8px" }}>{list.title}</h2>
          <div>
            {list.todo?.map((todo: string, todoIndex: number) => (
              <div
                key={todoIndex}
                draggable
                onDragStart={(e) =>
                  handleDragTodoStart(
                    e,
                    listIndex,
                    todoIndex,
                    setDraggingListId,
                    setDraggingTodoId,
                  )
                }
                onDragOver={(e) =>
                  handleDragTodoOver(
                    e,
                    listIndex,
                    todoIndex,
                    setDragOverListId,
                    setDragOverTodoId,
                  )
                }
                onDrop={(e) =>
                  handleDropOn(
                    e,
                    draggingListId,
                    dragOverListId,
                    draggingTodoId,
                    dragOverTodoId,
                  )
                }
                onDragEnd={(e) =>
                  handleDragEnd(
                    e,
                    setDraggingTodoId,
                    setDragOverTodoId,
                    setDraggingListId,
                    setDragOverListId,
                  )
                }
                style={{
                  userSelect: "none",
                  padding: "10px",
                  marginBottom: "10px",
                  borderRadius: "4px",
                  backgroundColor: "#eee",
                }}
              >
                {todo}
              </div>
            ))}

            <TodoListButton id={list.id} onClickConfirm={handleTodoAdd}>
              + Add Todo
            </TodoListButton>
          </div>
        </Card>
      ))}

      <TodoListButton onClickConfirm={handleListAdd}>+ Add List</TodoListButton>
    </div>
  );
};

export default Dashboard;
