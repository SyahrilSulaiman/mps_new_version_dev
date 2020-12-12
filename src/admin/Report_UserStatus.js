import React,{useState, useEffect} from "react";
import axios from 'axios'
import Sidebar from "./Sidebar_Admin";
import Navbar from "../components/Navbars/AdminNavbar";
import PieChart from "./report/Pie"
// import GraphChart from "./report/Graph"
import { Pane, Button, SelectField, ArrowLeftIcon , Icon, Heading} from 'evergreen-ui'
import { SERVER_URL } from '../Constants'

function Report_UserStatus(props) {
    const [report, setReport] = useState([]);
    const [loading,setLoading] = useState(false);
  
    useEffect(() => {
      const fetchUsers = async () => {
        setLoading(true);
        const res = await axios.get(SERVER_URL+"int/api_generator.php?api_name=laporan_pengguna")
        .then( res => {
          setReport(res.data.result);
          setLoading(false);
        })
      }
      fetchUsers();
    }, []);

if(loading){
    return (
        <div>Loading...</div>
    )
    }
  // Test Pie Chart
  // return (
  //   <div>
  //     <Sidebar />
  //     <div className="relative md:ml-64 bg-blue-600" style={{ height: "100%" }}>
  //       <Navbar />
  //       {/* Header */}
  //       <div className="w-full xl:pt-24 lg:pt-24 md:pt-16 sm:pt-16 xs:pt-16">
  //       <div className="flex flex-wrap ">
  //           <Pane background="#2c3e50" className="p-3 xl:mx-4 xl:rounded-md" position="relative" width="100%">
  //               <Heading size={400} color="white">
  //                    Laporan Pengguna Berdaftar
  //               </Heading>
  //           </Pane>
  //       </div>

  //           <div className="flex flex-wrap xl:pt-2">
  //             <Pane background="white" className="p-3 xl:mx-4 xl:rounded-md flex" position="relative" width="100%">
  //               {
  //                   <PieChart report={report}/>
  //               }
  //             </Pane>
  //             <Pane background="white" className="p-3 py-5 xl:mx-4 xl:rounded-md flex" position="relative" width="100%">
  //               {
  //                   <table className="table-auto">
  //                     <thead>
  //                       <tr>
  //                         <th>Jenis Pengguna</th>
  //                         <th>Bilangan</th>
  //                       </tr>
  //                     </thead>
  //                     <tbody>
  //                       {
  //                         report.map((res,index) =>{
  //                           <tr key={index}>
  //                             <td>{res.name}</td>
  //                             <td>{res.value}</td>
  //                           </tr>
  //                         })
  //                       }
  //                     </tbody>
  //                   </table>
  //               }
  //             </Pane>
  //           </div>

  //       </div>

  //     </div>
  //   </div>
  // );

  //Test Graph 
  return (
    <div>
      <Sidebar />
      <div className="relative md:ml-64 bg-blue-600" style={{ height: "100%" }}>
        <Navbar />
        {/* Header */}
        <div className="w-full xl:pt-24 lg:pt-24 md:pt-16 sm:pt-16 xs:pt-16">
        <div className="flex flex-wrap ">
            <Pane background="#2c3e50" className="p-3 xl:mx-4 xl:rounded-md" position="relative" width="100%">
                <Heading size={400} color="white">
                     Laporan Pengguna Berdaftar
                </Heading>
            </Pane>
        </div>

            <div className="flex flex-wrap xl:pt-2">
              <Pane background="white" className="p-3 xl:mx-4 xl:rounded-md flex" position="relative" width="100%">
                {
                    // <PieChart report={report}/>
                    // <GraphChart />
                }
              </Pane>
            </div>
        </div>
      </div>
    </div>
  )

}

export default Report_UserStatus;
