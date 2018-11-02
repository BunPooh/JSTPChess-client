import "./Navbar.css";

import * as React from "react";
import { Link } from "react-router-dom";

import { LocaleDropdown } from "../LocaleDropdown";

export const Navbar = () => {
  return (
    <nav className="navbar App-navbar">
      <div className="navbar-brand App-navbar-brand">
        <Link className="App-navbar-link" to="/">
          Chess.Js
        </Link>
      </div>
      <div>
        <LocaleDropdown
          className="m-2 App-navbar-dropdown"
          menuClassName="App-locales-menu"
        />
      </div>
    </nav>
  );
};
