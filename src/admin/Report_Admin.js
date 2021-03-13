import React,{useState, useEffect} from "react";
import { getUser, getNOKP, getToken, removeUserSession } from "../Utils/Common";

import Sidebar from "./Sidebar_Admin";
import Navbar from "../components/Navbars/AdminNavbar";
import Footer from "../components/Footers/Footer";
import CukaiTaksiran from './report/Carian_Cukai';
import PieChart from "./report/Pie"
import { Pane, Button, SelectField, ArrowLeftIcon , Icon, Heading} from 'evergreen-ui'
import DatePicker from 'react-datepicker';
import axios from 'axios'
import {SERVER_URL} from '../Constants';
import "react-datepicker/dist/react-datepicker.css";
import NumberFormat from "react-number-format";

function Dashboard(props) {
  const token = getToken();
  const user = getUser();
  const nokp = getNOKP();
  const [account,setAccount] = useState('');
  const [amount,setAmount] = useState();
  const [transaction,setTransaction] = useState();
  const [loading,setLoading] = useState(false);
  const [displayAmount,setDisplayAmount] = useState(false);
  const [displayTransaction,setDisplayTransaction] = useState(false);
  const [type, setType] = useState('');
  const [startDate, setStartDate] = useState('');
  // setType(false)

  const handleLogout = () => {
    removeUserSession();
    props.history.push("/login");
  };

  const handlePdf = () =>{
    console.log("type :" , type);
    console.log("date :" , startDate);
    console.log("account :" , account);
    window.open(SERVER_URL+"rp/laporan_bayaran.php?date="+startDate+"&type="+type+"&account="+account);
  }

  useEffect(() =>{
    setLoading(false);
    axios.get(SERVER_URL+"int/api_generator.php?api_name=api_total_payment")
    .then(res => {
      setLoading(true);
      setAmount(res.data.result[0].amount);
      setTransaction(res.data.result[0].transaction);
    })
    .then( res => {
      setLoading(false);
      setDisplayAmount(true);
      setDisplayTransaction(true);
    })
  },[amount])

  

  return (
    <div>
      <Sidebar />
      <div className="relative md:ml-64 bg-blue-600  overflow-y-auto" style={{ height: "100vh" }}>
        <Navbar />
        {/* Header */}
        <div className="w-full xl:pt-24 lg:pt-24 md:pt-16 sm:pt-16 xs:pt-16">
        <div className="flex flex-wrap ">
            <Pane background="#2c3e50" className="p-3 xl:mx-4 xl:rounded-md" position="relative" width="100%">
                <Heading size={400} color="white">
                     Laporan Bayaran Cukai Taksiran
                </Heading>
            </Pane>
        </div>

            <div className="flex flex-wrap xl:pt-2">
              <Pane background="white" className="p-3 xl:mx-4 xl:rounded-md" position="relative" width="100%">
                <Heading size={300}>Jumlah Keseluruhan Pembayaran Melalui MyMPS :&nbsp;
                  <NumberFormat className="text-base" value={(loading === false && displayAmount === true) ? amount : '0'} displayType={'text'} thousandSeparator={true} prefix={'RM'} />
                </Heading>
              </Pane>
            </div>
            <div className="flex flex-wrap xl:pt-2">
              <Pane background="white" className="p-3 xl:mx-4 xl:rounded-md" position="relative" width="100%">
                <Heading size={300}>Bilangan Transaksi :&nbsp;
                  <NumberFormat className="text-base" value={(loading === false && displayTransaction === true) ? transaction : '0'} displayType={'text'} />
                </Heading>
              </Pane>
            </div>
            <div className="flex flex-wrap xl:pt-2">
              <Pane background="white" className="p-3 xl:mx-4 xl:rounded-md" position="relative" width="100%">
                <Heading size={500}>Tarikh : &nbsp;<DatePicker selected={startDate} onChange={date => setStartDate(date)} dateFormat="yyyy-MM-dd" isClearable placeholderText="Sila pilih tarikh" /></Heading>
              </Pane>
            </div>
            <div className="flex flex-wrap xl:pt-2">
              <Pane background="white" className="p-3 xl:mx-4 xl:rounded-md" position="relative" width="100%">
                  <SelectField
                      label="Jenis Carian"
                      description="Sila buat pilihan jenis carian bil"
                      onChange={(e) => setType(e.target.value)}
                  >
                      <option value='tiada'>-- Sila Pilih --</option>
                      <option value="nokp">Kad Pengenalan</option>
                      <option value="ssm">Nombor ROC/ROB Syarikat</option>
                      <option value="akaun">Nombor Akaun</option>
                      <option value="invoice">No Invoice</option>
                  </SelectField>
                  {
                    // type === '' ? '' :
                    <CukaiTaksiran type={type} startDate={startDate} handlePdf={handlePdf} returnAccount={setAccount}/>
                  }
              </Pane>
            </div>

        </div>

      </div>
    </div>
  );
}

export default Dashboard;
