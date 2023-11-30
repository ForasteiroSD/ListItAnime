import React from "react";
import "./NavBar.css";
import { useLocation } from "react-router-dom";
import NavItem from "./NavItem";
import SmallLogo from "./SmallLogo";

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
      title: "To Watch",
      path: "/towatch",
    },
    {
      title: "Watched",
      path: "/watched",
    },
    {
      title: "About",
      path: "/about",
    },
  ];
  return (
    <div className="NavBar">
      <SmallLogo />
      <nav className="menu">
        <ul>
          {NavBarData.map((item) => {
            return (
              <NavItem
                {...item}
                key={item.path}
                isSelected={item.path === pathname}
              />
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
