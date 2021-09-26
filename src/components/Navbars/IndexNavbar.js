/*eslint-disable*/
import React,{ useContext } from "react";
import { Link } from "react-router-dom";
import { TRANSLATION } from "../../Translation.js";
import { ContextHandler } from "../../contexts/ContextHandler.js";
import { Button } from "evergreen-ui";

export default function Navbar(props) {
  const {language, handleLanguage} = useContext(ContextHandler)
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <>
      <nav className="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-white shadow">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">

          <div className=" static block justify-start">
            <Link
              to="/"
              className="text-gray-800 text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase"
            >
              {TRANSLATION[language].HOME.TITLE}
            </Link>
          </div>
          <div>
              <Button marginRight={2} appearance={language === 'BM' ? "primary" : 'default'} onClick={() => handleLanguage('BM')}>BM</Button>
              <Button marginRight={2} appearance={language === 'EN' ? "primary" : 'default'} onClick={() => handleLanguage('EN')}>EN</Button>
          </div>
        </div>
        
      </nav>
    </>
  );
}
