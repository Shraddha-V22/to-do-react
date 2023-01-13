import {
  Box,
  Button,
  IconButton,
  Paper,
  TextField,
  useTheme,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Todo({
  todo,
  toggleComplete,
  handleDelete,
  handleEdit,
}) {
  const theme = useTheme();
  const [newTitle, setNewTitle] = useState(todo.title);

  const handleChange = (e) => {
    e.preventDefault();
    if (todo.complete === true) {
      setNewTitle(todo.title);
    } else {
      todo.title = "";
      setNewTitle(e.target.value);
    }
  };

  return (
    <Paper
      maxWidth="xs"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
        m: 1,
        width: "fit-content",
        paddingInline: 2,
        backgroundColor: theme.palette.grey[200],
      }}
    >
      <TextField
        type="text"
        style={{
          textDecoration: todo.completed && "line-through",
        }}
        value={todo.title === "" ? newTitle : todo.title}
        className="list"
        variant="standard"
        onChange={handleChange}
      />
      <div>
        <IconButton
          sx={{ color: theme.palette.secondary.main }}
          onClick={() => toggleComplete(todo)}
        >
          <CheckIcon />
        </IconButton>
        <IconButton
          sx={{ color: theme.palette.secondary.main }}
          onClick={() => handleEdit(todo, newTitle)}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          sx={{ color: theme.palette.secondary.main }}
          onClick={() => handleDelete(todo.id)}
        >
          <DeleteIcon />
        </IconButton>
      </div>
    </Paper>
  );
}
