import React from "react";
import { CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  return (
    <div>
      <CssBaseline />
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
