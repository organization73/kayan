import React, { useState, useContext, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../components/SearchContext";
import useScrollToTop from "./useScrollToTop";

const navigation = [
  { name: "الصفحة الرئيسية", href: "/" },
  { name: "المتجر", href: "/shop" },
  { name: "تواصل معنا", href: "/about" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export { navigation, classNames };

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { searchValue, setSearchValue } = useContext(SearchContext);
  const menuRef = useRef(null);

  useScrollToTop();

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchClick = () => {
    if (location.pathname !== "/shop") {
      navigate("/shop");
    }
    setIsMenuOpen(false); // Close menu after search
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchClick();
      setIsMenuOpen(false); // Close menu after search
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const renderNavLink = (item, isMobile = false) => {
    const isActive = location.pathname === item.href;
    return (
      <Link
        key={item.name}
        className={classNames(
          isActive ? "text-black" : "text-gray-400 hover:text-gray-700",
          "rounded-md px-3 py-2 text-sm font-medium"
        )}
        to={item.href}
        onClick={isMobile ? () => setIsMenuOpen(false) : null}
      >
        {item.name}
      </Link>
    );
  };

  const renderSearchInput = () => (
    <div className="relative">
      <label htmlFor="Search" className="sr-only">
        Search
      </label>
      <input
        type="text"
        id="Search"
        value={searchValue}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
        placeholder="البحث"
        className="w-full rounded-md border-gray-200 py-2.5 pe-10 sm:text-sm"
      />
      <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
        <button
          type="button"
          className="text-gray-600 hover:text-gray-700"
          onClick={handleSearchClick}
        >
          <span className="sr-only">Search</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </span>
    </div>
  );

  return (
    <>
      <nav className="relative px-4 flex justify-between items-center">
        <a className="text-lg leading-none" href="/">
          <h3>كيان</h3>
        </a>
        <div className="lg:hidden">
          <button
            className="navbar-burger flex items-center p-3"
            title="hamburger menu"
            onClick={toggleMenu}
          >
            <svg
              className="block h-4 w-4 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Mobile menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <ul className="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto lg:items-center lg:w-auto">
          {navigation.map((item) => (
            <li key={item.href} className="flex space-x-4">
              {renderNavLink(item)}
            </li>
          ))}
        </ul>
        <div className="relative hidden lg:inline-block py-2 px-6 text-sm">
          {renderSearchInput()}
        </div>
      </nav>
      <div
        ref={menuRef}
        className={`navbar-menu relative z-50 ${isMenuOpen ? "" : "hidden"}`}
      >
        <div
          className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"
          onClick={() => setIsMenuOpen(false)}
        />
        <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
          <div className="flex items-center mb-8">
            <button
              className="navbar-close"
              title="close nav"
              onClick={() => setIsMenuOpen(false)}
            >
              <svg
                className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div>{renderSearchInput()}</div>

          <div className="flex flex-col space-y-4">
            {navigation.map((item) => renderNavLink(item, true))}
          </div>
          <div className="mt-auto">
            <ul className="mt-8 flex justify-start gap-6 md:gap-8">
              <li>
                <a
                  href="https://www.facebook.com/"
                  rel="noreferrer"
                  target="_blank"
                  className="text-white transition hover:opacity-75"
                >
                  <span className="sr-only">Facebook</span>
                  <svg
                    className="h-6 w-6"
                    fill="#1877F2"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/"
                  rel="noreferrer"
                  target="_blank"
                  className="text-pink-500 transition hover:text-pink-700"
                >
                  <span className="sr-only">Instagram</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.055 1.97.24 2.422.402a4.88 4.88 0 011.697.957 4.88 4.88 0 01.957 1.696c.163.453.347 1.254.402 2.422.058 1.267.07 1.647.07 4.85 0 3.204-.012 3.584-.07 4.85-.055 1.17-.24 1.97-.402 2.422a4.88 4.88 0 01-.957 1.697 4.88 4.88 0 01-1.696.957c-.453.163-1.254.347-2.422.402-1.267.058-1.647.07-4.85.07-3.204 0-3.584-.012-4.85-.07-1.17-.055-1.97-.24-2.422-.402a4.88 4.88 0 01-1.697-.957 4.88 4.88 0 01-.957-1.696c-.163-.453-.347-1.254-.402-2.422-.058-1.267-.07-1.647-.07-4.85 0-3.204.012-3.584.07-4.85.055-1.17.24-1.97.402-2.422a4.88 4.88 0 01.957-1.697 4.88 4.88 0 011.696-.957c.453-.163 1.254-.347 2.422-.402 1.267-.058 1.647-.07 4.85-.07zM12 0C8.741 0 8.332.014 7.053.073c-1.278.058-2.153.24-2.922.51a6.815 6.815 0 00-2.615 1.701A6.815 6.815 0 00.51 4.899c-.27.769-.452 1.644-.51 2.922C0 8.741 0 9.149 0 12c0 2.851.014 3.259.073 4.537.058 1.278.24 2.153.51 2.922a6.815 6.815 0 001.701 2.615 6.815 6.815 0 002.615 1.701c.769.27 1.644.452 2.922.51C8.741 24 9.149 24 12 24c2.851 0 3.259-.014 4.537-.073 1.278-.058 2.153-.24 2.922-.51a6.815 6.815 0 002.615-1.701 6.815 6.815 0 001.701-2.615c.27-.769.452-1.644.51-2.922.058-1.278.073-1.686.073-4.537 0-2.851-.014-3.259-.073-4.537-.058-1.278-.24-2.153-.51-2.922a6.815 6.815 0 00-1.701-2.615 6.815 6.815 0 00-2.615-1.701c-.769-.27-1.644-.452-2.922-.51C15.259.014 14.851 0 12 0zm0 5.838c-3.396 0-6.162 2.766-6.162 6.162 0 3.396 2.766 6.162 6.162 6.162 3.396 0 6.162-2.766 6.162-6.162 0-3.396-2.766-6.162-6.162-6.162zm0 10.138c-2.191 0-3.976-1.785-3.976-3.976 0-2.191 1.785-3.976 3.976-3.976 2.191 0 3.976 1.785 3.976 3.976 0 2.191-1.785 3.976-3.976 3.976zm6.406-11.845c-.796 0-1.441.645-1.441 1.441 0 .796.645 1.441 1.441 1.441.796 0 1.441-.645 1.441-1.441 0-.796-.645-1.441-1.441-1.441z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/201553029842"
                  rel="noreferrer"
                  target="_blank"
                  className="text-green-500 transition hover:text-green-700"
                >
                  <span className="sr-only">WhatsApp</span>
                  {/* <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M20.52 3.487A10.3 10.3 0 0012.005.254C6.163.254 1.48 4.94 1.48 10.78a10.715 10.715 0 001.454 5.464l-1.505 5.526 5.653-1.482a10.27 10.27 0 005.016 1.37h.004c5.843 0 10.53-4.687 10.53-10.527 0-2.79-1.086-5.417-3.092-7.453zM12.004 21.64c-1.73 0-3.423-.456-4.91-1.316l-3.44.899.912-3.347a9.252 9.252 0 01-1.256-4.696c0-5.09 4.143-9.233 9.235-9.233 2.47 0 4.793.96 6.527 2.7a9.21 9.21 0 012.705 6.53c0 5.09-4.144 9.234-9.235 9.234zm5.314-6.853c-.275-.137-1.627-.805-1.88-.897-.253-.092-.438-.137-.623.138-.184.275-.716.898-.877 1.084-.161.184-.322.207-.597.069-.275-.137-1.156-.425-2.202-1.353-.814-.725-1.367-1.622-1.528-1.896-.161-.275-.017-.424.122-.561.126-.124.276-.322.413-.483.138-.161.184-.23.275-.368.092-.184.046-.345-.023-.483-.069-.138-.623-1.495-.853-2.042-.224-.538-.453-.465-.622-.474-.161-.007-.345-.009-.53-.009s-.483.069-.737.322c-.253.253-.977.952-.977 2.321s1.001 2.688 1.14 2.876c.138.184 1.963 2.997 4.755 4.195.665.288 1.182.46 1.586.588.666.211 1.272.181 1.75.11.534-.081 1.627-.665 1.857-1.31.23-.644.23-1.195.161-1.31-.068-.115-.253-.184-.53-.322z"
                      clipRule="evenodd"
                    />
                  </svg> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 20 20"
                    className="h-6 w-6"
                    fill="currentColor"
                    id="whatsapp"
                  >
                    <path
                      fill="#4CAF50"
                      d="M8.002 0h-.004C3.587 0 0 3.588 0 8a7.94 7.94 0 0 0 1.523 4.689l-.997 2.972 3.075-.983A7.93 7.93 0 0 0 8.002 16C12.413 16 16 12.411 16 8s-3.587-8-7.998-8z"
                    ></path>
                    <path
                      fill="#FAFAFA"
                      d="M12.657 11.297c-.193.545-.959.997-1.57 1.129-.418.089-.964.16-2.802-.602-2.351-.974-3.865-3.363-3.983-3.518-.113-.155-.95-1.265-.95-2.413s.583-1.707.818-1.947c.193-.197.512-.287.818-.287.099 0 .188.005.268.009.235.01.353.024.508.395.193.465.663 1.613.719 1.731.057.118.114.278.034.433-.075.16-.141.231-.259.367-.118.136-.23.24-.348.386-.108.127-.23.263-.094.498.136.23.606.997 1.298 1.613.893.795 1.617 1.049 1.876 1.157.193.08.423.061.564-.089.179-.193.4-.513.625-.828.16-.226.362-.254.574-.174.216.075 1.359.64 1.594.757.235.118.39.174.447.273.056.099.056.564-.137 1.11z"
                    ></path>
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="https://maps.app.goo.gl/Ka9sUQCVTMDLZi2x5"
                  rel="noreferrer"
                  target="_blank"
                  className="text-white transition hover:text-gray-600"
                >
                  <span className="sr-only">Google Maps</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    id="google-maps"
                    className="h-6 w-6"
                    fill="currentColor"
                  >
                    <path
                      fill="#4285f4"
                      d="M25.3959 8.8345l-.0039.0038c.0837.2319.1617.4667.2285.7062C25.5527 9.3047 25.48 9.067 25.3959 8.8345zM16 2.23L8.929 5.1593 12.9916 9.222A4.2486 4.2486 0 0 1 19.0208 15.21L25 9.23l.392-.392A9.9872 9.9872 0 0 0 16 2.23z"
                    ></path>
                    <path
                      fill="#ffba00"
                      d="M16,16.4733A4.25,4.25,0,0,1,12.9916,9.222L8.929,5.1593A9.9683,9.9683,0,0,0,6,12.23c0,4.4057,2.2651,7.1668,4.93,10,.1787.1828.3274.3852.4959.5746l7.5608-7.5609A4.2341,4.2341,0,0,1,16,16.4733Z"
                    ></path>
                    <path
                      fill="#0066da"
                      d="M16,2.23a10,10,0,0,0-10,10,11.0918,11.0918,0,0,0,.5454,3.4546l12.8505-12.85A9.9563,9.9563,0,0,0,16,2.23Z"
                    ></path>
                    <path
                      fill="#00ac47"
                      d="M16.9011,29.12a21.83,21.83,0,0,1,4.032-6.8966C23.7976,19.3129,26,16.636,26,12.23a9.9585,9.9585,0,0,0-.6041-3.3958l-13.97,13.97A18.0436,18.0436,0,0,1,15.0173,29.08.9975.9975,0,0,0,16.9011,29.12Z"
                    ></path>
                    <path
                      fill="#0066da"
                      d="M10.93 22.23c.1787.1828.3274.3852.4959.5746h0C11.257 22.6155 11.1083 22.4131 10.93 22.23zM7.207 7.4637A9.9357 9.9357 0 0 0 6.45 9.2566 9.9429 9.9429 0 0 1 7.207 7.4637zM6.45 9.2566a9.9522 9.9522 0 0 0-.398 1.9513A9.9537 9.9537 0 0 1 6.45 9.2566z"
                      opacity=".5"
                    ></path>
                    <path
                      fill="#fff"
                      d="M15.1957 29.3989c.02.0248.0445.0422.0664.0644C15.24 29.4411 15.2156 29.4236 15.1957 29.3989zM15.7874 29.7429l.04.0066zM13.6216 25.9269c-.0371-.067-.0679-.1382-.1059-.2047C13.5533 25.789 13.5849 25.86 13.6216 25.9269zM15.0173 29.08q-.3069-.9036-.6906-1.7566C14.5793 27.8937 14.8127 28.4771 15.0173 29.08zM15.5269 29.6563c-.0229-.0112-.0463-.0207-.0684-.0338C15.4809 29.6356 15.5036 29.6452 15.5269 29.6563zM19.7117 23.7529c-.249.3474-.4679.7125-.6927 1.0741C19.2431 24.465 19.4633 24.1006 19.7117 23.7529z"
                    ></path>
                    <polygon
                      fill="#fff"
                      points="23.322 19.553 23.322 19.553 23.322 19.553 23.322 19.553"
                    ></polygon>
                    <path
                      fill="#fff"
                      d="M17.0468 28.774h0q.3516-.887.7561-1.7428C17.5316 27.6006 17.2812 28.1826 17.0468 28.774zM18.68 25.3584c-.2879.4957-.55 1.0068-.8 1.5242C18.13 26.3647 18.3931 25.8547 18.68 25.3584z"
                    ></path>
                    <path
                      fill="#ea4435"
                      d="M8.929,5.1593A9.9683,9.9683,0,0,0,6,12.23a11.0918,11.0918,0,0,0,.5454,3.4546L13,9.23Z"
                    ></path>
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="https://www.pinterest.com/"
                  rel="noreferrer"
                  target="_blank"
                  className="text-white transition hover:opacity-75"
                >
                  <span className="sr-only">Pinterest</span>
                  <svg
                    className="h-6 w-6"
                    fill="#E60023"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
}
