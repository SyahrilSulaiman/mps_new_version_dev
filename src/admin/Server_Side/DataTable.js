import React, { useState, useEffect } from "react";
import { getUser, getNOKP, getToken, removeUserSession } from "./../../Utils/Common";
import { DataGrid } from "@material-ui/data-grid";
import axios from 'axios'
import Sidebar from "./../Sidebar_Admin";
import Navbar from "../../components/Navbars/AdminNavbar";
import Footer from "../../components/Footers/Footer";
import CardUser from "../../components/Cards/CardUser";
// import Pagination from "../components/Pagination/Pagination"
import PaginationRounded from './../report/PaginationRounded'
import UserDetail from "./../UpdateUser_Admin";
import { Button, Pane, SearchInput } from 'evergreen-ui'
// import { searchBegin } from "@syncfusion/ej2-react-grids";
// import UserDetail from "../components/Cards/CardSettings"
import { SERVER_URL } from '../../Constants';
import { PlusIcon, SearchIcon} from "evergreen-ui";


function Dashboard(props) {
  const token = getToken();
  const nokp = getNOKP();

  const [users, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [userPerPage, setUserPerPage] = useState(10);
  const [searchResult,setSearchResult] = useState([]);
  const [search,setSearch] = useState('');
  const [total,setTotal] = useState(0);
  const [showDetail,setShowDetail] = useState(false);
  const [userDetail,setUserDetail] = useState([]);
  const [pengguna,setPengguna] = useState([]);
  const [penggunaLoading,setPenggunaLoading] = useState(false);
  const showUser = (user) => setUserDetail(user);

  // useEffect(() =>{
  //   const results = users.filter( json => json.U_USERIC.toUpperCase().includes(search))
  //   setSearchResult(results);
  // },[search]);

  const handleSearch = (e) => {
    setSearch(e.target.value.toUpperCase());
  }

  useEffect(() => {console.log(search)},[search])

  const handleSearchUser = (e) => {
    const fetchUsers = async () => {
      setLoading(true);
      const res = await axios.get(SERVER_URL+"int/api_generator.php?api_name=user_list&search="+search)
      .then( res => {
        setUser(JSON.parse(res.data.data));
        setSearchResult(JSON.parse(res.data.data));
        setTotal(res.data.total);
      })
      .then(res => {
        setCurrentPage(1);
        setLoading(false);
      })
    }
    fetchUsers();
  }

  const handleChange = (event, value) => {
    if(value !== currentPage && value > 0){
      let temp = ((value-1)*10);
      const fetchUsers = async () => {
        setLoading(true);
        const res = await axios.get(SERVER_URL+"int/api_generator.php?api_name=user_list&start="+temp)
        .then( res => {
          setUser(JSON.parse(res.data.data));
          setSearchResult(JSON.parse(res.data.data));
        })
        .then(res => {
          setLoading(false);
        })
      }
      fetchUsers();
    }
    setCurrentPage(value);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const res = await axios.get(SERVER_URL+"int/api_generator.php?api_name=user_list&start=0")
      .then( res => {
        setUser(JSON.parse(res.data.data));
        setSearchResult(JSON.parse(res.data.data));
        setTotal(res.data.total);
        setLoading(false);
      })

    }
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setPenggunaLoading(true);
      const res = await axios.get(SERVER_URL+"int/api_generator.php?api_name=user_count")
      .then( res => {
        setPengguna(res.data.data[0]);
        setLoading(false);
        setPenggunaLoading(false);
      })

    }
    fetchUsers();
  }, []);

  const indexOfLastUser = currentPage * userPerPage;
  const indexOfFirstUser = indexOfLastUser - userPerPage;
  const currentUsers = searchResult.slice(indexOfFirstUser, indexOfLastUser);



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
        <div className="relative md:ml-64 bg-blue-600  overflow-y-auto" style={{ height: "100vh" }}>
          <Navbar />
          <div className="relative bg-blue-600 md:pt-20 pb-32 pt-12 ">

            <div className="px-4 md:my-4 md:px-2 mx-auto w-full overflow-y-auto">
              <div className="flex flex-wrap">
                <div className="w-full px-4">
                  <div className="relative flex flex-col min-w-0 break-words bg-blue-100 border-b border-gray-400 shadow-lg rounded-lg">
                  <Pane padding={3}>
                  <Pane className="flex flex-wrap p-4">
                  <Pane className="w-full lg:w-6/12 xl:w-4/12 px-4">
                  <Pane className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                    <Pane className="flex-auto pl-4 pr-4 pb-2 pt-3 bg-indigo-900 rounded">
                      <Pane className="flex flex-wrap">
                        <Pane className="relative w-full pr-4 max-w-full flex-grow flex-1">
                          <h5 className="text-white uppercase font-bold text-xs pb-3">
                          Bil Pengguna Berdaftar :    
                          </h5>
                          <span className="font-semibold text-l text-green-300">
                          {penggunaLoading ? '0' : pengguna.TOTAL}  Pengguna
                          </span>
                        </Pane>
                      </Pane>
                    </Pane>
                  </Pane>
                </Pane>

                <Pane className="w-full lg:w-6/12 xl:w-4/12 px-4">
                  <Pane className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                    <Pane className="flex-auto pl-4 pr-4 pb-2 pt-3 bg-indigo-900 rounded">
                      <Pane className="flex flex-wrap">
                        <Pane className="relative w-full pr-4 max-w-full flex-grow flex-1">
                          <h5 className="text-white uppercase font-bold text-xs pb-3">
                          Bil Pengguna Disahkan :
                          </h5>
                          <span className="font-semibold text-l text-green-300">
                          {penggunaLoading ? '0' : pengguna.BERDAFTAR}  Pengguna
                          </span>
                        </Pane>
                      </Pane>
                    </Pane>
                  </Pane>
                </Pane>

                <Pane className="w-full lg:w-6/12 xl:w-4/12 px-4">
                  <Pane className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                    <Pane className="flex-auto pl-4 pr-4 pb-2 pt-3 bg-indigo-900 rounded">
                      <Pane className="flex flex-wrap">
                        <Pane className="relative w-full pr-4 max-w-full flex-grow flex-1">
                          <h5 className="text-white uppercase font-bold text-xs pb-3">
                          Bil Pengguna Belum Disahkan :
                          </h5>
                          <span className="font-semibold text-l text-green-300">
                          {penggunaLoading ? '0' : pengguna.TIDAK_BERDAFTAR}  Pengguna
                          </span>
                        </Pane>
                      </Pane>
                    </Pane>
                  </Pane>
                </Pane>
              </Pane>
                    {/* <Pane width="100%" className='flex flex-wrap'>
                      <Pane className='p-4 xl:w-1/4 md:w-1/2 w-7/12'>
                        <Pane className="bg-green-500 h-full rounded-lg flex flex-col relative overflow-hidden shadow-xl">
                          <Pane className='p-4 text-white flex rounded-lg items-center justify-center'>
                            Bil Pengguna Berdaftar : {penggunaLoading ? '0' : pengguna.TOTAL}
                          </Pane>
                        </Pane>
                      </Pane>
                      <Pane className='p-4 xl:w-1/4 md:w-1/2 w-7/12'>
                        <Pane className="bg-green-500 h-full rounded-lg flex flex-col relative overflow-hidden shadow-xl">
                          <Pane className='p-4 text-white flex rounded-lg items-center justify-center'>
                            Bil Pengguna Disahkan : {penggunaLoading ? '0' : pengguna.BERDAFTAR}
                          </Pane>
                        </Pane>
                      </Pane>
                      <Pane className='p-4 xl:w-1/4 md:w-1/2 w-7/12'>
                        <Pane className="bg-green-500 h-full rounded-lg flex flex-col relative overflow-hidden shadow-xl">
                          <Pane className='p-4 text-white flex rounded-lg items-center justify-center'>
                            Bil Pengguna Belum Disahkan : {penggunaLoading ? '0' : pengguna.TIDAK_BERDAFTAR}
                          </Pane>
                        </Pane>
                      </Pane>
                    </Pane> */}
                    <Pane>
                      <Button height={40} appearance="primary" intent="success" onClick={handleAdd}>Tambah Pengguna</Button>
                    </Pane>
                    <Pane display="flex" width="100%">
                      <Pane paddingTop={10} alignItems="center" display="flex">
                        <SearchInput 
                          placeholder="Carian Pengguna"
                          onChange = {handleSearch}
                          value={search}
                          width="200px"
                        />
                      </Pane>
                      <Pane paddingTop={10} marginLeft={16}>
                        <Button appearance="primary" onClick={handleSearchUser}>Cari</Button>
                      </Pane>
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
                            }Kad Pengenalan / ROB ROC
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
                    <CardUser users={searchResult} loading={loading} currentPage={currentPage} userPerPage={userPerPage} showUser={showUser} display={setShowDetail}/>
                    {/* <Pagination usersPerPage={userPerPage} totalUsers={searchResult.length} paginate={paginate} /> */}
                    <PaginationRounded resultPerPage={userPerPage} totalResult={total} paginate={handleChange}/>
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
        <div className="relative md:ml-64 bg-blue-600" style={{ height: "100vh" }}>
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