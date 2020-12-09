import react, { useState } from "react";
import { setUserSession } from './Utils/Common';
import logo1 from "./assets/img/logo1.png";
import ReCAPTCHA from "react-google-recaptcha";
import noScroll from "no-scroll";
import IndexNavbar from "./components/Navbars/IndexNavbar2.js";
import Footer from "./components/Footers/Footer";
import swal from "sweetalert";
import { Button, Heading, Pane, ArrowLeftIcon, ArrowRightIcon } from "evergreen-ui";

function onChange(value) {
    console.log("Captcha value:", value);
}

function ForgetPassword(props) {

    noScroll.on();

    const username = useFormInput("");

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleForgetPassword = () => {
        setError(null);
        setLoading(true);

        if (username.value == "") {

            swal("Opss!", "Emel tidak boleh dikosongkan.", "error");
            setLoading(false);

        } else {

            var formdata = new FormData();
            formdata.append("username", username.value);

            var requestOptions = {
                method: 'POST',
                body: formdata,
                redirect: 'follow'
            };

            var urlAPI1 = "https://mymps.corrad.my/int/api_generator.php?api_name=change_password";

            fetch(urlAPI1, requestOptions)
                .then(response => response.json())
                .then(result => {

                    setLoading(false);

                    if (result.status == "unsuccess") {
                        console.log(result);
                        swal("Opss!", "Sila pastikan emel anda telah diisi dan sah.", "error");
                        return false;
                    }
                    else if (result.status == "pending") {
                        console.log(result);
                        swal("Harap Maaf!", "Akaun ini mesti menunggu 10 minit sebelum ingin menukar kata laluan yang baru.", "error");
                        return false;
                    }
                    else if (result.status == "success") {
                        console.log(result);
                        swal("Berjaya", "Sila semak emel anda untuk mendapatkan kata laluan yang baharu.", "success");
                        props.history.push("/login");
                    }

                })
                .catch(error => {

                    console.log(error);
                    swal("Opss!", "Something went wrong. Please contact your administrator!", "error")
                        .then((value) => {
                            //props.history.push('/');
                        })

                });
        }


    }

    return (
        <div className="bg-gray">
            <IndexNavbar fixed />
            <section className="py-15 px-5 relative" style={{ background: "rgb(34,81,122)", background: "linear-gradient(90deg, rgba(34,81,122,1) 0%, rgba(27,147,171,1) 100%)" }}>
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
                                    Set Semula Kata Laluan
                                </Heading>
                            </Pane>
                        </div>
                        <form className="mt-8">
                            <input type="hidden" name="remember" value="true" />
                            <div className="rounded-md shadow-sm">
                                <div>
                                    <input aria-label="username" {...username} name="username" type="username" required className="mb-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5" placeholder="Sila masukkan alamat emel anda" />
                                </div>
                            </div>

                            <div className="flex flex-wrap" style={{ marginTop: "30px" }}>
                                <div className="w-full lg:w-6/12 px-1">
                                    <div className="relative w-full mb-3">
                                        <Button iconBefore={ArrowLeftIcon} onClick={() => window.location.href = "/login"} type="button" appearance="primary" intent="danger" display="flex" justifyContent="center" width="100%">Kembali</Button>
                                    </div>
                                </div>
                                <div className="w-full lg:w-6/12 px-1">
                                    <div className="relative w-full mb-3">
                                        <Button iconBefore={ArrowRightIcon} type="button" onClick={handleForgetPassword} appearance="primary" intent="success" display="flex" justifyContent="center" width="100%">{loading ? 'Memuatkan...' : 'Hantar'}</Button>
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