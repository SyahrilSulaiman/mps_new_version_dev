import React, { useState, useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import PrivateRoute from "./Utils/PrivateRoute";
import PublicRoute from "./Utils/PublicRoute";
import GoogleRoute from "./Utils/GoogleRoute";
import {
  getToken,
  getNOKP,
  getUser,
  getEmail,
  removeUserSession,
  setUserSession,
} from "./Utils/Common";
import swal from "sweetalert";
import axios from "axios";

import Login from "./Login";
import Dashboard from "./Dashboard";
import Setting from "./Profile";
import Bill from "./BayarBill";
import Home from "./Home";
import Register from "./Register";
import ForgotPassword from "./ForgotPassword";
import GoogleLogin from "./GoogleLogin";
import NotFound from "./NotFound";
import SenaraiBil from "./SenaraiBil";
import BeforeBayar from "./BeforeBayar";
import DetailAccountPayment from "./DetailAccountPayment";
import Payment from "./Payment";
import MultiAccount from "./MultiAccountPayment";
import Add from "./Add";
import UserReport from "./UserReport";
import ReceiptReport from "./ReceiptReport";
import ReceiptReportAccount from "./ReceiptReportAccount";
import TransactionReport from "./LaporanTransaksi";

import cukaitaksiran from "./ListCukaiTaksiran";
import kompaun from "./ListKompaun";

// lesen
import Lesen from "./pages/lesen/Lesen"
import JenisLesen from "./pages/lesen/LesenType";
import LesenMenu from "./pages/lesen/LesenMenu"

// permit
import Permit from "./pages/permit/Permit"
import JenisPermit from "./pages/permit/PermitType"
import PermitMenu from "./pages/permit/PermitMenu"

// Test Permit
import TestPermitType from "./pages/test_permit/TestPermitType"

// cukai
import Cukai from "./pages/cukai/Cukai"
import CukaiMenu from "./pages/cukai/CukaiMenu"

// page payment
import MultiplePayment from "./pages/payment/MultiplePayment"
import SinglePayment from "./pages/payment/SinglePayment"

// carian
import Carian from "./pages/carian/Carian"

import Admin_Dashboard from "./admin/Dashboard_Admin";
import Admin_Setting from "./admin/Setting_Admin";
import Admin_UserManagement from "./admin/UserManagement_Admin";
import Admin_Report from "./admin/Report_Admin";
import Admin_UserStatus from "./admin/Report_UserStatus";
import UserDetail from "./admin/UpdateUser_Admin";
import AddUser from "./admin/AddUser_Admin";

import ServerSideDataTable from "./admin/Server_Side/DataTable.js";
// import ClientSideDataTable from "./admin/Client_Side/DataTable.js";
// import CollapsibleDataTable from "./admin/Collapsible_DataTable/Collapsible_DataTable.js";

import { useLoading, Audio } from "@agney/react-loading";

import SelectedBillContextProvider from './contexts/SelectedBillContext';
import ContextHandlerProvider from './contexts/ContextHandler';
import { SERVER_URL } from './Constants';
import TestPermitMenu from "./pages/test_permit/TestPermitMenu";

//import "./main.css";

function App() {

  const [authLoading, setAuthLoading] = useState(true);
  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <Audio width="50" />,
  });
  const [dataset, setDataSet] = useState({
    data: [],
  });
  const [loading, setLoading] = useState(false);
  const [isNoData, setIsNoData] = useState(false);

  useEffect(() => {
    if (getEmail() && getEmail()) {
      var formdata = new FormData();
      formdata.append("nokp", getNOKP());
      formdata.append("email", getEmail());

      var requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      var urlAPI = SERVER_URL+"int/api_generator.php?api_name=check_session";

      fetch(urlAPI, requestOptions)
        .then((response) => response.json())
        .then((result) => {

          setUserSession(
            btoa(result.data[0]),
            result.data[0]["U_USERNAME"],
            result.data[0]["U_USERIC"],
            result.data[0]["U_USEREMAIL"]
          );
          sessionStorage.setItem("role", result.data[0]["U_USERROLE"]);
          sessionStorage.setItem("notel", result.data[0]["U_USERPHONE"]);

          if (result.data[0]["U_USERROLE"] == "Admin") {
            //window.location.href = "/admin/dashboard";
          }
          setAuthLoading(false);
          // window.location.href="/home";
        })
        .catch((error) => {
          console.log(error);
          removeUserSession();
          setAuthLoading(false);
        });
    }
  }, []);

  if (authLoading && getToken()) {
    return (
      <div></div>
    );
  }

  if (sessionStorage.getItem("role") == "Admin") {
    return (
      
      <div className="App">
        <Router>
          <div>
            <div className="content">
              <Switch>
                <Route exact path="/" component={Home} />
                <PublicRoute path="/login" component={Login} />
                <PublicRoute path="/register" component={Register} />
                <PublicRoute
                  path="/forgotpassword"
                  component={ForgotPassword}
                />
                {/* <PrivateRoute
                  path="/admin/dashboard"
                  component={Admin_Dashboard}
                /> */}
                <PrivateRoute
                  path="/admin/setting"
                  component={Admin_Setting}
                />
                <PrivateRoute
                  path="/admin/usermanagement"
                  component={ServerSideDataTable}
                />

                 {/* <PrivateRoute
                  path="/admin/usermanagement"
                  component={Admin_UserManagement}
                /> */}

                {/* <PrivateRoute
                  path="/admin/server-side"
                  component={ServerSideDataTable}
                /> */}

                {/* <PrivateRoute
                  path="/admin/client-side"
                  component={ClientSideDataTable}
                />  */}
                
                
                {/* <PrivateRoute
                  path="/admin/collapsible-datatable"
                  component={CollapsibleDataTable}
                />  */}
                
                
                
                <PrivateRoute
                  path="/admin/report"
                  component={Admin_Report}
                />
                <PrivateRoute
                  path="/admin/laporan_pengguna"
                  component={Admin_UserStatus}
                />
                <PrivateRoute
                  path="/admin/update_user"
                  component={UserDetail}
                />
                <PrivateRoute
                  path="/admin/add_user"
                  component={AddUser}
                />
                <Route path="*" component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </div>
    );
  } else if (sessionStorage.getItem("role") == "User") {
    return (
      <div className="App">
        <Router>
          <div>
            <div className="content">
              <SelectedBillContextProvider>
              <ContextHandlerProvider>
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <PublicRoute path="/login" component={Login} />
                    <PublicRoute path="/register" component={Register} />
                    <GoogleRoute path="/verifyuser" component={GoogleLogin} />
                    <PublicRoute
                      path="/forgotpassword"
                      component={ForgotPassword}
                    />
                    <PrivateRoute path="/setting" component={Setting} />
                    
                    <PrivateRoute path="/bill" component={Bill} />
                    <PrivateRoute path="/cukaitaksiran" component={cukaitaksiran} data="dataa" />
                    <PrivateRoute path="/kompaun" component={kompaun} />
                    
                    <PrivateRoute path="/lesen" component={Lesen} />
                    <PrivateRoute path="/jenislesen" component={JenisLesen} />
                    <PrivateRoute path="/menulesen" component={LesenMenu} />

                    <PrivateRoute path="/cukai" component={Cukai} />
                    <PrivateRoute path="/menucukai" component={CukaiMenu} />

                    <PrivateRoute path="/permit" component={Permit} />
                    <PrivateRoute path="/jenispermit" component={JenisPermit} />
                    <PrivateRoute path="/menupermit" component={PermitMenu} />
                    
                    <PrivateRoute path="/test_permit"  component={TestPermitType} />
                    <PrivateRoute path="/testpermitmenu" component={TestPermitMenu} />

                    <PrivateRoute path="/paymentV2" component={SinglePayment} />
                    <PrivateRoute path="/multiplepayment" component={MultiplePayment} />

                    <PrivateRoute path="/carian" component={Carian} />

                    <PrivateRoute path="/bill_cukai_taksiran" component={SenaraiBil} />
                    <PrivateRoute path="/payment" component={Payment} />
                    <PrivateRoute path="/multiaccount-payment" component={MultiAccount} />
                    <PrivateRoute path="/laporan-penyata-akaun" component={UserReport} />
                    <PrivateRoute path="/resit-bayaran" component={ReceiptReport} />
                    <PrivateRoute path="/bayaran-akaun" component={ReceiptReportAccount} />
                    <PrivateRoute path="/laporan-transaksi" component={TransactionReport} />
                    <PrivateRoute path="/add_cukai_taksiran" component={Add} />
                    <PrivateRoute path="/PengesahanPembayaran" component={BeforeBayar} />
                    <PrivateRoute path="/DetailPembayaranAkaun" component={DetailAccountPayment} />
                    <Route path="*" component={NotFound} />
                  </Switch>
                  </ContextHandlerProvider>
                </SelectedBillContextProvider>
              </div>
          </div>
        </Router>
      </div>
    );
  } else {
    return (
      <div className="App">
        <Router>
          <div>
            <div className="content">
            <SelectedBillContextProvider>
            <ContextHandlerProvider>
                <Switch>
                  <Route exact path="/" component={Home} />
                  <PublicRoute path="/login" component={Login} />
                  <PublicRoute path="/register" component={Register} />
                  {/* <PrivateRoute path="/home" component={Dashboard} /> */}
                  <PrivateRoute path="/setting" component={Setting} />
                  <PrivateRoute path="/bill" component={Bill} />
                  <PrivateRoute path="/cukaitaksiran" component={cukaitaksiran} />
                  <PrivateRoute path="/kompaun" component={kompaun} />

                  <PrivateRoute path="/lesen" component={Lesen} />
                  <PrivateRoute path="/jenislesen" component={JenisLesen} />
                  <PrivateRoute path="/menulesen" component={LesenMenu} />

                  <PrivateRoute path="/cukai" component={Cukai} />
                  <PrivateRoute path="/menucukai" component={CukaiMenu} />

                  <PrivateRoute path="/permit" component={Permit} />
                  <PrivateRoute path="/jenispermit" component={JenisPermit} />
                  <PrivateRoute path="/menupermit" component={PermitMenu} />

                  <PrivateRoute path="/test_permit"  component={TestPermitType} />
                  <PrivateRoute path="/testpermitmenu" component={TestPermitMenu} />
                    
                  <PrivateRoute path="/paymentV2" component={SinglePayment} />
                  <PrivateRoute path="/multiplepayment" component={MultiplePayment} />

                  <PrivateRoute path="/carian" component={Carian} />

                  <PrivateRoute path="/bill_cukai_taksiran" component={SenaraiBil} />
                  <PrivateRoute path="/payment" component={Payment} />
                  <PrivateRoute path="/multiaccount-payment" component={MultiAccount} />
                  <PrivateRoute path="/add_cukai_taksiran" component={Add} />
                  <PrivateRoute path="/laporan-penyata-akaun" component={UserReport} />
                  <PrivateRoute path="/resit-bayaran" component={ReceiptReport} />
                  <PrivateRoute path="/bayaran-akaun" component={ReceiptReportAccount} />
                  <PrivateRoute path="/laporan-transaksi" component={TransactionReport} />
                  <PrivateRoute path="/PengesahanPembayaran" component={BeforeBayar} />
                  <PrivateRoute path="/DetailPembayaranAkaun" component={DetailAccountPayment} />
                  <PublicRoute
                    path="/forgotpassword"
                    component={ForgotPassword}
                  />
                  {/* <PrivateRoute
                    path="/admin/dashboard"
                    component={Admin_Dashboard}
                  /> */}
                  <PrivateRoute
                    path="/admin/setting"
                    component={Admin_Setting}
                  />
                  <PrivateRoute
                    path="/admin/usermanagement"
                    component={ServerSideDataTable}
                  />

                   {/* <PrivateRoute
                    path="/admin/usermanagement"
                    component={Admin_UserManagement}
                  /> */}

                  {/* <PrivateRoute
                  path="/admin/server-side"
                  component={ServerSideDataTable}
                /> */}

                  {/* <PrivateRoute
                  path="/admin/client-side"
                  component={ClientSideDataTable}
                />  */}

                {/* <PrivateRoute
                  path="/admin/collapsible-datatable"
                  component={CollapsibleDataTable}
                />  */}
                
                  <PrivateRoute
                    path="/admin/report"
                    component={Admin_Report}
                  />
                  <PrivateRoute
                    path="/admin/laporan_pengguna"
                    component={Admin_UserStatus}
                  />
                  <PrivateRoute
                    path="/admin/add_user"
                    component={AddUser}
                  />
                  <Route path="*" component={NotFound} />
                </Switch>
                </ContextHandlerProvider>
              </SelectedBillContextProvider>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;