import React, { useState, useEffect } from "react";
import { getUser, getNOKP, getToken, removeUserSession } from "../Utils/Common";
import { DataGrid } from "@material-ui/data-grid";
import axios from 'axios'
import Sidebar from "./Sidebar_Admin";
import Navbar from "../components/Navbars/AdminNavbar";
import Footer from "../components/Footers/Footer";
import CardUser from "../components/Cards/CardUser";
import Pagination from "../components/Pagination/Pagination"
import UserDetail from "./UpdateUser_Admin";
import { Button, Pane, SearchInput } from 'evergreen-ui'
import { searchBegin } from "@syncfusion/ej2-react-grids";
// import UserDetail from "../components/Cards/CardSettings"

function Dashboard(props) {
  const token = getToken();
  const nokp = getNOKP();

  const [users, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [userPerPage, setUserPerPage] = useState(5);
  const [searchResult,setSearchResult] = useState([]);
  const [search,setSearch] = useState('');

  const handleSearch = (e) => {
    setSearch(e.target.value);
  }

  useEffect(() =>{

    const results = users.filter( json => json.U_USERIC.toUpperCase().includes(search))
    setSearchResult(results);    
  },[search]);

  const [showDetail,setShowDetail] = useState(false);
  const [userDetail,setUserDetail] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const res = await axios.get("https://mymps.corrad.my/int/api_generator.php?api_name=user_list")
      .then( res => {
        setUser(JSON.parse(res.data.data));
        setSearchResult(JSON.parse(res.data.data));
        setLoading(false);
      })

    }
    fetchUsers();
  }, []);

  const indexOfLastUser = currentPage * userPerPage;
  const indexOfFirstUser = indexOfLastUser - userPerPage;
  const currentUsers = searchResult.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const showUser = (user) => setUserDetail(user);

  const handleLogout = () => {
    removeUserSession();
    props.history.push("/login");
  };

  const handleAdd = () => {
    // window.location.href = "./add_user"
    props.history.push("./add_user");
  }

  if(!showDetail){
    return (
      <div className="">
        <Sidebar />
        <div className="relative md:ml-64 bg-blue-600" style={{ height: "100%" }}>
          <Navbar />
          <div className="relative bg-blue-600 md:pt-32 pb-32 pt-12">

            <div className="px-4 md:my-4 md:px-2 mx-auto w-full">
              <div className="flex flex-wrap">
                <div className="w-full px-4">
                  <div className="relative flex flex-col min-w-0 break-words bg-blue-100 border-b border-gray-400 shadow-lg rounded-lg">
                  <Pane padding={3}>
                    <Pane>
                      <Button height={40} appearance="primary" intent="success" onClick={handleAdd}>Tambah Pengguna</Button>
                    </Pane>
                    <Pane paddingTop={10}>
                      <SearchInput 
                        placeholder="Kad Pengenalan / ROB ROC Pengguna"
                        onChange = {handleSearch}
                        value={search}
                      />
                    </Pane>
                  </Pane>
                    <div className="flex-auto p-4">
                      <div className="flex flex-row border-b border-gray-600">
                        <div className="relative w-2/12 md:w-1/12 pr-4 flex-initial">
                          <h5 className="uppercase font-medium text-xs text-gray-600">
                            {
                              // dataset.tempoh
                              // bill.description
                              // bill.add_harta
                            }Bil
                                    </h5>
                        </div>
                        <div className="relative w-4/12 lg:w-3/12 pr-4 flex-grow">
                          <h5 className="uppercase font-medium text-xs text-gray-600">
                            {
                              // dataset.tempoh
                              // bill.description
                              // bill.add_harta
                            }No Kad Pengenalan
                                        </h5>
                        </div>
                        <div className="relative lg:w-6/12 pr-4 flex-grow hidden lg:block">
                          <h5 className="uppercase font-medium text-xs text-gray-600">
                            {
                              // dataset.tempoh
                              // bill.description
                              // bill.add_harta
                            }Nama
                                        </h5>
                        </div>
                        <div className="relative lg:w-2/12 pr-4 flex-grow hidden lg:block">
                          <h5 className="uppercase font-medium text-xs text-gray-600">
                            {
                              // dataset.tempoh
                              // bill.description
                              // bill.add_harta
                            }Telefon
                                        </h5>
                        </div>
                        <div className="relative w-4/12 lg:w-2/12 pr-4 flex-initial">
                          <h5 className="uppercase font-medium text-xs text-gray-600">
                            {
                              // dataset.tempoh
                              // bill.description
                              // bill.add_harta
                            }Status
                                    </h5>
                        </div>
                        <div className="relative w-1/12 w-auto pl-4 flex-initial invisible">
                          <i className="far fa-trash-alt" style={{ color: "red" }}></i>
                        </div>
                      </div>
                    </div>
                    <CardUser users={currentUsers} loading={loading} currentPage={currentPage} userPerPage={userPerPage} showUser={showUser} display={setShowDetail}/>
                    <Pagination usersPerPage={userPerPage} totalUsers={searchResult.length} paginate={paginate} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <Footer /> */}
        </div>
      </div>
    );
  }
  else{
    return (
      <div className="">
        <Sidebar />
        <div className="relative md:ml-64 bg-blue-600" style={{ height: "100%" }}>
          <Navbar />
          <div className="relative bg-blue-600 pb-32 pt-12">

          <UserDetail showUser={userDetail} display={setShowDetail}/>

          </div>
          { 
          //  <Footer />
          }
        </div>
      </div>
    );
  }
}

export default Dashboard;