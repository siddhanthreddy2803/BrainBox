import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container d-flex justify-content-center py-3">
        <p className="mb-0">ToDo @SiddhanthReddy</p>
      </div>
      <div
        className="text-center text-white p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        © 2024 Copyright: The Boys
      </div>
    </footer>
  );
};

export default Footer;
