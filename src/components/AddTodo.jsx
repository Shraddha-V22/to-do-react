import React from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { useTheme } from "@mui/material";

export default function AddTodo() {
  const [title, setTitle] = useState("");
  const theme = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title !== "") {
      await addDoc(collection(db, "todos"), {
        title,
        completed: false,
      });
      setTitle("");
    }
  };

  return (
    <Box
      component={"form"}
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      maxWidth="xs"
    >
      <Box className="input_container">
        <TextField
          type="text"
          variant="outlined"
          placeholder="Enter todo..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{
            m: 1,
            p: 1,
          }}
        />
      </Box>
      <div className="btn_container">
        <Button
          sx={{ color: theme.palette.secondary.dark }}
          onClick={handleSubmit}
        >
          Add
        </Button>
      </div>
    </Box>
  );
}
