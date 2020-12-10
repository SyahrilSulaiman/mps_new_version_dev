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
import Topbaer from "./Topbar2";
import { getNOKP, getEmail, setAuthorization } from "./Utils/Common";


function Bill(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchResult, setSearchResult] = useState([]);
  const [search, setSearch] = useState('');
  const nokp = getNOKP();
	const email = getEmail();
	const auth = setAuthorization(nokp,email);

  useEffect(() => {
    var apiUrl =
      "https://mymps.corrad.my/int/api_generator.php?api_name=laporan_penyata_akaun";

    var formData = new FormData();
    formData.append("userid", nokp);
    formData.append("search", search);

    var requestOptions = {
      method: "POST",
      body: formData,
      redirect: "follow",
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

  useEffect(() => {
    const results = data.filter(json => json.A_NO.toUpperCase().includes(search))
    setSearchResult(results);
  }, [search]);

  const viewPenyata = (e) => {
    window.location.href = "https://mymps.corrad.my/rp/penyata_semasa.php?noakaun=" + btoa(btoa(e))
  }

  const dataa = {
    columns: [
      {
        label: "Akaun",
        field: "A_NO",
        sort: "asc",
        width: 500,
      },
      {
        label: "No. Invois",
        field: "AP_INVOICE_NO",
      },
    ],
    rows: data,
  };

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
                  title="Laporan Penyata Akaun"
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
                    <Pane onClick={(e) => viewPenyata(data.A_NO)} key={data.A_NO} display="grid" gridTemplateColumns="50px 1fr 20px" background="tint1" className={"cursor-pointer hover:bg-gray-300 " + (index !== 0 ? "py-2" : "")}>
                      <Heading size={100} className="py-4 mx-auto">{index + 1}</Heading>
                      <Pane className="p-4">
                        <Heading size={200}>Akaun : {data.A_NO}</Heading>
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
