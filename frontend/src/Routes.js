import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./containers/Home/Home";
import NotFound from "./containers/NotFound/NotFound";
import Login from "./containers/Login/Login";
import Signup from "./containers/Signup/Signup";
import NewNote from "./containers/NewNote/NewNote";
import Notes from "./containers/Notes/Notes";
import Settings from "./containers/Settings/Settings";

export default function Links() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/notes/new" element={<NewNote />} />
      <Route path="/notes/:id" element={<Notes />} />
      <Route path="*" element={<NotFound />} />;
    </Routes>
  );
}
