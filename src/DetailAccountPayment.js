import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./components/Navbars/AdminNavbar";
import {
  Pane,
  ArrowLeftIcon,
  Spinner,
  TextInput,
  Heading,
  ChevronRightIcon,
  Icon,
} from "evergreen-ui";
import Topbar from "./Topbar2";
import { getNOKP, getEmail, setAuthorization, getAccessToken } from "./Utils/Common";
import { SERVER_URL } from './Constants';


export default function ReceiptReport(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchResult, setSearchResult] = useState([]);
  const [search, setSearch] = useState('');
  const nokp = getNOKP();
  const email = getEmail();
  const auth = setAuthorization(nokp,email);
  const accessToken = getAccessToken();
  
  const myHeaders = new Headers();
  myHeaders.append('token',auth);

  const url = new URL(window.location.href);

  useEffect(() => {
    var apiUrl = SERVER_URL+"int/api_generator.php?api_name=laporan_akaun_detail";
    
    const account = url.searchParams.get("account")

    var formData = new FormData();
    formData.append("userid", nokp);
    formData.append("account", account);

    var requestOptions = {
      method: "POST",
      body: formData,
      redirect: "follow",
      headers:myHeaders
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setLoading(true);
        if (result.status === "success") {
          setData(result.data);
          setSearchResult(result.data);
          setLoading(false);
        } else {
          setLoading(false);
        }
      });
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  }

  useEffect(() => {
    const results = data.filter(json => json.AP_RECEIPT.toUpperCase().includes(search))
    setSearchResult(results);
  }, [search]);

  const viewPenyata = (e) => {
    window.location.href = SERVER_URL+"rp/resit.php?invoice=" + btoa(btoa(e))+"&token="+accessToken
  }

  if (loading == true) {
    return (
      <div>
        <Sidebar />
        <div
          className="relative md:ml-64 bg-gray-400"
          style={{ height: "100vh", background: "rgb(34,81,122)", background: "linear-gradient(90deg, rgba(34,81,122,1) 0%, rgba(27,147,171,1) 100%)" }}
        >
          <Navbar />
          <div className="w-full xl:pt-24 lg:pt-24 md:pt-16 sm:pt-16 xs:pt-16">
            <div className="flex flex-wrap " style={{ background: "rgb(34,81,122)", background: "linear-gradient(90deg, rgba(34,81,122,1) 0%, rgba(27,147,171,1) 100%)"}}>
              <Pane
                background="#2c3e50"
                className="xl:mx-4 xl:rounded-md"
                width="100%"
              >
                <Topbar
                  title="Laporan Resit"
                />
              </Pane>

              <div className="w-full bg-transparent px-3">
                <Pane
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  paddingY={100}
                >
                  <Spinner />
                </Pane>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (loading == false && data !== null)
    return (
      <div>
        <Sidebar />
        <div
          className="relative md:ml-64 bg-gray-400"
          style={{ height: "100vh", background: "rgb(34,81,122)", background: "linear-gradient(90deg, rgba(34,81,122,1) 0%, rgba(27,147,171,1) 100%)" }}
        >
          <Navbar />
          <div className="w-full xl:pt-24 lg:pt-24 md:pt-16 sm:pt-16 xs:pt-16" style={{ background: "rgb(34,81,122)", background: "linear-gradient(90deg, rgba(34,81,122,1) 0%, rgba(27,147,171,1) 100%)"}}>
            <div className="flex flex-wrap ">
              <Pane
                background="#2c3e50"
                className="xl:mx-4 xl:rounded-md"
                width="100%"
              >
                <Topbar
                  title="Laporan Resit"
                />
              </Pane>

              <Pane
                className="p-3 xl:mx-4 xl:rounded-md xl:my-2"
                width="100%"
                background="tint1"
              >
                <TextInput
                  width="100%"
                  placeholder="carian..."
                  value={search}
                  onChange={handleSearch}
                />
              </Pane>
              
              <Pane className="p-3 xl:mx-4 xl:rounded-md bg-white overflow-y-scroll" style={{ height: "68vh" }} width="100%">
                {searchResult && searchResult.map((data, index) => {
                  return (
                    <Pane onClick={(e) => viewPenyata(data.AP_INVOICE)} key={data.AP_INVOICE+index} display="grid" gridTemplateColumns="50px 1fr 20px" background="tint1" className={"cursor-pointer hover:bg-gray-300 " + (index !== 0 ? "py-2" : "")}>
                      <Heading size={100} className="py-4 mx-auto">{index + 1}</Heading>
                      <Pane className="p-4">
                        <Heading size={200}>No. Resit : {data.AP_RECEIPT}</Heading>
                        <Heading size={200}>Tarikh : {data.AP_DATE}</Heading>
                      </Pane>
                      <Heading className="py-4 mx-auto"><Icon icon={ChevronRightIcon}></Icon></Heading>
                    </Pane>
                  )
                })}
                {!searchResult && (() => {
                  return (
                    <Pane display="grid" gridTemplateColumns="50px 1fr 20px">
                      <Heading size={100}></Heading>
                      <Pane>
                        <Heading size={200}> -- Tiada Maklumat --</Heading>
                      </Pane>
                      <Heading></Heading>
                    </Pane>
                  )
                })}
              </Pane>
            </div>
          </div>
        </div>
      </div>
    );

  else {
    return (
      <div>
        <Sidebar />
        <div
          className="relative md:ml-64 bg-gray-400"
          style={{ height: "100vh" }}
        >
          <Navbar />
          <div className="w-full xl:pt-24 lg:pt-24 md:pt-16 sm:pt-16 xs:pt-16">
            <div className="flex flex-wrap ">
              <Pane
                background="#2c3e50"
                className="xl:mx-4 xl:rounded-md"
                width="100%"
              >
                <Topbar
                  title="Laporan Penyata Akaun"
                  leftButtonIcon={ArrowLeftIcon}
                  onClickLeftButton={() => window.history.back()}
                />
              </Pane>

              <div className="w-full bg-transparent px-3">
                <Pane
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  paddingY={100}
                >
                  <Heading size={200}>Tiada data dijumpai.</Heading>
                </Pane>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
