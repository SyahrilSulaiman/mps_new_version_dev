/*eslint-disable*/
import React, {useState} from "react";
import { Link } from "react-router-dom";
import {removeUserSession} from "../Utils/Common";
import UserDropdown from "../components/Dropdowns/UserDropdown.js";
import { Dialog, Heading } from "evergreen-ui";

export default function Sidebar() {

  const [dialog, setDialog] = useState(false);

  const handleLogout = () => {
    removeUserSession();
    window.location.href = "/login";
  }

  const [collapseShow, setCollapseShow] = React.useState("hidden");

  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-no-wrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
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
            to="/admin/usermanagement"
          >
            Portal MyMPS
          </Link>
          {/* User */}
          <ul className="md:hidden items-center flex flex-wrap list-none">
            <li className="inline-block relative">
              <UserDropdown />
            </li>
          </ul>
          {/* Collapse */}
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-gray-300">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link
                    className="md:block text-left md:pb-2 text-gray-700 mr-0 inline-block whitespace-no-wrap text-sm uppercase font-bold p-4 px-0"
                    to="/admin/usermanagement"
                  >
                    Portal MyMPS
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
            /* Form */}
{
            // <form className="mt-6 mb-4 md:hidden">
            //   <div className="mb-3 pt-0">
            //     <input
            //       type="text"
            //       placeholder="Search"
            //       className="px-3 py-2 h-12 border border-solid  border-gray-600 placeholder-gray-400 text-gray-700 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
            //     />
            //   </div>
            // </form>
            }

            {/* Divider */}

            {/* Heading */}
            <h6 className="md:min-w-full text-gray-600 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              Menu Utama
            </h6>
            {/* Navigation */}

            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
     
               {/* <li className="items-center">
                 <Link
                   className={
                     "text-xs uppercase py-3 font-bold block " +
                     (window.location.href.indexOf("/admin/dashboard") !== -1
                       ? "text-blue-500 hover:text-blue-600"
                       : "text-gray-800 hover:text-gray-600")
                   }
                   to="/admin/dashboard"
                 >
                   <i
                     className={
                       "fas fa-tv mr-2 text-sm " +
                       (window.location.href.indexOf("/admin/dashboard") !== -1
                         ? "opacity-75"
                         : "text-gray-400")
                     }
                   ></i>{" "}
                   Utama
                 </Link>
               </li> */}

               {/* <li className="items-center">
                 <Link
                   className={
                     "text-xs uppercase py-3 font-bold block " +
                     (window.location.href.indexOf("/admin/server-side") !== -1
                       ? "text-blue-500 hover:text-blue-600"
                       : "text-gray-800 hover:text-gray-600")
                   }
                   to="/admin/server-side"
                 >
                   <i
                     className={
                       "fas fa-tv mr-2 text-sm " +
                       (window.location.href.indexOf("/admin/server-side") !== -1
                         ? "opacity-75"
                         : "text-gray-400")
                     }
                   ></i>{" "}
                   Server Side
                 </Link>
               </li>

               <li className="items-center">
                 <Link
                   className={
                     "text-xs uppercase py-3 font-bold block " +
                     (window.location.href.indexOf("/admin/client-side") !== -1
                       ? "text-blue-500 hover:text-blue-600"
                       : "text-gray-800 hover:text-gray-600")
                   }
                   to="/admin/client-side"
                 >
                   <i
                     className={
                       "fas fa-tv mr-2 text-sm " +
                       (window.location.href.indexOf("/admin/client-side") !== -1
                         ? "opacity-75"
                         : "text-gray-400")
                     }
                   ></i>{" "}
                   Cient Side
                 </Link>
               </li> */}


              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/admin/setting") !== -1
                      ? "text-blue-500 hover:text-blue-600"
                      : "text-gray-800 hover:text-gray-600")
                  }
                  to="/admin/setting"
                >
                  <i
                    className={
                      "fas fa-tools mr-2 text-sm " +
                      (window.location.href.indexOf("/admin/setting") !== -1
                        ? "opacity-75"
                        : "text-gray-400")
                    }
                  ></i>{" "}
                  Profil
                </Link>
              </li>

              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/admin/usermanagement") !== -1
                      ? "text-blue-500 hover:text-blue-600"
                      : "text-gray-800 hover:text-gray-600")
                  }
                  to="/admin/usermanagement"
                >
                  <i
                    className={
                      "fas fa-users mr-2 text-sm " +
                      (window.location.href.indexOf("/admin/usermanagement") !== -1
                        ? "opacity-75"
                        : "text-gray-400")
                    }
                  ></i>{" "}
                  Pengurusan Pengguna
                </Link>
              </li>

              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/admin/report") !== -1
                      ? "text-blue-500 hover:text-blue-600"
                      : "text-gray-800 hover:text-gray-600")
                  }
                  to="/admin/report"
                >
                  <i
                    className={
                      "fas fa-line-chart mr-2 text-sm " +
                      (window.location.href.indexOf("/admin/report") !== -1
                        ? "opacity-75"
                        : "text-gray-400")
                    }
                  ></i>{" "}
                  Laporan Bayaran Cukai Taksiran
                </Link>
              </li>

 {             
              // <li className="items-center">
              //   <Link
              //     className={
              //       "text-xs uppercase py-3 font-bold block " +
              //       (window.location.href.indexOf("/admin/report") !== -1
              //         ? "text-blue-500 hover:text-blue-600"
              //         : "text-gray-800 hover:text-gray-600")
              //     }
              //     to="/admin/laporan_pengguna"
              //   >
              //     <i
              //       className={
              //         "fas fa-line-chart mr-2 text-sm " +
              //         (window.location.href.indexOf("/admin/report") !== -1
              //           ? "opacity-75"
              //           : "text-gray-400")
              //       }
              //     ></i>{" "}
              //     Laporan Pengguna Berdaftar
              //   </Link>
              // </li>
}

              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block text-gray-800 hover:text-gray-600"
                  }
                  to="#"
                  onClick={() => setDialog(true)}
                >
                  <i
                    className={
                      "fas fa-sign-out-alt mr-2 text-sm text-gray-400"
                    }
                  ></i>{" "}
                  Log Keluar
                </Link>
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
          <Heading size={200}>Anda pasti untuk log keluar?</Heading>
        </Dialog>
      </nav>
    </>
  );
}
