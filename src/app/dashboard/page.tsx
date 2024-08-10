"use client";

import React, { useState } from "react";
import { Card } from "@mui/material";
import TodoListButton from "@/components/TodoListButton";
import { useTodoListQuery, useTodoMutation } from "@/utils/todoList";

const Dashboard = () => {
  const { data, isLoading } = useTodoListQuery();
  const { mutate, isLoading: todoLoading } = useTodoMutation();

  const handleTodoAdd = (_id: number, _title: string) => {
    mutate({ id: _id, title: _title });
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
      {data.todoList.map((list: any) => (
        <Card
          draggable
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
            {list.todo.map((todo: string) => (
              <div
                draggable
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

      {/* <TodoListButton>+ Add List</TodoListButton> */}
    </div>
  );
};

export default Dashboard;
