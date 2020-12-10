import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./components/Navbars/AdminNavbar";
import {
  Pane,
  ArrowLeftIcon,
  Spinner,
  TextInput,
  Heading,
} from "evergreen-ui";
import Topbaer from "./Topbar2";
import {  getNOKP, getEmail, setAuthorization } from "./Utils/Common";

function Bill(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchResult,setSearchResult] = useState([]);
  const [search,setSearch] = useState('');
  const nokp = getNOKP();
	const email = getEmail();
	const auth = setAuthorization(nokp,email);
	const headers = {
		token: auth
  }
  const myHeaders = new Headers();
  myHeaders.append('token',auth);

  useEffect(() => {
    var apiUrl =
      "https://mymps.corrad.my/int/api_generator.php?api_name=userReport";

    var formData = new FormData();
    formData.append("userid", nokp);
    formData.append("search", search);

    var requestOptions = {
      method: "POST",
      body: formData,
      redirect: "follow",
      // headers:myHeaders
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setLoading(true);
        if (result.status == "success") {
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

  useEffect(() =>{
    const results = data.filter( json => json.A_NO.toUpperCase().includes(search))
    setSearchResult(results);    
  },[search]);

  if (loading == true) {
    return (
      <div>
        <Sidebar />
        <div
          className="relative md:ml-64 bg-gray-400"
          style={{ height: "120vh", background: "rgb(34,81,122)", background: "linear-gradient(90deg, rgba(34,81,122,1) 0%, rgba(27,147,171,1) 100%)" }}
        >
          <Navbar />
          <div className="w-full xl:pt-24 lg:pt-24 md:pt-16 sm:pt-16 xs:pt-16" style={{ background: "rgb(34,81,122)", background: "linear-gradient(90deg, rgba(34,81,122,1) 0%, rgba(27,147,171,1) 100%)"}}>
            <div className="flex flex-wrap ">
              <Pane
                background="#2c3e50"
                className="xl:mx-4 xl:rounded-md"
                width="100%"
              >
                <Topbaer
                  title="Laporan Transaksi"
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
                <Topbaer
                  title="Laporan Transaksi"
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
                  onChange = {handleSearch}
                />
              </Pane>
              
              <Pane className="p-3 xl:mx-4 xl:rounded-md bg-white overflow-y-scroll" style={{ height: "68vh" }} width="100%">
                {searchResult && searchResult.map((data, index) => {
                  return(
                    <Pane key={data.A_NO+index} display="grid" gridTemplateColumns="50px 1fr 20px" background="tint1" className={" hover:bg-gray-300 "+(index !== 0 ? "py-2" : "")}>
                      <Heading size={100} className="py-8 mx-auto">{index + 1}</Heading>
                      <Pane className="p-4">
                        <Heading size={200}>Akaun : {data.A_NO}</Heading>
                        <Heading size={200}>No Invois : {data.AP_INVOICE_NO}</Heading>
                        <Heading size={200}>No Resit : {(data.AP_RECEIPT_NO !== '' || data.AP_RECEIPT_NO !== null) ? data.AP_RECEIPT_NO : 'Tiada Maklumat'}</Heading>
                        <Heading size={200}>Pembayar : {data.AP_PAYOR_NAME}</Heading>
                        <Heading size={200}>Emel : {data.AP_PAYOR_EMAIL}</Heading>
                        <Heading size={200}>No. Telefon : {data.AP_PAYOR_PHONE}</Heading>
                        <Heading size={200}>Jumlah Pembayaran : RM {data.AP_AMOUNT}</Heading>
                        <Heading size={200}>Tarikh : {data.AP_DATETIME_PAYMENT !== null ? data.AP_DATETIME_PAYMENT : 'Tiada Maklumat'}</Heading>
                        <Heading size={200}>Status : {data.AP_STATUS == '1' ? "Berjaya" : "Tidak Berjaya"}</Heading>
                      </Pane>
                    </Pane>
                  )
                })}
                {!searchResult && (() => {
                  return(
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
                <Topbaer
                  title="Laporan / Laporan Transaksi"
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

export default Bill;
