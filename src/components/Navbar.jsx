import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  return (
    <>
      <div className=" nav">
        <div className="box">
          <Link to="/">Home</Link>
        </div>
        <div className="box">
          <Link to="/create">Create</Link>
        </div>
        <div className="box">
          <Link to="/barracks">Barracks</Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
