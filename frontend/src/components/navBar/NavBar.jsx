import React from "react";
import { MdChecklist } from "react-icons/md";
import { Link } from "react-router-dom";
import "./NavBar.css";
import {useSelector} from "react-redux"
import { authActions } from "../../store";
import { useDispatch} from "react-redux";


const NavBar = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();
  const logout = () => {
    sessionStorage.clear("id")
    dispatch(authActions.logout())
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <MdChecklist className="me-2" /> BrainBox
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item mx-2">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item mx-2">
                <Link className="nav-link active" to="/about">
                  About
                </Link>
              </li>
              <li>
              <Link className="nav-link active" aria-current="page" to="/todo">
                  Plan
                </Link>
              </li>
            </ul>
            <div className="d-flex ms-auto">
            {!isLoggedIn && <>
              <Link className="nav-link active" to="/signin">
                  SignIn
            </Link>
            <Link className="nav-link active" to="/signup">
                  SignUp
            </Link>
              </>}

            {isLoggedIn && <>
              <Link className="nav-link active" to="#" onClick={logout}>
                  Logout
            </Link>

            </>}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
