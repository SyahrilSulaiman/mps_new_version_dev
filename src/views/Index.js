/*eslint-disable*/
import React,{ useContext} from "react";
import IndexNavbar from "../components/Navbars/IndexNavbar.js";
import Footer from "../components/Footers/Footer.js";
import { TRANSLATION } from "../Translation.js";
import { ContextHandler } from "../contexts/ContextHandler.js";
export default function Index() {
  const {language} = useContext(ContextHandler)
  return (
    <>
      <IndexNavbar fixed />
      <section className="header relative pt-16 items-center flex h-screen max-h-860-px">
        <div className="container mx-auto items-center flex flex-wrap">
          <div className="w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-4">
          <img 
            // src={logo1}
            src={process.env.PUBLIC_URL + "/assets/img/logo1.png"}
            className="pl-32 w-auto" 
            style={{ height: "120px", marginBottom:"20px" }}></img>
            <div className="pt-8 sm:pt-0">
              <h2 className="font-semibold text-4xl text-gray-700">
                {TRANSLATION[language].HOME.WELCOME}
              </h2>
              <p className="mt-1 text-lg leading-relaxed text-gray-600">
              {TRANSLATION[language].HOME.SUBTITLE}<br></br><span className="text-bold text-gray-700">{TRANSLATION[language].HOME.COMPANY}</span>
              </p>
              <div className="mt-12">
                <a
                  href="/register"
                  className="get-started text-white font-bold px-3 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-blue-500 active:bg-blue-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
                >
                  {TRANSLATION[language].REGISTER.REGISTER_BUTTON}
                </a>
                <a
                  href="/login"
                  className="github-star ml-1 text-white font-bold px-3 py-4 rounded outline-none focus:outline-none mb-1 bg-gray-800 active:bg-gray-700 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
                >
                  {TRANSLATION[language].CONSTANT.LOGIN}
                </a>
              </div>
            </div>
          </div>
        </div>

        <img
          className="absolute top-0 b-auto right-0 pt-16 sm:w-6/12 -mt-48 sm:mt-0 w-10/12 max-h-860px"
          src={process.env.PUBLIC_URL + "/assets/img/pattern_react.png"}
        />
      </section>

      <section className="mt-48 md:mt-40 pb-40 relative bg-gray-200">
        <div
          className="-mt-20 top-0 bottom-auto left-0 right-0 w-full absolute h-20"
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
              className="text-gray-200 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="w-10/12 md:w-6/12 lg:w-4/12 px-12 md:px-4 mr-auto ml-auto -mt-32">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-blue-600">
                <img
                  alt="..."
                  // src={Image}
                  src={process.env.PUBLIC_URL + "/assets/img/photo-1498050108023-c5249f4df085.jfif"}
                  className="w-full align-middle rounded-t-lg"
                />
                <blockquote className="relative p-8">
                  
                  <h4 className="text-xl font-bold text-white">
                  {TRANSLATION[language].HOME.DETAIL_IMAGE.TITLE}
                  </h4>
                  <p className="text-md font-light mt-2 text-white">
                  {TRANSLATION[language].HOME.DETAIL_IMAGE.SUBTITLE}
                  </p>
                </blockquote>
              </div>
            </div>

            <div className="w-full md:w-6/12 px-4">
              <div className="flex flex-wrap">
                <div className="w-full md:w-6/12 px-4">
                  <div className="relative flex flex-col mt-4">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-gray-600 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                        <i className="fas fa-sitemap"></i>
                      </div>
                      <h6 className="text-xl mb-1 font-semibold">
                      {TRANSLATION[language].HOME.DETAIL_1.TITLE}
                      </h6>
                      <p className="mb-4 text-gray-600">
                      {TRANSLATION[language].HOME.DETAIL_1.SUBTITLE}
                      </p>
                    </div>
                  </div>
                  <div className="relative flex flex-col min-w-0">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-gray-600 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                        <i className="fas fa-drafting-compass"></i>
                      </div>
                      <h6 className="text-xl mb-1 font-semibold">
                      {TRANSLATION[language].HOME.DETAIL_2.TITLE}
                      </h6>
                      <p className="mb-4 text-gray-600">
                      {TRANSLATION[language].HOME.DETAIL_2.SUBTITLE}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-6/12 px-4">
                  <div className="relative flex flex-col min-w-0 mt-4">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-gray-600 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                        <i className="fas fa-newspaper"></i>
                      </div>
                      <h6 className="text-xl mb-1 font-semibold">
                        {TRANSLATION[language].HOME.DETAIL_3.TITLE}
                      </h6>
                      <p className="mb-4 text-gray-600">
                        {TRANSLATION[language].HOME.DETAIL_3.SUBTITLE}
                      </p>
                    </div>
                  </div>
                  <div className="relative flex flex-col min-w-0">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-gray-600 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                        <i className="fas fa-file-alt"></i>
                      </div>
                      <h6 className="text-xl mb-1 font-semibold">
                        {TRANSLATION[language].HOME.DETAIL_4.TITLE}
                      </h6>
                      <p className="mb-4 text-gray-600">
                        {TRANSLATION[language].HOME.DETAIL_4.SUBTITLE}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="block relative z-1 bg-gray-700">
        <div className="container mx-auto">
          <div className="justify-center flex flex-wrap">
            <div className="w-full lg:w-12/12 px-4  -mt-24">
              <div className="flex flex-wrap">
                
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
