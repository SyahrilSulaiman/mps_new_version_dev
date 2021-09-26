import React,{ useContext } from "react";
import www_icon from '../../assets/img/www-icon.png'
import { ContextHandler } from "../../contexts/ContextHandler";
import { TRANSLATION } from "../../Translation";

export default function Footer(){
  const {language} = useContext(ContextHandler)
  return (
    <>
      <footer className="relative bg-gray-300 pt-8 pb-6">
        <div
          className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden "
          style={{ transform: "translateZ(0)" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-gray-300 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap text-center lg:text-left">
            <div className="w-full lg:w-6/12 px-4">
              <h4 className="text-3xl font-semibold">{TRANSLATION[language].HOME.TITLE}</h4>
              <h5 className="text-lg mt-0 mb-2 text-gray-700">
                {TRANSLATION[language].HOME.FOOTER.SUBTITLE}
              </h5>
              <div className="mt-6 lg:mb-0 mb-6">
                <button
                  className="bg-white text-blue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                  type="button"
                  onClick={() => window.location.href = "https://mps.gov.my"}
                >
                  <img className="inline h-5" src={www_icon} alt="world wide web icon"/>
                </button>
                <button
                  className="bg-white text-blue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                  type="button"
                  onClick={() => window.location.href = "https://www.facebook.com/mpselayang"}
                >
                  <i className="fab fa-facebook-square"></i>
                </button>
                <button
                  className="bg-white text-blue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                  type="button"
                  onClick={ () => window.location.href = "https://twitter.com/mpselayang"}
                >
                  <i className="fab fa-twitter"></i>
                </button>
                <button
                  className="bg-white text-blue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                  type="button"
                  onClick={ () => window.location.href = "https://instagram.com/mpselayang"}
                >
                  <i className="fab fa-instagram"></i>
                </button>
              </div>
            </div>

            <div className="w-full lg:w-6/12 px-4">
              <div className="flex flex-wrap items-top mb-6">
                <div className="w-full lg:w-4/12 px-4 ml-auto">
                  <span className="block uppercase text-gray-600 text-sm font-semibold mb-2">
                  {TRANSLATION[language].HOME.FOOTER.DETAILS.TITLE}
                  </span>
                  <ul className="list-unstyled">
                    <li>
                      <a href="#" className="text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm" >
                      {TRANSLATION[language].HOME.FOOTER.DETAILS.ITEM_1}
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm" >
                      {TRANSLATION[language].HOME.FOOTER.DETAILS.ITEM_2}
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm" >
                      {TRANSLATION[language].HOME.FOOTER.DETAILS.ITEM_3}
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm" >
                      {TRANSLATION[language].HOME.FOOTER.DETAILS.ITEM_4}
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm" >
                      {TRANSLATION[language].HOME.FOOTER.DETAILS.ITEM_5}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
          <hr className="my-6 border-gray-400" />
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full px-4 mx-auto text-center">
              <div className="text-sm text-gray-600 font-semibold pt-1">
              {TRANSLATION[language].HOME.FOOTER.COPYRIGHT}{new Date().getFullYear()} {TRANSLATION[language].HOME.COMPANY}
              </div>
              <div className="text-sm text-gray-600 font-semibold">
                
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
