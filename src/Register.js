import React, { useState, useContext } from "react";
import { TRANSLATION } from './Translation';
import { ContextHandler } from './contexts/ContextHandler';
import { setUserSession } from "./Utils/Common";
import IndexNavbar from "./components/Navbars/IndexNavbar2.js";
import { Button, Heading, Link, Pane, Icon, EyeOpenIcon } from "evergreen-ui";
import swal from "sweetalert2";
import { title, captchaToken, SERVER_URL } from "./Constants";
import ReCAPTCHA from "react-google-recaptcha";

function Register(props) {

  sessionStorage.removeItem('GoogleToken');
  sessionStorage.removeItem('GoogleEmail');
  sessionStorage.removeItem('GoogleName');
  const { language } = useContext(ContextHandler)


  const username = useFormInput("");
  const password = useFormInput("");
  const confpassword = useFormInput("");
  const email = useFormInput("");
  const confirm = useFormInput("");
  const [nokp, setNOKP] = useState("");
  const ssm = useFormInput("");
  const notel = useFormInput("");
  const color = "blue";

  var numbers = /^[0-9]+$/;

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [passwordShown2,setPasswordShown2] = useState(false);
  const [passwordShown,setPasswordShown] = useState(false);
  const [token, setToken]     = useState(null)

  const togglePasswordVisiblity = () => {
      setPasswordShown(passwordShown ? false : true);
    };
  const togglePasswordVisiblity2 = () => {
      setPasswordShown2(passwordShown2 ? false : true);
    };

  const onChange = (value) => {
    setToken(value);
  }

  const isNumber = (id, value) => {
    if(!value.match(numbers)){
      document.getElementById(id).value = "";
    }
  }

  const handleRegisterIndividu = (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if(token === "" || token === null){
      swal.fire("Opss!", TRANSLATION[language].MESSAGE.captchaErrorMessage, "error");
      return false;
    }
    else if (username.value === "") {
      swal.fire("Opss!", TRANSLATION[language].MESSAGE.emptyNameMessage, "error");
      return false;
    }
    else if (!username.value.match(/[0-9!"#$%&()*+,.:;<=>?[\\\]^_{|}~]/g) === false) {
      swal.fire("Opss!", TRANSLATION[language].MESSAGE.incorrectNameMessage, "error");
      return false;
    }
    else if (nokp === "") {
      swal.fire("Opss!", TRANSLATION[language].MESSAGE.emptyKPMessage, "error");
      return false;
    }
    else if (notel.length < 10 || notel.length > 11) {
      swal.fire("Opss!", TRANSLATION[language].MESSAGE.emptyPhoneMessage, "error");
      return false;
    }
    else if (nokp.length < 12 || nokp.length > 12) {
      swal.fire("Opss!", TRANSLATION[language].MESSAGE.emptyKPMessage, "error");
      return false;
    }
    else if (!nokp.match(numbers)) {
      swal.fire("Opss!", TRANSLATION[language].MESSAGE.emptyKPMessage, "error");
      return false;
    }
    else if (email.value === "") {
      swal.fire("Opss!", TRANSLATION[language].MESSAGE.emptyEmailMessage, "error");
      return false;
    }
    else if (email.value !== confirm.value) {
      swal.fire("Opss!", TRANSLATION[language].MESSAGE.incorrectEmailMessage, "error");
      return false;
    }
    else if (password.value === "") {
      swal.fire("Opss!", TRANSLATION[language].MESSAGE.emptyPasswordMessage, "error");
      return false;
    }
    else if (password.value !== confpassword.value) {
      swal.fire("Opss!", TRANSLATION[language].MESSAGE.incorrectPasswordMessage, "error");
      return false;
    }
    else if (!String(password).match(/[a-zA-z]/g) || !String(password).match(/\b/g) || password.value.length < 8) {
      swal.fire("Opss!", TRANSLATION[language].MESSAGE.unsafePasswordMessage, "error");
      return false;
    }
    else {

      if (nokp.match(numbers)) {

        var formdata = new FormData();
        formdata.append("username", username.value.trim());
        formdata.append("password", password.value.trim());
        formdata.append("email", email.value.trim());
        formdata.append("nokp", nokp.trim());
        formdata.append("notel", notel.value.trim());
        formdata.append("type", "individu");

        var requestOptions = {
          method: 'POST',
          body: formdata,
          redirect: 'follow'
        };

        var urlAPI = SERVER_URL+"int/api_generator.php?api_name=daftar_pengguna";

        fetch(urlAPI, requestOptions)
          .then(response => response.json())
          .then(result => {

            if (result.status.toLowerCase() === "success") {

              setLoading("false");
              setUserSession(btoa(formdata), username.value.trim(), nokp.trim(), email.value.trim());
              sessionStorage.setItem("notel", notel.value.trim());
              window.location.href = "/bill";

            } else {
              setLoading("false");
              swal.fire({ title: TRANSLATION[language].CONSTANT.ERROR,
                          html: TRANSLATION[language].MESSAGE.failedRegisterMessage+" "+result.error,
                          icon: "error"});
            }

          })

      }
    }
  };

  const handleRegisterSyarikat = (e) => {

    e.preventDefault();
    setError(null);
    setLoading(true);

    if(token === "" || token === null){
      swal.fire("Opss!", TRANSLATION[language].MESSAGE.captchaErrorMessage, "error");
      return false;
    }
    else if (username.value === "") {
      swal.fire("Opss!", TRANSLATION[language].MESSAGE.emptyCompanyNameMessage, "error");
      return false;
    }
    else if (!username.value.match(/[0-9!"#$%&()*+,.:;<=>?[\\\]^_{|}~]/g) === false) {
      swal.fire("Opss!",  TRANSLATION[language].MESSAGE.incorrectCompanyNameMessage, "error");
      return false;
    }
    else if (ssm.value === "") {
      swal.fire("Opss!", TRANSLATION[language].MESSAGE.emptySSMMessage, "error");
      return false;
    }
    else if (notel.length < 10 || notel.length > 11) {
      swal.fire("Opss!", TRANSLATION[language].MESSAGE.emptyPhoneMessage, "error");
      return false;
    }
    else if (email.value === "") {
      swal.fire("Opss!", TRANSLATION[language].MESSAGE.emptyEmailMessage, "error");
      return false;
    }
    else if (email.value !== confirm.value) {
      swal.fire("Opss!", TRANSLATION[language].MESSAGE.incorrectEmailMessage, "error");
      return false;
    }
    else if (password.value === "") {
      swal.fire("Opss!", TRANSLATION[language].MESSAGE.emptyPasswordMessage, "error");
      return false;
    }
    else if (password.value !== confpassword.value) {
      swal.fire("Opss!", TRANSLATION[language].MESSAGE.incorrectPasswordMessage, "error");
      return false;
    }
    else if (!String(password).match(/[a-zA-z]/g) || !String(password).match(/\b/g) || password.value.length < 8) {
      swal.fire("Opss!", TRANSLATION[language].MESSAGE.unsafePasswordMessage, "error");
      return false;
    }
    else {

      if (1) {

        var formdata = new FormData();
        formdata.append("username", username.value).trim();
        formdata.append("password", password.value.trim());
        formdata.append("email", email.value.trim());
        formdata.append("nokp", ssm.value.trim());
        formdata.append("notel", notel.value.trim());
        formdata.append("type", "syarikat");

        var requestOptions = {
          method: 'POST',
          body: formdata,
          redirect: 'follow'
        };

        var urlAPI = SERVER_URL+"int/api_generator.php?api_name=daftar_pengguna";

        fetch(urlAPI, requestOptions)
          .then(response => response.json())
          .then(result => {

            if (result.status.toLowerCase() === "success") {

              setLoading("false");
              setUserSession(btoa(formdata), username.value.trim(), ssm.value.trim(), email.value.trim());
              sessionStorage.setItem("notel", notel.value.trim());
              window.location.href = "/bill";

            } else {
              setLoading("false");
              swal.fire({ title: TRANSLATION[language].CONSTANT.ERROR,
                          html: TRANSLATION[language].MESSAGE.failedRegisterMessage + ' ' + result.error,
                          icon: "error"});
            }

          })

      }
    }
  }

  const [openTab, setOpenTab] = React.useState(1);

  return (
    <div className="bg-gray">
      <IndexNavbar fixed />


      <section className="py-20 relative" style={{ background: "linear-gradient(90deg, rgba(34,81,122,1) 0%, rgba(27,147,171,1) 100%)" }}>

        <div className="bg-grey-lighter min-h-screen flex flex-col">
          <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
            <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">

              <Heading
                textalign="center"
                top={20}
                size={600}
              >
                {TRANSLATION[language].REGISTER.TITLE}
              </Heading>

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
                        {TRANSLATION[language].CONSTANT.INDIVIDUAL}
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
                        {TRANSLATION[language].CONSTANT.COMPANY}
                            </a>
                    </li>
                  </ul>
                  <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 rounded">
                    <div className="flex-auto">
                      <div className="tab-content tab-space">
                        <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                          <form onSubmit={(e) => handleRegisterIndividu(e)}>
                            <div className="col-span-6 sm:col-span-3 p-2" style={{ marginTop: "30px" }}>
                              <label htmlFor="first_name" className="block text-sm font-medium leading-5 text-gray-700">{TRANSLATION[language].REGISTER.INDIVIDUAL.NAME}</label>
                              <input {...username} id="name" placeholder={TRANSLATION[language].CONSTANT.EXAMPLE+": adrian"} className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                            </div>

                            <div className="col-span-6 sm:col-span-3 p-2">
                              <label htmlFor="last_name" className="block text-sm font-medium leading-5 text-gray-700">{TRANSLATION[language].REGISTER.INDIVIDUAL.NOKP}</label>
                              <input onChange={(e) => setNOKP(e.target.value)} onKeyUp={(e) => isNumber("nokp", e.target.value)} id="nokp" minLength="12" maxLength="12" placeholder={TRANSLATION[language].CONSTANT.EXAMPLE+": 923456061278"} className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                            </div>

                            <div className="col-span-6 sm:col-span-3 p-2">
                              <label htmlFor="street_address" className="block text-sm font-medium leading-5 text-gray-700">{TRANSLATION[language].REGISTER.TEL}</label>
                              <input {...notel} onKeyUp={(e) => isNumber("notel", e.target.value)} maxLength={11} id="notel" placeholder={TRANSLATION[language].CONSTANT.EXAMPLE+": 0123456789"} className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                            </div>

                            <div className="col-span-6 sm:col-span-3 p-2">
                              <label htmlFor="email_address" className="block text-sm font-medium leading-5 text-gray-700">{TRANSLATION[language].REGISTER.EMAIL}</label>
                              <input {...email} id="email_address" placeholder={TRANSLATION[language].CONSTANT.EXAMPLE+": malik@email.com"} type="email" className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                            </div>

                            <div className="col-span-6 sm:col-span-3 p-2">
                              <label htmlFor="email_address" className="block text-sm font-medium leading-5 text-gray-700">{TRANSLATION[language].CONSTANT.CONFIRM+' '+TRANSLATION[language].REGISTER.EMAIL}</label>
                              <input {...confirm} id="conf_email_address" placeholder={TRANSLATION[language].CONSTANT.EXAMPLE+": malik@email.com"} type="email" className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                            </div>

                            <div className="col-span-6 sm:col-span-3 p-2">
                              <label htmlFor="street_address" className="block text-sm font-medium leading-5 text-gray-700">{TRANSLATION[language].REGISTER.PASSWORD.TITLE}</label>
                              <div className="rounded-none relative block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5">
                                <input {...password} type={passwordShown ? 'text':'password' } id="password" placeholder={TRANSLATION[language].CONSTANT.EXAMPLE+": 123@abcd"} className="form-input w-11/12 py-2 px-3 " />
                                <Icon className={passwordShown ? "text-gray-700 hover:text-gray-400" : "text-gray-400 hover:text-gray-700" } onClick={togglePasswordVisiblity} icon={EyeOpenIcon} size={15} marginRight={5}/>
                              </div>
                            </div>
                            <div className="col-span-6 sm:col-span-3 p-2">
                              <label htmlFor="street_address" className="block text-sm font-medium leading-5 text-gray-700">{TRANSLATION[language].CONSTANT.CONFIRM+' '+TRANSLATION[language].REGISTER.PASSWORD.TITLE}</label>
                              <div className="rounded-none relative block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5">
                                <input {...confpassword} type={passwordShown2 ? 'text':'password' } id="conf_password" placeholder={TRANSLATION[language].CONSTANT.EXAMPLE+": 123@abcd"} className="form-input w-11/12 py-2 px-3 " />
                                <Icon className={passwordShown2 ? "text-gray-700 hover:text-gray-400" : "text-gray-400 hover:text-gray-700" } onClick={togglePasswordVisiblity2} icon={EyeOpenIcon} size={15} marginRight={5}/>
                              </div>
                            </div>

                            <div className="col-span-6 sm:col-span-3 p-2">
                              <Heading
                                  justifycontent="center"
                                  aligncontent="center"
                                  textalign="left"
                                  top={100}
                                  size={200}
                                >
                                  {TRANSLATION[language].REGISTER.PASSWORD.SUBTITLE}
                                </Heading>
                            </div>
                            <div className="col-span-6 sm:col-span-3 p-2">
                              <Pane alignItems="center" justifyContent="center" display="flex" paddingBottom={2}>
                                <ReCAPTCHA
                                  sitekey={captchaToken}
                                  onChange={onChange}
                                />
                              </Pane>
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
                                {TRANSLATION[language].REGISTER.REGISTER_BUTTON}
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
                                {TRANSLATION[language].CONSTANT.BACK}
                            </Button>
                            </div>
                          </form>
                        </div>
                        <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                          <form onSubmit={(e) => handleRegisterSyarikat(e)}>
                            <div className="col-span-6 sm:col-span-3 p-2" style={{ marginTop: "30px" }}>
                              <label htmlFor="first_name" className="block text-sm font-medium leading-5 text-gray-700">{TRANSLATION[language].REGISTER.COMPANY.NAME}</label>
                              <input {...username} id="name" placeholder={TRANSLATION[language].CONSTANT.EXAMPLE+": adrian"} className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                            </div>

                            <div className="col-span-6 sm:col-span-3 p-2">
                              <label htmlFor="last_name" className="block text-sm font-medium leading-5 text-gray-700">{TRANSLATION[language].REGISTER.COMPANY.NOSSM}</label>
                              <input {...ssm} id="ssm" placeholder={TRANSLATION[language].CONSTANT.EXAMPLE+": 450045-A"} className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                            </div>

                            <div className="col-span-6 sm:col-span-3 p-2">
                              <label htmlFor="street_address" className="block text-sm font-medium leading-5 text-gray-700">{TRANSLATION[language].REGISTER.TEL}</label>
                              <input {...notel} onKeyUp={(e) => isNumber("notel2", e.target.value)} maxLength={11} id="notel2" placeholder={TRANSLATION[language].CONSTANT.EXAMPLE+": 0123456789"} className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                            </div>

                            <div className="col-span-6 sm:col-span-3 p-2">
                              <label htmlFor="email_address" className="block text-sm font-medium leading-5 text-gray-700">{TRANSLATION[language].REGISTER.EMAIL}</label>
                              <input {...email} id="email_address" placeholder={TRANSLATION[language].CONSTANT.EXAMPLE+": malik@email.com"} type="email" className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                            </div>

                            <div className="col-span-6 sm:col-span-3 p-2">
                              <label htmlFor="email_address" className="block text-sm font-medium leading-5 text-gray-700">{TRANSLATION[language].CONSTANT.CONFIRM+' '+TRANSLATION[language].REGISTER.EMAIL}</label>
                              <input {...confirm} id="conf_email_address" placeholder={TRANSLATION[language].CONSTANT.EXAMPLE+": malik@email.com"} type="email" className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                            </div>

                            <div className="col-span-6 sm:col-span-3 p-2">
                              <label htmlFor="street_address" className="block text-sm font-medium leading-5 text-gray-700">{TRANSLATION[language].REGISTER.PASSWORD.TITLE}</label>
                              <div className="rounded-none relative block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5">
                                <input {...password} type={passwordShown ? 'text':'password' } id="password" placeholder={TRANSLATION[language].CONSTANT.EXAMPLE+": 123@abcd"} className="form-input w-11/12 py-2 px-3 " />
                                <Icon className={passwordShown ? "text-gray-700 hover:text-gray-400" : "text-gray-400 hover:text-gray-700" } onClick={togglePasswordVisiblity} icon={EyeOpenIcon} size={15} marginRight={5}/>
                              </div>
                            </div>
                            <div className="col-span-6 sm:col-span-3 p-2">
                              <label htmlFor="street_address" className="block text-sm font-medium leading-5 text-gray-700">{TRANSLATION[language].CONSTANT.CONFIRM+' '+TRANSLATION[language].REGISTER.PASSWORD.TITLE}</label>
                              <div className="rounded-none relative block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5">
                                <input {...confpassword} type={passwordShown2 ? 'text':'password' } id="conf_password" placeholder={TRANSLATION[language].CONSTANT.EXAMPLE+": 123@abcd"} className="form-input w-11/12 py-2 px-3 " />
                                <Icon className={passwordShown2 ? "text-gray-700 hover:text-gray-400" : "text-gray-400 hover:text-gray-700" } onClick={togglePasswordVisiblity2} icon={EyeOpenIcon} size={15} marginRight={5}/>
                              </div>
                            </div>

                            <div className="col-span-6 sm:col-span-3 p-2">
                              <Heading
                                  justifycontent="center"
                                  aligncontent="center"
                                  textalign="left"
                                  top={100}
                                  size={200}
                                >
                                  {TRANSLATION[language].REGISTER.PASSWORD.SUBTITLE}
                                </Heading>
                            </div>
                            <div className="col-span-6 sm:col-span-3 p-2">
                              <Pane alignItems="center" justifyContent="center" display="flex" paddingBottom={2}>
                                <ReCAPTCHA
                                  sitekey={captchaToken}
                                  onChange={onChange}
                                />
                              </Pane>
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
                                {TRANSLATION[language].REGISTER.REGISTER_BUTTON}
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
                                {TRANSLATION[language].CONSTANT.BACK}
                            </Button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-6 sm:col-span-3 p-2 text-center">
                <Heading
                  size={400}
                >
                  {TRANSLATION[language].REGISTER.TERM}
                </Heading>
              </div>

              <div className="col-span-6 sm:col-span-3 p-2 text-center">
                <Heading
                  top={100}
                  size={200}
                >
                  {TRANSLATION[language].REGISTER.FOOTER} <Link href="/login" style={{ textDecoration: "none" }}><i className="fas fa-sign-in-alt"></i></Link>
                </Heading>
              </div>

              {/* <div className="text-center text-grey-dark mt-6">
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
