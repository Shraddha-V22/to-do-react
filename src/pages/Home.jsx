import { useState } from "react";
import AddTodo from "../components/AddTodo";
import Todo from "../components/Todo";
import {
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useEffect } from "react";
import React from "react";
import { Box, Container, Paper } from "@mui/material";

export default function Home() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let todosArray = [];
      querySnapshot.forEach((doc) => {
        todosArray.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArray);
    });
    return () => unsub();
  }, []);

  const handleEdit = async (todo, title) => {
    await updateDoc(doc(db, "todos", todo.id), { title: title });
  };
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      completed: !todo.completed,
    });
  };
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  return (
    <>
      <Paper
        sx={{
          paddingBlock: "10px",
          mt: 12,
          maxWidth: "800px",
          marginInline: "auto",
        }}
      >
        <Box>
          <AddTodo />
        </Box>
      </Paper>
      <Paper
        sx={{
          paddingBlock: "10px",
          mt: 4,
          maxWidth: "800px",
          marginInline: "auto",
        }}
      >
        <Box
          sx={{
            mt: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {todos.map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              toggleComplete={toggleComplete}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          ))}
        </Box>
      </Paper>
    </>
  );
}
