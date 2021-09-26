import React,{ useContext } from "react";
import { ContextHandler } from "../../contexts/ContextHandler";
import { TRANSLATION } from "../../Translation";
import { getUser, getNOKP, getToken, removeUserSession } from "../../Utils/Common";
import UserDropdown from "../Dropdowns/UserDropdown.js";

export default function Navbar() {
  const { language } = useContext(ContextHandler)
  return (
    <>
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full z-10 xl:bg-gray-700 lg:bg-gray-700 md:bg-gray-700 xs:bg-transparent md:flex-row md:flex-no-wrap md:justify-start flex items-center p-6">
        <div className="w-full mx-autp items-center flex justify-between md:flex-no-wrap flex-wrap md:px-10 px-4">
          {/* Brand */}
          <div
            className="text-white text-sm uppercase hidden lg:inline-block font-semibold"
          >
            {TRANSLATION[language].CONSTANT.WELCOME} {getUser()}
          </div>
        </div>
      </nav>
      {/* End Navbar */}
    </>
  );
}
