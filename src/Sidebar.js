/*eslint-disable*/
import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { removeUserSession } from "./Utils/Common";
import {ContextHandler} from "./contexts/ContextHandler"
import { TRANSLATION } from "./Translation";
import { Dialog, Heading, Button } from "evergreen-ui";

export default function Sidebar() {
  const {handleLanguage, language} = useContext(ContextHandler);
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  const [dialog, setDialog] = useState(false);
  const history = useHistory()

  const handleLogout = () => {
    removeUserSession();
    history.push("/login")
    // window.location.href = "/login";
  }

  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-no-wrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-1 px-4">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-no-wrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <i className="fas fa-bars"></i>
          </button>
          {/* Brand */}
          <Link
            className="md:block text-left md:pb-2 text-gray-700 mr-0 inline-block whitespace-no-wrap text-sm uppercase font-bold p-4 px-0"
            to="/bill"
          >
            {TRANSLATION[language].HOME.TITLE}
          </Link>
          {/* User */}
          
            <ul className="md:hidden items-center flex flex-wrap list-none">
            </ul>
        
          {/* Collapse */}
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-gray-300">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link
                    className="md:block text-left md:pb-2 text-gray-700 mr-0 inline-block whitespace-no-wrap text-sm uppercase font-bold p-4 px-0"
                    to="/bill"
                  >
                    {TRANSLATION[language].HOME.TITLE}
                  </Link>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>
            {/* Heading */}
            <h6 className="md:min-w-full text-gray-600 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              <Button marginRight={2} appearance={language === 'BM' ? "primary" : 'default'} onClick={() => handleLanguage('BM')}>BM</Button>
              <Button marginRight={2} appearance={language === 'EN' ? "primary" : 'default'} onClick={() => handleLanguage('EN')}>EN</Button>
            </h6>
            <h6 className="md:min-w-full text-gray-600 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
            {TRANSLATION[language].NAVIGATION.MENU}
            </h6>
            {/* Navigation */}
            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/setting") !== -1
                      ? "text-blue-500 hover:text-blue-600"
                      : "text-gray-800 hover:text-gray-600")
                  }
                  to="/setting"
                >
                  <i
                    className={
                      "fas fa-tools mr-2 text-sm " +
                      (window.location.href.indexOf("/setting") !== -1
                        ? "opacity-75"
                        : "text-gray-400")
                    }
                  ></i>{" "}
                  {TRANSLATION[language].NAVIGATION.PROFILE}
                </Link>
              </li>

              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/bill") !== -1
                      ? "text-blue-500 hover:text-blue-600"
                      : "text-gray-800 hover:text-gray-600")
                  }
                  to="/bill"
                >
                  <i
                    className={
                      "fas fa-list mr-2 text-sm " +
                      (window.location.href.indexOf("/bill") !== -1
                        ? "opacity-75"
                        : "text-gray-400")
                    }
                  ></i>{" "}
                  {TRANSLATION[language].NAVIGATION.BILL}
                </Link>
              </li>

              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/laporan-transaksi") !== -1
                      ? "text-blue-500 hover:text-blue-600"
                      : "text-gray-800 hover:text-gray-600")
                  }
                  to="/laporan-transaksi"
                >
                  <i
                    className={
                      "fas fa-file mr-2 text-sm " +
                      (window.location.href.indexOf("/laporan-transaksi") !== -1
                        ? "opacity-75"
                        : "text-gray-400")
                    }
                  ></i>{" "}
                  {TRANSLATION[language].NAVIGATION.TRANSACTION}
                </Link>
              </li>
              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/laporan-penyata-akaun") !== -1
                      ? "text-blue-500 hover:text-blue-600"
                      : "text-gray-800 hover:text-gray-600")
                  }
                  to="/laporan-penyata-akaun"
                >
                  <i
                    className={
                      "fas fa-file mr-2 text-sm " +
                      (window.location.href.indexOf("/laporan-penyata-akaun") !== -1
                        ? "opacity-75"
                        : "text-gray-400")
                    }
                  ></i>{" "}
                  {TRANSLATION[language].NAVIGATION.STATEMENT}
                </Link>
              </li>

              <li className="items-center">
                <div
                  className={
                    "text-xs uppercase py-3 font-bold block text-gray-800 hover:text-gray-600"
                  }
                  onClick={() => setDialog(true)}
                >
                  <i className="fas fa-sign-out-alt mr-2 text-sm text-gray-400"></i>{" "}
                  {TRANSLATION[language].CONSTANT.LOGOUT}
                </div>
              </li>

            </ul>
          </div>
        </div>
        <Dialog
          isShown={dialog}
          title="Notifikasi Log Keluar"
          onConfirm={() => handleLogout()}
          onCancel={() => setDialog(false)}
          cancelLabel="Tidak"
          intent="danger"
          confirmLabel="Ya"
          intent="success"
          shouldCloseOnOverlayClick={false}
        >
          <Heading size={200}>{TRANSLATION[language].MESSAGE.logoutMessage}</Heading>
        </Dialog>
      </nav>
    </>
  );
}
