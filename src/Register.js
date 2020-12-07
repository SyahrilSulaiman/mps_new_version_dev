import React, { useState, useEffect } from "react";
import { setUserSession } from "./Utils/Common";
import IndexNavbar from "./components/Navbars/IndexNavbar2.js";
import Footer from "./components/Footers/Footer";
import { Button, Heading, Strong, Link, TextInput } from "evergreen-ui";
import swal from "sweetalert";
import { title, subtitle } from "./Constants";
import { isNumber } from "@material-ui/data-grid";

function Register(props) {

  sessionStorage.removeItem('GoogleToken');
  sessionStorage.removeItem('GoogleEmail');
  sessionStorage.removeItem('GoogleName');


  const username = useFormInput("");
  const password = useFormInput("");
  const confpassword = useFormInput("");
  const email = useFormInput("");
  const confemail = useFormInput("");
  const [nokp, setNOKP] = useState("");
  const ssm = useFormInput("");
  const notel = useFormInput("");
  const color = "blue";

  var numbers = /^[0-9]+$/;

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);


  const isNumber = (id, value) => {
    if(!value.match(numbers)){
      document.getElementById(id).value = "";
    }
  }

  const handleRegisterIndividu = (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (username.value == "") {
      swal("Opss!", "Sila masukkan kata nama anda.", "error");
      return false;
    }
    else if (nokp == "") {
      swal("Opss!", "Sila masukkan nombor kad pengenalan anda.", "error");
      return false;
    }
    else if (nokp.length < 12 || nokp.length > 12) {
      swal("Opss!", "No kad pengenalan yang anda masuk tidak sah.", "error");
      return false;
    }
    else if (!nokp.match(numbers)) {
      swal("Opss!", "No kad pengenalan yang anda masuk tidak sah.", "error");
      return false;
    }
    else if (email.value == "") {
      swal("Opss!", "Sila masukkan emel anda.", "error");
      return false;
    }
    else if (email.value !== confemail.value) {
      swal("Opss!", "Sila pastikan emel dan emel pengesahan sah.", "error");
      return false;
    }
    else if (password.value == "") {
      swal("Opss!", "Sila masukkan kata laluan anda.", "error");
      return false;
    }
    else if (password.value !== confpassword.value) {
      swal("Opss!", "Sila pastikan kataluan dan sah kata laluan sama.", "error");
      return false;
    }
    else if (!String(password).match(/[a-zA-z]/g) || !String(password).match(/\b/g) || password.value.length < 8) {
      swal("Opss!", "Kata laluan anda tidak selamat. Sekurang-kurangnya mempunyai  lapan (8) akrasa, dan mesti terdiri daripada kombinasi huruf dan nombor", "error");
      return false;
    }
    else {

      if (nokp.match(numbers)) {

        var formdata = new FormData();
        formdata.append("username", username.value);
        formdata.append("password", password.value);
        formdata.append("email", email.value);
        formdata.append("nokp", nokp);
        formdata.append("notel", notel.value);
        formdata.append("type", "individu");

        var requestOptions = {
          method: 'POST',
          body: formdata,
          redirect: 'follow'
        };

        var urlAPI = "https://mymps.corrad.my/int/api_generator.php?api_name=daftar_pengguna";

        fetch(urlAPI, requestOptions)
          .then(response => response.json())
          .then(result => {

            if (result.status == "success") {

              setLoading("false");
              swal("Tahniah!", "Pendaftaran sebagai pengguna MyMPS berjaya! Sila sahkan akaun anda sebagai pengguna melalui klik pada pautan di emel anda.", "success");

              setUserSession(btoa(formdata), username.value, nokp, email.value);
              sessionStorage.setItem("notel", notel.value);
              window.location.href = "/bill";

            } else {
              setLoading("false");
              swal("Ralat!", "Pendaftaran pengguna tidak berjaya!", "error");

            }

          })

      }
    }
  };

  const handleRegisterSyarikat = (e) => {

    e.preventDefault();
    setError(null);
    setLoading(true);

    if (username.value == "") {
      swal("Opss!", "Sila masukkan nama syarikat anda.", "error");
      return false;
    }
    else if (ssm.value == "") {
      swal("Opss!", "Sila masukkan nombor pendaftaran syarikat anda.", "error");
      return false;
    }
    else if (email.value == "") {
      swal("Opss!", "Sila masukkan emel anda.", "error");
      return false;
    }
    else if (email.value !== confemail.value) {
      swal("Opss!", "Sila pastikan emel dan emel pengesahan sah.", "error");
      return false;
    }
    else if (password.value == "") {
      swal("Opss!", "Sila masukkan kata laluan anda.", "error");
      return false;
    }
    else if (password.value !== confpassword.value) {
      swal("Opss!", "Sila pastikan kataluan dan sah kata laluan sama.", "error");
      return false;
    }
    else if (!String(password).match(/[a-zA-z]/g) || !String(password).match(/\b/g) || password.value.length < 8) {
      swal("Opss!", "Kata laluan anda tidak selamat. Sekurang-kurangnya mempunyai  lapan (8) akrasa, dan mesti terdiri daripada kombinasi huruf dan nombor", "error");
      return false;
    }
    else {

      if (1) {

        var formdata = new FormData();
        formdata.append("username", username.value);
        formdata.append("password", password.value);
        formdata.append("email", email.value);
        formdata.append("nokp", ssm.value);
        formdata.append("notel", notel.value);
        formdata.append("type", "syarikat");

        var requestOptions = {
          method: 'POST',
          body: formdata,
          redirect: 'follow'
        };

        var urlAPI = "https://mymps.corrad.my/int/api_generator.php?api_name=daftar_pengguna";

        fetch(urlAPI, requestOptions)
          .then(response => response.json())
          .then(result => {

            if (result.status == "success") {

              setLoading("false");
              //swal("Tahniah!", "Pendaftaran sebagai pengguna MyMPS berjaya! Sila sahkan akaun anda sebagai pengguna melalui klik pada pautan di emel anda.", "success");

              setUserSession(btoa(formdata), username.value, ssm.value, email.value);
              sessionStorage.setItem("notel", notel.value);
              window.location.href = "/bill";

            } else {
              setLoading("false");
              swal("Ralat!", "Pendaftaran pengguna tidak berjaya!", "error");

            }

          })

      }
    }
  }

  const [openTab, setOpenTab] = React.useState(1);

  return (
    <div className="bg-gray">
      <IndexNavbar fixed />


      <section className="py-20 relative" style={{ background: "rgb(34,81,122)", background: "linear-gradient(90deg, rgba(34,81,122,1) 0%, rgba(27,147,171,1) 100%)" }}>

        <div class="bg-grey-lighter min-h-screen flex flex-col">
          <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
            <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">

              <Heading
                textAlign="center"
                top={20}
                size={600}
              >
                Pendaftaran Pengguna {title}
              </Heading>
              {/* <h1 class="mb-8 text-xl text-gray-700 text-center mt-6" style={{ marginTop: "30px" }}>Pendaftaran Pengguna MyMPS</h1> */}

              <div className="flex flex-wrap p-2" style={{ marginTop: "30px" }}>
                <div className="w-full">
                  <ul
                    className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
                    role="tablist"
                  >
                    <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                      <a
                        className={
                          "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                          (openTab === 1
                            ? "text-white bg-" + color + "-600"
                            : "text-" + color + "-600 bg-white")
                        }
                        onClick={e => {
                          e.preventDefault();
                          setOpenTab(1);
                        }}
                        data-toggle="tab"
                        href="#link1"
                        role="tablist"
                      >
                        Individu
                            </a>
                    </li>
                    <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                      <a
                        className={
                          "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                          (openTab === 2
                            ? "text-white bg-" + color + "-600"
                            : "text-" + color + "-600 bg-white")
                        }
                        onClick={e => {
                          e.preventDefault();
                          setOpenTab(2);
                        }}
                        data-toggle="tab"
                        href="#link2"
                        role="tablist"
                      >
                        Syarikat
                            </a>
                    </li>
                  </ul>
                  <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 rounded">
                    <div className="flex-auto">
                      <div className="tab-content tab-space">
                        <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                          <form onSubmit={(e) => handleRegisterIndividu(e)}>
                            <div className="col-span-6 sm:col-span-3 p-2" style={{ marginTop: "30px" }}>
                              <label for="first_name" className="block text-sm font-medium leading-5 text-gray-700">Nama Penuh</label>
                              <input {...username} id="name" placeholder="cth: adrian" className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                            </div>

                            <div className="col-span-6 sm:col-span-3 p-2">
                              <label for="last_name" className="block text-sm font-medium leading-5 text-gray-700">Nombor Kad Pengenalan</label>
                              <input onChange={(e) => setNOKP(e.target.value)} onKeyUp={(e) => isNumber("nokp", e.target.value)} id="nokp" minLength="12" maxLength="12" placeholder="cth: 923456061278" className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                            </div>

                            <div className="col-span-6 sm:col-span-3 p-2">
                              <label for="street_address" className="block text-sm font-medium leading-5 text-gray-700">Nombor Telefon</label>
                              <input {...notel} onKeyUp={(e) => isNumber("notel", e.target.value)} maxLength={15} id="notel" placeholder="cth: 0123456789" className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                            </div>

                            <div className="col-span-6 sm:col-span-3 p-2">
                              <label for="email_address" className="block text-sm font-medium leading-5 text-gray-700">Alamat Emel</label>
                              <input {...email} id="email_address" placeholder="cth: malik@email.com" className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                            </div>

                            <div className="col-span-6 sm:col-span-3 p-2">
                              <label for="email_address" className="block text-sm font-medium leading-5 text-gray-700">Sah Alamat Emel</label>
                              <input {...confemail} id="conf_email_address" placeholder="cth: malik@email.com" className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                            </div>

                            <div className="col-span-6 sm:col-span-3 p-2">
                              <label for="street_address" className="block text-sm font-medium leading-5 text-gray-700">Kata Laluan</label>
                              <input {...password} type="password" id="password" placeholder="cth: 12345678" className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                            </div>

                            <div className="col-span-6 sm:col-span-3 p-2">
                              <label for="street_address" className="block text-sm font-medium leading-5 text-gray-700">Sah Kata Laluan</label>
                              <input {...confpassword} type="password" id="conf_password" placeholder="cth: 12345678" className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                            </div>

                            <div className="col-span-6 sm:col-span-3 p-2">
                              <Button
                                type="submit"
                                appearance="primary"
                                intent="success"
                                display="flex"
                                top={20}
                                justifyContent="center"
                                width="100%"
                              >
                                Daftar Pengguna
                            </Button>
                            </div>
                            <div className="col-span-6 sm:col-span-3 p-2">
                              <Button
                                type="button"
                                appearance="primary"
                                intent="danger"
                                display="flex"
                                top={20}
                                justifyContent="center"
                                width="100%"
                                onClick={() => window.location.href = "/"}
                              >
                                Kembali
                            </Button>
                            </div>
                          </form>
                        </div>
                        <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                          <form onSubmit={(e) => handleRegisterSyarikat(e)}>
                            <div className="col-span-6 sm:col-span-3 p-2" style={{ marginTop: "30px" }}>
                              <label for="first_name" className="block text-sm font-medium leading-5 text-gray-700">Nama Penuh (Wakil Syarikat)</label>
                              <input {...username} id="name" placeholder="cth: adrian" className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                            </div>

                            <div className="col-span-6 sm:col-span-3 p-2">
                              <label for="last_name" className="block text-sm font-medium leading-5 text-gray-700">Nombor ROB / ROC Syarikat </label>
                              <input {...ssm} id="ssm" placeholder="cth: A450P45" className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                            </div>

                            <div className="col-span-6 sm:col-span-3 p-2">
                              <label for="street_address" className="block text-sm font-medium leading-5 text-gray-700">Nombor Telefon</label>
                              <input {...notel} onKeyUp={(e) => isNumber("notel2", e.target.value)} maxLength={15} id="notel2" placeholder="cth: 0123456789" className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                            </div>

                            <div className="col-span-6 sm:col-span-3 p-2">
                              <label for="email_address" className="block text-sm font-medium leading-5 text-gray-700">Alamat Emel</label>
                              <input {...email} id="email_address" placeholder="cth: malik@email.com" className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                            </div>

                            <div className="col-span-6 sm:col-span-3 p-2">
                              <label for="email_address" className="block text-sm font-medium leading-5 text-gray-700">Sah Alamat Emel</label>
                              <input {...confemail} id="conf_email_address" placeholder="cth: malik@email.com" className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                            </div>

                            <div className="col-span-6 sm:col-span-3 p-2">
                              <label for="street_address" className="block text-sm font-medium leading-5 text-gray-700">Kata Laluan</label>
                              <input {...password} type="password" id="password" placeholder="cth: 12345678" className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                            </div>

                            <div className="col-span-6 sm:col-span-3 p-2">
                              <label for="street_address" className="block text-sm font-medium leading-5 text-gray-700">Sah Kata Laluan</label>
                              <input {...confpassword} type="password" id="conf_password" placeholder="cth: 12345678" className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                            </div>

                            <div className="col-span-6 sm:col-span-3 p-2">
                              <Button
                                type="submit"
                                appearance="primary"
                                intent="success"
                                display="flex"
                                top={20}
                                justifyContent="center"
                                width="100%"
                              >
                                Daftar Pengguna
                            </Button>
                            </div>
                            <div className="col-span-6 sm:col-span-3 p-2">
                              <Button
                                type="button"
                                appearance="primary"
                                intent="danger"
                                display="flex"
                                top={20}
                                justifyContent="center"
                                width="100%"
                                onClick={() => window.location.href = "/"}
                              >
                                Kembali
                            </Button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-6 sm:col-span-3 p-2">
                <Heading
                  justifyContent="center"
                  alignContent="center"
                  textAlign="center"
                  size={400}
                >
                  Dengan mendaftar, anda bersetuju pada <a class="no-underline border-grey-dark text-grey-dark"> terma & syarat </a> {title}
                </Heading>
              </div>

              <div className="col-span-6 sm:col-span-3 p-2">
                <Heading
                  justifyContent="center"
                  alignContent="center"
                  textAlign="center"
                  top={100}
                  size={200}
                >
                  Sudah mempunyai akaun? tekan <Link href="/login" style={{ textDecoration: "none" }}><i className="fas fa-sign-in-alt"></i></Link>
                </Heading>
              </div>

              {/* <div class="text-center text-grey-dark mt-6">
                <a href="/login" className="font-extra-small text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                  Sudah mempunyai akaun? Log Masuk
                      </a>
              </div> */}

            </div>


          </div>
        </div>


      </section>

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
