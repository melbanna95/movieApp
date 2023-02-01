import { Container } from "react-bootstrap";
import React from "react";
import NavBar from "./components/NavBar";
import MoviesList from "./components/MoviesList";
import MovieDetails from "./components/MovieDetails";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from "./components/LogIn";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Users from "./components/Users";

import AddUser from "./components/AddUser";

function App() {
  return (
    <div className="font color-body ">
      <BrowserRouter>
        <NavBar />
        <Container className="bg">
          <Routes>
            <Route path="/" exact element={<MoviesList />} />
            <Route path="/LogIn" exact element={<LogIn />} />
            <Route path="/Register" exact element={<Register />} />
            <Route path="/Profile" exact element={<Profile />} />
            <Route path="/Users" exact element={<Users />} />
            <Route path="/AddUser" exact element={<AddUser />} />
            <Route path="/movie/:id" exa element={<MovieDetails />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;
