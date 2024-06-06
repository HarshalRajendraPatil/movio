import React from "react";
import { mobileNavigation } from "../constants/navigation";
import { NavLink } from "react-router-dom";

const MobileNavigation = () => {
  return (
    <section className="z-30 lg:hidden h-14 bg-black bg-opacity-60 backdrop-blue-2xl fixed bottom-0 w-full">
      <div
        className={`flex items-center justify-between h-full text-neutral-400`}
      >
        {mobileNavigation.map((nav, index) => {
          return (
            <NavLink
              key={nav.label + " mobileNavigation"}
              className={({ isActive }) =>
                `px-3 flex h-full items-center flex-col justify-center ${
                  isActive && "text-white"
                }`
              }
              to={nav.href}
            >
              <div className="text-xl">{nav.icon}</div>
              <p className="text-sm">{nav.label}</p>
            </NavLink>
          );
        })}
      </div>
    </section>
  );
};

export default MobileNavigation;
