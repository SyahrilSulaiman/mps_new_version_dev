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
import Table from './Table'
// import { searchBegin } from "@syncfusion/ej2-react-grids";
// import UserDetail from "../components/Cards/CardSettings"
import { SERVER_URL } from '../../Constants';

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
                    <Table></Table>
                </div>
              </div>
            </div>
          </div>
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

          {/* <UserDetail showUser={userDetail} display={setShowDetail}/> */}

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