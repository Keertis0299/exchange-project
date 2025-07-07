import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="p-3 w-full bg-gray-800/10 backdrop-blur-2xl">
      <div className="flex flex-row justify-between">
        {/* Logo */}
        <Link to={"/"} className="flex space-x-2 items-center">
          <p className="rounded-[100%] px-1.5 py-0.5 bg-red-500 text-white font-bold text-lg">
            Ex
          </p>
          <p className="text-white font-bold text-xl">Exchange</p>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center">
          <ul className="flex space-x-2 items-center">
            <li>
              <NavLink
                to={"/spot"}
                className={({ isActive }) =>
                  isActive
                    ? "bg-red-500 text-white rounded-lg py-1"
                    : "text-white py-1"
                }
              >
                <span className="text-white text-sm font-semibold p-2 ">
                  Spot
                </span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to={"/futures"}
                className={({ isActive }) =>
                  isActive
                    ? "bg-red-500 text-white rounded-lg py-1"
                    : "text-white py-1"
                }
              >
                <span className="text-white text-sm font-semibold p-2 ">
                  Futures
                </span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to={"/lend"}
                className={({ isActive }) =>
                  isActive
                    ? "bg-red-500 text-white rounded-lg py-1"
                    : "text-white py-1"
                }
              >
                <span className="text-white text-sm font-semibold p-2 ">
                  Lend
                </span>
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Search */}

        {/* Authentication */}
        <div className="flex space-x-2 font-semibold text-sm items-center">
          <button className="text-green-600 bg-green-200/20 px-1 py-0.5 rounded-lg">
            Sign up
          </button>
          <button className="text-blue-500 bg-blue-200/20 px-1 py-0.5 rounded-lg">
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}
