import { NavLink } from "react-router-dom";
import { AuthContext, type IAuthContext } from "../App";
import { useContext } from "react";

function Navbar() {
  const { isAuth, roleState } = useContext<IAuthContext>(AuthContext);


  const logoutHandler = () => {
    localStorage.removeItem("accessToken");
    window.location.reload();
  };

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2 rounded-lg font-medium transition ${
      isActive
        ? "bg-orange-600 text-white"
        : "text-gray-700 hover:bg-orange-100"
    }`;

  return (
    <header className="bg-white shadow-md">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex space-x-4">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/about" className={linkClass}>
            About Us
          </NavLink>
        </div>

        <div className="flex space-x-4">
          {isAuth ? (
            <>
              <NavLink to="/profile" className={linkClass}>
                Profile
              </NavLink>
              <NavLink to="/questionset/list" className={linkClass}>
                QuestionSet
              </NavLink>

              {roleState === "admin" && (
                <NavLink to="/admin/questionset/create" className={linkClass}>
                  Create Question Set
                </NavLink>
              )}

              <button
                onClick={logoutHandler}
                className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/register" className={linkClass}>
                Register
              </NavLink>
              <NavLink to="/login" className={linkClass}>
                Login
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
