import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import Carian from "./Carian";
import {
  Pane,
  TextInputField,
  Button,
  SearchIcon,
  ArrowLeftIcon,
  Heading,
  toaster,
} from "evergreen-ui";
import NoScroll from "no-scroll";
import Axios from 'axios';
import { getNOKP, getEmail, setAuthorization } from "./Utils/Common";
import { SERVER_URL } from './Constants';

export default function Search({ type }) {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [display, setDisplay] = useState(false);
  const [bill, setBill] = useState([]);
  const [array, setArray] = useState([]);
	const nokp = getNOKP();
	const email = getEmail();
  const auth = setAuthorization(nokp,email);
  const headers = {
		token: auth
  }
  const myHeaders = new Headers();
  myHeaders.append('token',auth);

  useEffect(() => {
  }, [type]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  let searchType = "";
  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    axios
      .get(
        SERVER_URL+"int/api_generator.php?api_name=searchBill",
        {
          params: {
            search: search.trim(),
            type: type,
          },
          headers:headers
        }
      )
      .then((res) => {

        if (type === "nokp") {
          searchType = "No Kad Pengenalan";

          if (res.data.status === "FAILED") {
            setDisplay(false);
            swal("Tidak ditemui", searchType + " tidak ditemui", "error");
          } else {
            if (res.data.length > 2) {
              NoScroll.on();
            } else {
              NoScroll.off();
            }
            setBill(res.data);
            // setArray(res.data);
            setDisplay(true);
          }
        }

        if (type === "akaun") {
          searchType = "Akaun";

          if (res.data.status === "FAILED") {
            setDisplay(false);
            swal("Tidak ditemui", searchType + " tidak ditemui", "error");
          } else {
            if (res.data.length > 2) {
              NoScroll.on();
            } else {
              NoScroll.off();
            }
            setBill(res.data[0]);
            // setArray(res.data[0]);
            setDisplay(true);
          }
        }

        if (type === "ssm") {
          searchType = "No SSM";
          res = res.data;

          if (res.status === "FAILED") {
            setDisplay(false);
            swal("Tidak ditemui", searchType + " tidak ditemui", "error");
          } else {
            setBill(res);
            // setArray(res);
            setDisplay(true);
          }
        }
        setLoading(false);
      });
  };

  const addAll = () => {


    var formdata = new FormData();
    formdata.append("type", type);
    formdata.append("nokp", nokp);
    formdata.append("search", search.trim());

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
      headers:myHeaders
    };

    var urlAPI1 =
      SERVER_URL+"int/api_generator.php?api_name=addAll";

    fetch(urlAPI1, requestOptions)
      .then((response) => response.json())
      .then((result) => {

        if(result.status == "success"){
            toaster.success('Berjaya tambah akaun untuk pembayaran.',{id:"forbidden-action"});
            setTimeout(function(){window.location.href = '/cukaitaksiran'; }, 1000);
          }
      });
  };

  const handleAdd = (status,account) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('nokp',nokp);
    formData.append('account',account);
    formData.append('status',status);

    Axios.post(SERVER_URL+"int/api_generator.php?api_name=newBill",formData, {headers:headers})
    .then(res => {

        if(res.data.status === "success")
        {
            toaster.success('Berjaya tambah akaun untuk pembayaran.',{id:"forbidden-action"})
            setTimeout(function(){window.location.href = '/cukaitaksiran'; }, 1000);
            
        }
        else if(res.data.status === "failure")
        {
            toaster.danger("Akaun ini telah didaftarkan ke senarai bayaran anda.",{id:"forbidden-action"});
        }
        else
        {
            toaster.danger('Maaf. Sila hubungi bahagian pihak pentadbiran.',{id:"forbidden-action"});
        }

        setLoading(false);
    })
    .catch(err =>{
        toaster.danger('Ralat! Sila hubungi pentadbir sistem.',{id:"forbidden-action"});
    });
}

const handleChoose = (e,x) => {
  
  let newArray = [...array];
  let index = newArray.findIndex(element => element.account === x);
  if(index !== -1){
      newArray.splice(index,1);
      setArray(newArray);
  }
  else{
    setArray( array => [...array,{'account':x,'status':e}])
  }
}


