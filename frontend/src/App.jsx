import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/navBar/NavBar";
import Home from "./components/home/Home";
import Footer from "./components/footer/Footer";
import About from "./components/About/About";
import SignIn from "./components/signin/signin";
import SignUp from "./components/signup/signup";
import Todo from "./components/todo/todo";
import { authActions } from "./store";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const id = sessionStorage.getItem("isLoggedIn");
    if (id && token) {
      dispatch(authActions.login({token, user: JSON.parse(id)}));
    }
  }, [dispatch]);

  return (
    <div>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/todo" element={isLoggedIn ? <Todo /> : <SignIn />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="*"
            element={
              <div style={{ textAlign: "center", marginTop: "20px" }}>
                <h1>404 - Page Not Found</h1>
              </div>
            }
          />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
