import React, { useEffect, useState } from "react";
import Logo from "../assets/logo.png";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import UserIcon from "../assets/user.png";
import { IoSearchSharp } from "react-icons/io5";
import { navigation } from "../constants/navigation";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchInput, setSearchInput] = useState(
    location?.search?.slice(3)?.split("%20")?.join(" ")
  );

  useEffect(() => {
    if (searchInput) navigate(`/search?q=${searchInput}`);
  }, [searchInput]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <header className="fixed top-0 w-full h-16 bg-black bg-opacity-50 z-20">
      <div className="container mx-auto px-3 flex items-center h-full">
        <Link to={"/"}>
          <img src={Logo} alt="logo" width={120} />
        </Link>

        <nav className="hidden lg:flex items-center gap-1 ml-5">
          {navigation.map((nav, index) => {
            return (
              <div key={index}>
                <NavLink
                  key={index}
                  to={nav.href}
                  className={({ isActive }) =>
                    `px-2 hover:text-neutral-100 ${
                      isActive && "text-neutral-100"
                    }`
                  }
                >
                  {nav.label}
                </NavLink>
              </div>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-4">
          <form
            action=""
            className="flex items-center gap-2"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent px-4 py-1 outline-none border-none hidden lg:block"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button className="text-2xl text-white">
              <IoSearchSharp />
            </button>
          </form>
          <div className="w-8 h-8 rounded-full overflow-hidden cursor-pointer active:scale-50 transition-all">
            <img src={UserIcon} alt="user icon" className="w-full h-full" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
