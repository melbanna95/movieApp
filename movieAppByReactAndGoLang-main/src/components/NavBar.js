import React, { useEffect, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import logo from "../images/logo.png";

import { useDispatch } from "react-redux";
import { getAllMovie, getMovieSearch } from "../redux/actions/movieAction";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [users, setUsers] = useState([]);
  const [loged, setLoged] = useState(false);

  const route = useNavigate();
  const onSearch = (word) => {
    search(word);
  };
  const dispatch = useDispatch();
  //to search in api
  const search = async (word) => {
    if (word === "") {
      dispatch(getAllMovie());
    } else {
      dispatch(getMovieSearch(word));
    }
  };

  useEffect(() => {
    setUsers(JSON.parse(localStorage.getItem("loginUser")));

    const user = JSON.parse(localStorage.getItem("loginUser"));

    console.log(user);
    if (user) {
     
      setLoged(true);
     
      user.map((user) => {
        if (user.Role.Description === "Admin") {
          setIsAdmin(true);
        }
        return false
      });
    }

    route("/");
  },[localStorage.getItem("loginUser")]);

  const LogOut = () => {
    localStorage.removeItem("loginUser");
    localStorage.removeItem("token");
    setLoged(false);
  };
  return (
    <div className="nav-style w-100">
      <Container>
        <Row className="pt-2 ">
          <Col xs="2" lg="1">
            <a href="/">
              <img className="logo" src={logo} alt="dfs" />
            </a>
          </Col>
          <Col xs="8" lg="8" className="links-container">
            <button onClick={() => route("/")}>الرئيسة</button>
            {loged && (
              <button onClick={() => route("Profile")}>
                اسم المستخدم : {users.map((user) => user.UserName)}
              </button>
            )}
            {isAdmin ? (
              <button onClick={() => route("Users")}>قائمة المستخدمين</button>
            ) : (
              ""
            )}
            {loged && (
              <button
                onClick={(e) => {
                  LogOut();
                  route("/");
                  setIsAdmin(false);
                  setUsers([]);
                  setLoged(false);
                }}
              >
                Log out
              </button>
            )}
            {!loged && (
              <button onClick={() => route("LogIn")}>تسجيل الدخول</button>
            )}{" "}
            {!loged && (
              <button onClick={() => route("register")}>إنشاء حساب</button>
            )}
          </Col>
          <Col xs="2" lg="3" className=" d-flex align-items-center">
            <div className="search  w-100">
              <i className="fa fa-search"></i>
              <input
                onChange={(e) => onSearch(e.target.value)}
                type="text"
                className="form-control"
                placeholder="ابحث"
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default NavBar;
