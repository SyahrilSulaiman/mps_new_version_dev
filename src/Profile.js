import React from "react";
import { getUser, getNOKP, getToken, removeUserSession } from "./Utils/Common";
import Sidebar from "./Sidebar";
import Navbar from "./components/Navbars/AdminNavbar";
import Information from "./components/Cards/CardSettings";
import { Pane, Heading, Icon, ArrowLeftIcon } from "evergreen-ui";
import Topbar from "./Topbar2";

function Profile(props) {

  return (
    <div>
      <Sidebar />
      <div className="relative md:ml-64 bg-gray-400" style={{ height: "100vh", background: "rgb(34,81,122)", background: "linear-gradient(90deg, rgba(34,81,122,1) 0%, rgba(27,147,171,1) 100%)" }}>
        <Navbar />
        <div className="w-full xl:pt-24 lg:pt-24 md:pt-16 sm:pt-16 xs:pt-16" style={{ background: "rgb(34,81,122)", background: "linear-gradient(90deg, rgba(34,81,122,1) 0%, rgba(27,147,171,1) 100%)"}}>
          <div className="flex flex-wrap">
            <Pane background="#2c3e50" className="xl:mx-4 xl:rounded-md" width="100%">
              <Topbar title="Akaun / Kemaskini Akaun"/>
            </Pane>
            <div className="w-full">
              <div className="flex-auto mt-6 px-3">
                <Information
                  nama={sessionStorage.getItem('username')}
                  nokp={sessionStorage.getItem('nokp')}
                  email={sessionStorage.getItem('email')}
                  notel={sessionStorage.getItem('notel')}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
