import React from "react";
import { getUser, getNOKP, getToken, removeUserSession } from "./../Utils/Common";
import Sidebar from "./Sidebar_Admin";
import Navbar from "./../components/Navbars/AdminNavbar";
import Information from "./../components/Cards/CardSettings2";
import { Pane, Heading, Icon, ArrowLeftIcon } from "evergreen-ui";
import Topbaer from "./../Topbar2";

function Profile(props) {

  return (
    <div>
      <Sidebar />
      <div className="relative md:ml-64 bg-blue-400" style={{ height: "100%" }}>
        <Navbar />
        <div className="relative bg-blue-600 md:pt-20 pb-16 ">
        <div className="flex flex-wrap">
            <Pane background="#2c3e50" className="xl:mx-4 xl:rounded-md" width="100%">
              <Topbaer title="Akaun / Kemaskini Akaun"/>
            </Pane>
            <div className="w-full">
              <div className="flex-auto mt-6 px-3">
                <Information
                  nama={sessionStorage.getItem('username')}
                  nokp={sessionStorage.getItem('nokp')}
                  email={sessionStorage.getItem('email')}
                  notel={sessionStorage.getItem('notel') === 'null' ? '-' : sessionStorage.getItem('notel')}
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
