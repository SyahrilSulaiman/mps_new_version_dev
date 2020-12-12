import React, {useState} from "react";
import swal from "sweetalert";
import { SERVER_URL } from '../../Constants';
// components

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

export default function CardSettings({notel=""}) {

  console.log(notel);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const username  = sessionStorage.getItem('username');
  const email     = sessionStorage.getItem('email');
  const nokp      = sessionStorage.getItem('nokp');

  const handleUpdate = () => {

    var username  = document.getElementById("username").value;
    var email     = document.getElementById("email").value;
    var notel     = document.getElementById("notel").value;

    if(username == "")
    {
      swal("Opss!", "Kata nama tidak boleh dikosongkan.","error");
      return false;
    }
    else if(email == "")
    {
      swal("Opss!", "Emel tidak boleh dikosongkan","error");
      return false;
    }
    else if(notel == "")
    { 
      swal("Opss!", "Nombor telefon tidak boleh dikosongkan","error");
      return false;
    }
    else
    {

      var formdata = new FormData();

        formdata.append("username", username.trim());
        formdata.append("email", email.trim());
        formdata.append("nokp", nokp);
        formdata.append("notel", notel.trim());

        var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
        };

        var urlAPI = SERVER_URL+"int/api_generator.php?api_name=update_profile";

        fetch(urlAPI, requestOptions)
        .then(response => response.json())
        .then(result => {

          if(result.status == "success"){

            setLoading("false");
            swal("Berjaya!","Akaun profil anda sudah dikemaskini.","success");

            sessionStorage.removeItem('username');
            sessionStorage.setItem('username', result.data[0]["U_USERNAME"]);

            sessionStorage.removeItem('email');
            sessionStorage.setItem('email', result.data[0]['U_USEREMAIL']);

            window.location.href = "./setting";

          }
          else
          {
            setLoading("false");
            swal("Ralat!","Kemaskini tidak berjaya.","error");
          }

        })
    }
  }

  const handleChangePassword = () => {

    swal({
      title:"Set Semula Kata Laluan",
      text:"Anda pasti untuk set semula kata laluan akaun anda?",
      button:true,
      dangerMode:true,
    }).then((change) => {
      if(change){
        swal("Kata laluan akaun anda sudah dikemaskini!");
      }else{
        
      }
    })
    
  }

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full h-full shadow-lg bg-gray-300 rounded-xl">
        <div className="rounded-t-xl bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-gray-800 text-xl font-bold">Akaun myMPS</h6>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form>
            <h6 className="text-blue-500 text-sm mt-3 mb-6 font-bold uppercase">
              
            </h6>
            <div className="flex flex-wrap">

              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Nama Penuh 
                  </label>
                  <input
                    type="text"
                    id="username"
                    {...username}
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                    defaultValue={sessionStorage.getItem("username")}
                  />
                </div>
              </div>

              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Alamat Emel
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...email}
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                    defaultValue={sessionStorage.getItem("email")}
                  />
                </div>
              </div>

              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block  text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Nombor Kad Pengenalan
                  </label>
                  <input
                    type="text"
                    {...nokp}
                    readOnly
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-gray-200 rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                    defaultValue={sessionStorage.getItem("nokp")}
                  />
                </div>
              </div>

              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Nombor Telefon
                  </label>
                  <input
                    type="text"
                    id="notel"
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                    defaultValue={notel}
                  />
                </div>
              </div>

            </div>

            <hr className="mt-6 border-b-1 border-gray-400" />

            <div className="flex flex-wrap mt-6">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <button type="button" onClick={handleUpdate} class="bg-green-500 hover:bg-green-700 text-white py-2 px-3 rounded float-right">
                    Kemaskini
                  </button>
                </div>
              </div>
            </div>
            
          </form>
        </div>
      </div>

      <div className="relative flex flex-col min-w-0 break-words w-full h-full shadow-lg  bg-gray-300 rounded-xl mt-5">
        <div className="rounded-t-xl bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-gray-800 text-xl font-bold">Tukar Kata Laluan</h6>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form>
            <h6 className="text-blue-500 text-sm mt-3 mb-6 font-bold uppercase">
              
            </h6>
            <div className="flex flex-wrap">

              <div className="w-full px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block  text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Kata Laluan Sekarang 
                  </label>
                  <input
                    type="text"
                    id="username"
                    {...username}
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>

              <div className="w-full px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block  text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Kata Laluan Baru
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...email}
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>

              <div className="w-full px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block  text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Pengesahan Kata Laluan
                  </label>
                  <input
                    type="text"
                    {...nokp}
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>

            </div>

            <hr className="mt-6 border-b-1 border-gray-400" />

            <div className="flex flex-wrap mt-6">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <button type="button" onClick={handleChangePassword} class="bg-green-500 hover:bg-green-700 text-white py-2 px-3 rounded float-right">
                    Kemaskini
                  </button>
                </div>
              </div>
            </div>
            
          </form>
        </div>
      </div>
    </>
  );
}
