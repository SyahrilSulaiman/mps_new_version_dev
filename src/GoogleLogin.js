import React, { useState } from "react";
import axios from "axios";
import { setUserSession } from "./Utils/Common";
import logo1 from "./assets/img/logo1.png";

import { getGoogleToken, getGoogleEmail, getGoogleName} from "./Utils/Common";

import IndexNavbar from "./components/Navbars/IndexNavbar2.js";
import Footer from "./components/Footers/Footer";
import swal from "sweetalert";
import { SERVER_URL } from './Constants';

function Register(props) {

  const googleemail = getGoogleEmail();
  const googlename = getGoogleName();

  const username = getGoogleName();
  const password = useFormInput("");
  const confpassword = useFormInput("");
  const email = getGoogleEmail();
  const confemail = useFormInput("");
  const nokp = useFormInput("");
  var numbers = /^[0-9]+$/;

  const [error, setError]     = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = () => {
    
    setError(null);
    setLoading(true);

    if(username.value == "")
    {
      swal("Opss!", "Sila masukkan kata nama anda.","error");
      return false;
    }
    else if(nokp.value == "")
    {
      swal("Opss!", "Sila masukkan nombor kad pengenalan anda.","error");
      return false;
    }
    else if(nokp.value.length < 12 || nokp.value.length > 12){
      swal("Opss!", "No kad pengenalan yang anda masuk tidak sah.","error");
      return false;
    }
    else if(!nokp.value.match(numbers)){
      swal("Opss!", "No kad pengenalan yang anda masuk tidak sah.","error");
      return false;
    }
    else if(email.value == "")
    {
      swal("Opss!", "Sila masukkan emel anda.", "error");
      return false;
    }
    else if(email.value !== confemail.value){
      swal("Opss!", "Sila pastikan emel dan emel pengesahan sah.", "error");
      return false;
    }
    else if(password.value == "")
    {
      swal("Opss!", "Sila masukkan kata laluan anda.", "error");
      return false;
    }
    else if(password.value !== confpassword.value)
    {
      swal("Opss!", "Sila pastikan kataluan dan sah kata laluan sama.", "error");
      return false;
    }
    else if(password.value.length < 6)
    { 
      swal("Opss!", "Kata laluan anda tidak selamat. Sila cuba lagi.", "error");
      return false;
    }
    else{
      
      if(nokp.value.match(numbers)){
        
        var formdata = new FormData();
        formdata.append("username", username.value);
        formdata.append("password", password.value);
        formdata.append("email", email.value);
        formdata.append("nokp", nokp.value);

        var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
        };

        var urlAPI = SERVER_URL+"int/api_generator.php?api_name=daftar_pengguna";

        fetch(urlAPI, requestOptions)
        .then(response => response.json())
        .then(result => {

          if(result.status == "success"){

            setLoading("false");
            swal("Tahniah!","Pendaftaran sebagai pengguna MyMPS berjaya!","success");

            setUserSession(btoa(formdata), username.value, nokp.value, email.value);
            props.history.push("/home");

          }else{
            setLoading("false");
            swal("Ralat!","Pendaftaran pengguna tidak berjaya!","error");
            
          }

        })

      }
    }

    // axios
    //   .post("https://apisim.mps.gov.my/api/mymps/akaunbyic?nokp=930420145231", {
    //     username: username.value,
    //     password: password.value,
    //   })
    //   .then((response) => {
    //     setLoading(false);
    //     setUserSession(response.data[0].NOAKAUN, response.data[0].NAMA_PEMILIK);

    //     console.log(response.data);
    //     props.history.push("/home");
    //   })
    //   .catch((error) => {
    //     setLoading(false);

    //     console.log("Something went wrong. Plese try again!");
    //     if (error.response.status === 401)
    //       setError(error.response.data.message);
    //     else setError("Something went wrong. Please try again later.");
    //   });
  };

  const handleNumber = () => {
    // console.log(username.value);
  };

  return (
    <div className="bg-gray">
      <IndexNavbar fixed />

      
      <section className="py-20 relative" style={{background: "rgb(34,81,122)", background: "linear-gradient(90deg, rgba(34,81,122,1) 0%, rgba(27,147,171,1) 100%)"}}>

      {/* sample form */}
      <div className=" sm:mt-0" style={{padding: "20px"}}>
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1 bg-gray-100" style={{padding: "20px", borderRadius: "10px"}}>
            <div className="px-4 sm:px-0">
              <img className="mx-auto" src={logo1} style={{width:"120px", height:"120px"}}/>
              <h3 className="text-lg font-medium leading-6 text-gray-900 text-center" style={{marginTop: "30px"}}>Pengesahan Pengguna</h3>
              <p className="mt-1 text-sm leading-5 text-gray-600" style={{marginTop: "30px"}}>
                Selamat Datang ke laman pengesahan pengguna Majlis Perbandaran Selayang 2020. Sila pastikan setiap maklumat diisi lengkap untuk mengelakkan maklumat palsu.
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">

                    <div className="col-span-6 sm:col-span-3">
                      <label for="first_name" className="block text-sm font-medium leading-5 text-gray-700">KATA PENGGUNA</label>
                      <input {...username} value={sessionStorage.getItem('GoogleName')} id="name" placeholder="cth: adrian" className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label for="last_name" className="block text-sm font-medium leading-5 text-gray-700">NO KAD PENGENALAN</label>
                      <input {...nokp} id="nokp" placeholder="cth: 923456061278" className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label for="email_address" className="block text-sm font-medium leading-5 text-gray-700">ALAMAT EMEL</label>
                      <input {...email} value={sessionStorage.getItem('GoogleEmail')} id="email_address" placeholder="cth: malik@email.com" className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label for="email_address" className="block text-sm font-medium leading-5 text-gray-700">SAH ALAMAT EMEL</label>
                      <input {...confemail} id="conf_email_address" placeholder="cth: malik@email.com" className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label for="street_address" className="block text-sm font-medium leading-5 text-gray-700">KATA LALUAN</label>
                      <input {...password} id="password" placeholder="cth: 12345678" className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label for="street_address" className="block text-sm font-medium leading-5 text-gray-700">SAH KATA LALUAN</label>
                      <input {...confpassword} id="conf_password" placeholder="cth: 12345678" className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 bg-gray-300">
                  <button onClick={handleRegister} type="button" className="py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-green-600 shadow-sm hover:bg-green-500 focus:outline-none focus:shadow-outline-blue active:bg-indigo-600 transition duration-150 ease-in-out">
                    Daftar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* sample form */}
      </section>

      {/* <section className="pb-16 bg-gray-300 relative pt-32">
        
      </section> */}

      <Footer />
    </div>
  );
}

const useFormInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return {
    value,
    onChange: handleChange,
  };
};

export default Register;
