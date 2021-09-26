import React, { useState, useContext } from "react";
import { setUserSession } from './Utils/Common';
import logo1 from "./assets/img/logo1.png";
import noScroll from "no-scroll";
import IndexNavbar from "./components/Navbars/IndexNavbar.js";
import swal from "sweetalert";
import { Button, Heading, Pane, ArrowLeftIcon, LogInIcon, Icon, EyeOpenIcon } from "evergreen-ui";
import Modal from './components/Modal/Install_Modal';
import {title, captchaToken, SERVER_URL} from "./Constants";
import ReCAPTCHA from "react-google-recaptcha";
import { TRANSLATION } from "./Translation.js";
import { ContextHandler } from "./contexts/ContextHandler.js";


function Login(props) {
    const {language} = useContext(ContextHandler)
    let url_string = window.location.href;
    const url = new URL(url_string);
    const c = url.searchParams.get('token');
    const [passwordShown,setPasswordShown] = useState(false);
    const [token, setToken]     = useState(null)

    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
      };

    const onChange = (value) => {
      setToken(value);
    }

    if (url.searchParams.get('token')) {

        var formdata = new FormData();
        formdata.append("emailToken", c);

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        var urlAPI1 = SERVER_URL+"int/api_generator.php?api_name=check_email_token";

        fetch(urlAPI1, requestOptions)
            .then(response => response.json())
            .then(result => {

                setLoading(false);

                if (result.status == "unsuccess") {
                    swal("Opss!", TRANSLATION[language].MESSAGE.loginFailMessage, "error");
                }
                else if (result.status == "success") {
                    setUserSession(btoa(result.data[0]), result.data[0]["U_USERNAME"], result.data[0]["U_USERIC"], result.data[0]["U_USEREMAIL"]);
                    sessionStorage.setItem("role", result.data[0]["U_USERROLE"]);
                    sessionStorage.setItem("notel", result.data[0]["U_USERPHONE"]);

                    if (result.data[0]['U_USERROLE'] == "Admin") {
                        props.history.push('/admin/usermanagement');
                    } else {
                        props.history.push('/bill');
                    }

                }

            })
            .catch(error => {

                console.log(error);
                swal("Opss!", TRANSLATION[language].MESSAGE.errorMessage, "error")
                    .then((value) => {
                        //props.history.push('/');
                    })

            });
    }


    noScroll.on();

    sessionStorage.removeItem('GoogleToken');
    sessionStorage.removeItem('GoogleEmail');
    sessionStorage.removeItem('GoogleName');

    const username = useFormInput("");
    const password = useFormInput("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const [showModal,setShowModal] = useState(false);

    const handleShow = (e) =>{
        setShowModal(true)
    }

    const handleHide = (e) => {
        setShowModal(false)
    }

    const handleLogin = (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        if (username.value == "" || password.value == "") {

            swal("Opss!", TRANSLATION[language].MESSAGE.loginFailMessage, "error");
            setLoading(false);

        }
        else if(token === "" || token === null){
            swal("Opss!", TRANSLATION[language].MESSAGE.captchaErrorMessage, "error");
            return false;
        }
        else {

            var sha256 = require('js-sha256');

            var formdata = new FormData();
            formdata.append("email", username.value.trim());
            formdata.append("password", sha256(password.value.trim()));

            var requestOptions = {
                method: 'POST',
                body: formdata,
                redirect: 'follow'
            };

            var urlAPI1 = SERVER_URL+"int/api_generator.php?api_name=api_login";

            fetch(urlAPI1, requestOptions)
                .then(response => response.json())
                .then(result => {
                    setLoading(false);

                    if (result.status == "unsuccess") {
                        swal("Opss!", TRANSLATION[language].MESSAGE.loginFailMessage, "error");
                    }
                    else if (result.status == "success") {
                        setUserSession(btoa(result.data[0]), result.data[0]["U_USERNAME"], result.data[0]["U_USERIC"], result.data[0]["U_USEREMAIL"]);
                        sessionStorage.setItem("role", result.data[0]["U_USERROLE"]);
                        sessionStorage.setItem("notel", result.data[0]["U_USERPHONE"]);
                        sessionStorage.setItem("access", result.data[0]["ACCESS_TOKEN"]);

                        if (result.data[0]['U_USERROLE'] == "Admin") {
                            props.history.push('/admin/usermanagement');
                        } else {
                            props.history.push('/bill');
                        }

                    }

                })
                .catch(error => {

                    console.log(error);
                    swal("Opss!", TRANSLATION[language].MESSAGE.errorMessage, "error")
                        .then((value) => {
                            console.log(error)
                        })

                });
        }
    }

    return (
        <div className="bg-gray">
            <IndexNavbar fixed />
            <section className="py-15 px-5 relative" style={{ background: "linear-gradient(90deg, rgba(34,81,122,1) 0%, rgba(27,147,171,1) 100%)" }}>
                <div className="min-h-screen flex items-center justify-center  px-4 sm:px-6">
                    <div className="max-w-md w-full" style={{ marginTop: "-100px" }}>
                        <div>
                            <img className="mx-auto w-auto" src={logo1} alt="mymps" style={{ height: "120px" }} />

                            <Pane marginTop={20}>
                            <Heading
                            textAlign="center"
                            size={600}
                            color="#E4E7EB"
                            >{TRANSLATION[language].LOGIN.TITLE}
                            </Heading>
                            </Pane>
                        </div>
                        <form className="mt-8" onSubmit={(e) => handleLogin(e)}>
                            <input type="hidden" name="remember" value="true" />
                            <div className="rounded-md shadow-sm">
                                <div>
                                    <input aria-label="Username" {...username} name="username" type="text" required className="mb-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5" placeholder={TRANSLATION[language].LOGIN.USERNAME} />
                                </div>
                                <div className="-mt-px">
                                    <div className="bg-white rounded-none relative block w-full  border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5">
                                        <input aria-label="Password" {...password} name="password" type={passwordShown ? 'text':'password' } className="px-3 py-2 w-11/12 appearance-none" required  placeholder={TRANSLATION[language].LOGIN.PASSWORD} />
                                        <Icon className={passwordShown ? "text-gray-400 hover:text-gray-700" : "text-gray-700 hover:text-gray-400"} onClick={togglePasswordVisiblity} icon={EyeOpenIcon} size={15} marginLeft={8}/>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex items-center justify-between">
                                <div className="text-sm leading-5">
                                    <a href="/register" className="font-medium text-gray-100 hover:text-gray-200 focus:outline-none focus:underline transition ease-in-out duration-150">
                                        <i className="fas fa-user"></i> {TRANSLATION[language].LOGIN.REGISTER_USER}
                                    </a>
                                </div>

                                <div className="text-sm leading-5">
                                    <a href="/forgotpassword" className="font-medium text-gray-100 hover:text-gray-200 focus:outline-none focus:underline transition ease-in-out duration-150">
                                    {TRANSLATION[language].LOGIN.FORGOT_PASSWORD}
                                    </a>
                                </div>
                            </div>
                            <Pane alignItems="center" justifyContent="center" display="flex" paddingTop={10}>
                                <ReCAPTCHA
                                    sitekey={captchaToken}
                                    onChange={onChange}
                                />
                            </Pane>
                            <div className="flex flex-wrap" style={{marginTop:"10px"}}>
                                <div className="w-full lg:w-6/12 px-1">
                                    <div className="relative w-full mb-3">
                                    <Button iconBefore={LogInIcon} type="submit" appearance="primary" intent="success" display="flex" justifyContent="center" width="100%">{loading ? TRANSLATION[language].CONSTANT.LOADING+"..." : TRANSLATION[language].CONSTANT.LOGIN}</Button>
                                    </div>
                                </div>
                                <div className="w-full lg:w-6/12 px-1">
                                    <div className="relative w-full mb-3">
                                    <Button iconBefore={ArrowLeftIcon} onClick={() => window.location.href = "/"} type="button" appearance="primary" intent="danger" display="flex" justifyContent="center" width="100%">{TRANSLATION[language].CONSTANT.BACK}</Button>
                                    </div>
                                </div>
                            </div>
                            <div className="items-center text-center text-indigo-100">
                                
                                <Heading size={400} color="white" onClick={handleShow} style={{cursor:"pointer"}}> {TRANSLATION[language].LOGIN.INSTRUCTION.SUBTITLE}</Heading>
                            </div>
                            {                            
                                // <SimpleModal />
                                showModal ? <Modal Close={handleHide}/> : ''
                            }                       
                        </form>
                    </div>
                </div>

            </section>
            {/* <Footer /> */}
        </div>
    )

}

const useFormInput = initialValue => {
    const [value, setValue] = useState(initialValue);

    const handleChange = e => {
        setValue(e.target.value);
    }
    return {
        value,
        onChange: handleChange
    }
}

export default Login;