const handleAddThis = (e) => {
  if(array.length > 0){
    let accountObj = JSON.stringify(array);
    let formData = new FormData();
    formData.append('nokp',nokp);
    formData.append('account',accountObj);

    Axios.post(SERVER_URL+"int/api_generator.php?api_name=newBill&mode=many",formData, {headers:headers})
    .then(res => {

      if(res.data.status === "success")
      {
          toaster.success('Berjaya tambah akaun untuk pembayaran.',{id:"forbidden-action"})
          setTimeout(function(){window.location.href = '/cukaitaksiran'; }, 1000);
          
      }
      else if(res.data.status === "failure")
      {
          toaster.danger("Akaun ini telah didaftarkan ke senarai bayaran anda.",{id:"forbidden-action"});
      }
      else
      {
          toaster.danger('Maaf. Sila hubungi bahagian pihak pentadbiran.',{id:"forbidden-action"});
      }

      setLoading(false);
  })
  .catch(err =>{
      toaster.danger('Ralat! Sila hubungi pentadbir sistem.',{id:"forbidden-action"});
  });
  }
  else{
    toaster.danger('Tiada bil dipilih! Sila pilih bil terlebih dahulu.',{id:"forbidden-action"});
  }
}

const resetArray = (e) => {
  setArray([]);
}

  if (type === "" || type === null || type == "tiada") {
    return <div></div>;
  } else {
    return (
      <div>
        {/* Header */}
        <div className="relative pb-4 ">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="flex flex-wrap">
              <div className="w-full">
                <Pane display="flex">
                  <TextInputField
                    width="100%"
                    required
                    onChange={(e) => handleChange(e)}
                    label={
                      type === "akaun"
                        ? "Nombor Akaun"
                        : type === "ssm"
                        ? "Nombor ROC/ROB Syarikat"
                        : type === "nokp"
                        ? "Nombor Kad Pengenalan"
                        : "Carian..."
                    }
                    description={
                      type === "akaun"
                        ? "Lengkapkan maklumat nombor akaun dibawah."
                        : type === "ssm"
                        ? "Lengkapkan nombor ROC/ROB syarikat dibawah."
                        : type === "nokp"
                        ? "Lengkapkan nombor kad pengenalan dibawah"
                        : "Carian..."
                    }
                    placeholder={
                      type === "akaun"
                        ? "cth: 1234567"
                        : type === "ssm"
                        ? "cth 123456-X"
                        : type === "nokp"
                        ? "cth: 901212059876"
                        : "Carian..."
                    }
                  />
                </Pane>
                <Pane>
                  <Button
                    type="submit"
                    iconBefore={SearchIcon}
                    appearance="primary"
                    intent="success"
                    className="float-right"
                  >
                    {loading ? "Mencari.." : "Cari"}
                  </Button>

                  <Button
                    type="button"
                    iconBefore={ArrowLeftIcon}
                    appearance="primary"
                    intent="danger"
                    onClick={() => window.history.back()}
                  >
                    Kembali
                  </Button>
                </Pane>
                <Pane marginTop={5}  background="#fff">
                    {bill.length > 1 ? (
                      <>
                        <Button
                          type="button"
                          onClick={() => resetArray()}
                          appearance="primary"
                          intent="warning"
                          className=""
                        >
                          Set Semula
                        </Button>
                        <Button
                          type="button"
                          onClick={() => addAll()}
                          appearance="primary"
                          className="float-right"
                        >
                          {loading ? "Menambah.." : "Tambah Semua"}
                        </Button>
                        <Button
                          type="button"
                          onClick={() => handleAddThis()}
                          appearance="primary"
                          className="float-right mr-2"
                        >
                          {loading ? "Menambah.." : "Tambah "+array.length+" Bil"}
                        </Button>
                      </>
                    ) : (
                      ""
                    )}
                </Pane>

                <Pane marginTop={10} padding={10} background="#2d3436">
                  <Heading size={400} textAlign="center" color="white">
                    Senarai bil akan dipaparkan dibawah
                  </Heading>
                </Pane>
              </div>
            </div>
          </form>
        </div>
        <div
          className="relative pb-4 overflow-y-scroll"
          style={{ height: "250px" }}
        >
          <div className="flex flex-wrap">
            <div className="w-full">
              <Pane background="tint1">
                {
                  <Carian
                    className="bg-gray-100"
                    bill={bill}
                    type={type}
                    display={display}
                    handleAdd={ bill.length > 1 ? handleChoose : handleAdd }
                    array={array}
                  />
                }
              </Pane>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
