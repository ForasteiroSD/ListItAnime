import React from "react";
import "./NavBar.css";
import { useLocation } from "react-router-dom";
import NavItem from "./NavItem";

function NavBar() {
  let { pathname } = useLocation();
  const NavBarData = [
    {
      title: "Animes",
      path: "/",
    },
    {
      title: "Top Animes",
      path: "/topanimes",
    },
    {
      title: "List It",
      path: "/listit",
    },
    {
      title: "To Watch",
      path: "/towatch",
    },
    {
      title: "Watched",
      path: "/watched",
    },
  ];
  return (
    <nav className="menu">
      <ul>
        {NavBarData.map((item) => {
          return (
            <NavItem {...item} key={item.path} isSelected={item.path === pathname}/>
          );
        })}
      </ul>
    </nav>
  );
}

export default NavBar;
