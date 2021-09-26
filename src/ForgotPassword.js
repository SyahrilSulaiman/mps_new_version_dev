import react, { useState, useContext } from "react";
import { TRANSLATION } from './Translation';
import { ContextHandler } from './contexts/ContextHandler';
import { setUserSession } from './Utils/Common';
import logo1 from "./assets/img/logo1.png";
import noScroll from "no-scroll";
import IndexNavbar from "./components/Navbars/IndexNavbar2.js";
import Footer from "./components/Footers/Footer";
import swal from "sweetalert";
import { Button, Heading, Pane, ArrowLeftIcon, ArrowRightIcon } from "evergreen-ui";
import { captchaToken, SERVER_URL } from './Constants';
import ReCAPTCHA from "react-google-recaptcha";

function onChange(value) {
    console.log("Captcha value:", value);
}

function ForgetPassword(props) {
    const {language} = useContext(ContextHandler)
    noScroll.on();

    const username = useFormInput("");

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [token, setToken]     = useState(null)

    const onChange = (value) => {
      setToken(value);
    }
    const handleForgetPassword = () => {
        setError(null);
        setLoading(true);

        if (username.value == "") {

            swal("Opss!", TRANSLATION[language].MESSAGE.emptyEmailErrorMessage, "error");
            setLoading(false);

        }
        else if(token === "" || token === null){
            swal("Opss!", TRANSLATION[language].MESSAGE.captchaErrorMessage, "error");
            return false;
        }
        else {

            var formdata = new FormData();
            formdata.append("username", username.value);

            var requestOptions = {
                method: 'POST',
                body: formdata,
                redirect: 'follow'
            };

            var urlAPI1 = SERVER_URL+"int/api_generator.php?api_name=change_password";

            fetch(urlAPI1, requestOptions)
                .then(response => response.json())
                .then(result => {

                    setLoading(false);

                    if (result.status == "unsuccess") {
                        console.log(result);
                        swal("Opss!", TRANSLATION[language].MESSAGE.emptyEmailErrorMessage, "error");
                        return false;
                    }
                    else if (result.status == "pending") {
                        console.log(result);
                        swal("Harap Maaf!", TRANSLATION[language].MESSAGE.resetPasswordWaitingMessage, "error");
                        return false;
                    }
                    else if (result.status == "success") {
                        console.log(result);
                        swal("Berjaya", TRANSLATION[language].MESSAGE.emailCheckMessage, "success");
                        props.history.push("/login");
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
                                >
                                    {TRANSLATION[language].FORGOT.TITLE}
                                </Heading>
                            </Pane>
                        </div>
                        <form className="mt-8">
                            <input type="hidden" name="remember" value="true" />
                            <div className="rounded-md shadow-sm">
                                <div>
                                    <input aria-label="username" {...username} name="username" type="username" required className="mb-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5" placeholder={TRANSLATION[language].FORGOT.SUBTITLE} />
                                </div>
                            </div>
                            <Pane alignItems="center" justifyContent="center" display="flex" paddingTop={10}>
                                <ReCAPTCHA
                                    sitekey={captchaToken}
                                    onChange={onChange}
                                />
                            </Pane>
                            <div className="flex flex-wrap" style={{ marginTop: "30px" }}>
                                <div className="w-full lg:w-6/12 px-1">
                                        <div className="relative w-full mb-3">
                                            <Button iconAfter={ArrowRightIcon} type="button" onClick={handleForgetPassword} appearance="primary" intent="success" display="flex" justifyContent="center" width="100%">{loading ? 'Memuatkan...' : 'Hantar'}</Button>
                                        </div>
                                    </div>
                                <div className="w-full lg:w-6/12 px-1">
                                    <div className="relative w-full mb-3">
                                        <Button iconBefore={ArrowLeftIcon} onClick={() => window.location.href = "/login"} type="button" appearance="primary" intent="danger" display="flex" justifyContent="center" width="100%">Kembali</Button>
                                    </div>
                                </div>
                            </div>
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

export default ForgetPassword;