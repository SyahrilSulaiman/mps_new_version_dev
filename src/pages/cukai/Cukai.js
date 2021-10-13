import React,{ useState, useContext} from 'react'
import useFetch from '../../hooks/useFetch'
import Sidebar from "../../Sidebar"
import Navbar from "../../components/Navbars/AdminNavbar"
import Topbar from "../../Topbar2";
import swal from 'sweetalert2';
import { Heading, Spinner, Pane, Button, Text, Paragraph, majorScale, minorScale, Card, ArrowRightIcon,Icon , ChevronRightIcon, ArrowLeftIcon, toaster, DeleteIcon } from 'evergreen-ui';
import NumberFormat from 'react-number-format';
import { useHistory, useLocation } from "react-router-dom";
import { getNOKP, getEmail, setAuthorization, getAccessToken} from "../../Utils/Common";
import { SERVER_URL } from '../../Constants';
import { TRANSLATION } from '../../Translation';
import { ContextHandler } from "../../contexts/ContextHandler";

function Cukai() {
    const {language} = useContext(ContextHandler);

    const nokp = getNOKP();
    const email = getEmail();
    const accessToken = getAccessToken();
    const auth = setAuthorization(nokp,email);
    const abortCont = new AbortController()
    const history = useHistory()

    const [res, setRes] = useState(null)
    const [pending, setPending] = useState(true)
    const [isError, setIsError] = useState(null)

    const handleView = (e) => {
        window.location.href = SERVER_URL+"rp/bil_cukai_taksiran.php?noakaun=" + btoa(e)+"&token="+accessToken
    }

    const handleReceipt = (e) => {
        const url = SERVER_URL+'rp/resit.php?invoice=' + btoa(e)+"&token="+accessToken;
        window.location.href = SERVER_URL+'rp/resit.php?invoice=' + btoa(e)+"&token="+accessToken
    }

    const handleDelete = (e)  => {
        swal.fire({
            icon:'warning',
            title:'Hapus Bil',
            text:'Adakah anda pasti untuk memadam bil ini?',
            showCancelButton:true,
            focusConfirm:false,
            confirmButtonText:'Ya',
            confirmButtonColor:'#d33',
            cancelButtonText:'Tidak',
            cancelButtonColor:'#3a4',
            reverseButtons: true
        }).then( result => {
            if(result.isConfirmed){
                const headers = new Headers();
                const formData = new FormData();
                headers.append('TOKEN', auth);
                formData.append('user',nokp);
                formData.append('noakaun',e);

                const url = SERVER_URL+"int/api_generator.php?api_name=deleteV2&code="+location.state.data.CODE
                const requestOptions = {
                    method : 'POST',
                    redirect : 'follow',
                    body : formData,
                    headers : headers,
                    signal: abortCont.signal
                  }
                fetch(url, requestOptions)
                .then(res => {
                    if(!res.ok){
                        throw Error("Could't fetch response from the resource")
                    }
                    return res.json()
                })
                .then(response => {
                    setPending(false)
                    setRes(response)

                    if(response.status === 'success'){
                        swal.fire({
                            icon: 'success',
                            title: 'Berjaya',
                            text: 'Bil telah dihapuskan'
                        }).then(res => {
                            history.goBack();
                        })
                    }
                    else{
                        swal.fire({
                            icon: 'error',
                            title:'Ralat',
                            text:'Sila hubungi pentadbir system'
                        })
                    }
                })
                .catch(err => {
                    if(err.name === "AbortError"){
                        console.log("fetch aborted")
                    }
                    else{
                        setPending(false)
                        setIsError(err.message)
                        toaster.danger(err.message,{id:"forbidden-action"});
                    }
                })
            }
        })
    }

    const handlePayment = () => {
        history.push("/paymentV2", data)
    }

    const disabledButton = () => {
		toaster.danger("Fungsi belum diaktifkan.",{ description: "Harap maaf. Fungsi pembayaran belum diaktifkan.", id: "forbidden-action"});
	}

    const paidButton = () => {
		toaster.success("Bill telah dibayar",{ description: "Akaun ini telah dibayar", id: "forbidden-action"});
	}

    const location = useLocation();
    const data = location.state.data;
    const loading = false;
    const headers = new Headers()
    headers.append('TOKEN',auth)
    const formData = new FormData()
    formData.append('nokp',nokp)
    formData.append('account',data.NOAKAUN)

	const requestOptions = {
		method : 'POST',
		redirect : 'follow',
		body : formData,
		headers : headers
	}

    const url = SERVER_URL+"int/api_generator.php?api_name=getInvoice&code="+data.CODE
    const {response, loading:isLoading, error} = useFetch(url, requestOptions)

if(loading){
    return <div>
        <div>
            <Sidebar />
            <div className="relative bg-gray-400 md:ml-64" style={{ height: "100vh", background: "linear-gradient(90deg, rgba(34,81,122,1) 0%, rgba(27,147,171,1) 100%)" }}>
                <Navbar />
                <div className=" w-full xl:pt-24 lg:pt-24 md:pt-16 sm:pt-16 xs:pt-16" style={{ background: "linear-gradient(90deg, rgba(34,81,122,1) 0%, rgba(27,147,171,1) 100%)"}}>
                    <div className="flex flex-wrap">
                        <Pane background="#2c3e50" className="xl:mx-4 xl:rounded-md" width="100%">
                            <Topbar title="Bil / Maklumat Pembayaran" leftButtonIcon={ArrowLeftIcon} onClickLeftButton={() => history.goBack()} />
                        </Pane>
                        <div className="w-full px-4 mt-3">
                            <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 shadow-lg xs:mt-16">
                                <div className="flex-auto p-4 mt-6">
                                    <Heading
                                        is="h1"
                                        size={500}
                                        marginBottom={majorScale(2)}
                                        textTransform="uppercase"
                                        letterSpacing="2px"
                                        fontWeight={700}
                                        display="flex"
                                        alignItems="center"
                                    >
                                        { TRANSLATION[language].LESEN.DETAIL.TITLE }
                                </Heading>
                                </div>
                                <Pane display="flex" alignItems="center" justifyContent="center" height={400}>
                                    <Spinner />
                                </Pane>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
else if(!loading){
    return (
            <div>
                <Sidebar />
                <div className="relative bg-gray-400 md:ml-64 " style={{ height: "100vh",  background: "linear-gradient(90deg, rgba(34,81,122,1) 0%, rgba(27,147,171,1) 100%)" }}>
                    <Navbar />
                    <div className=" w-full xl:pt-24 lg:pt-24 md:pt-16 sm:pt-16 xs:pt-16" style={{ background: "linear-gradient(90deg, rgba(34,81,122,1) 0%, rgba(27,147,171,1) 100%)"}}>
                        <div className="flex flex-wrap">
                            <Pane background="#2c3e50" className="xl:mx-4 xl:rounded-md" width="100%">
                                <Topbar title={TRANSLATION[language].CUKAI.BREADCRUMB} leftButtonIcon={ArrowLeftIcon} onClickLeftButton={() => history.goBack()} />
                            </Pane>
                            <div className="w-full px-4 mt-3">
                                <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 shadow-lg xs:mt-16">
                                    <div className="flex-auto p-4 mt-6">

                                        <Heading
                                            is="h1"
                                            size={500}
                                            marginBottom={majorScale(2)}
                                            textTransform="uppercase"
                                            letterSpacing="2px"
                                            fontWeight={700}
                                            display="flex"
                                            alignItems="center"
                                        >
                                            {TRANSLATION[language].CUKAI.TITLE.toUpperCase()}
                                        </Heading>

                                        <Pane background="#c7ecee" marginBottom={majorScale(2)}>
                                            <Paragraph padding={majorScale(2)} size={400}>
                                            {TRANSLATION[language].CUKAI.SUBTITLE} : <b>{data.NOAKAUN}</b>.
                                            </Paragraph>
                                        </Pane>

                                        <Card
                                            background="tint2"
                                            marginBottom={majorScale(2)}
                                            paddingY={minorScale(2)}
                                            paddingX={majorScale(1)}
                                        >
                                            <Pane>
                                                <Text fontWeight={600}>{TRANSLATION[language].CUKAI.TYPE.TITLE}</Text>
                                                <Heading size={100}>{TRANSLATION[language].CUKAI.TYPE.SUBTITLE.toUpperCase()}</Heading>
                                            </Pane>
                                            <Pane>
                                                <Text fontWeight={600}>{TRANSLATION[language].SEARCH.MENU.ACCOUNT.TITLE}</Text>
                                                <Heading size={100}>{ data.NOAKAUN ? data.NOAKAUN : TRANSLATION[language].CONSTANT.NONE}</Heading>
                                            </Pane>
                                            <Pane>
                                                <Text fontWeight={600}>{TRANSLATION[language].CONSTANT.OWNER}</Text>
                                                <Heading size={100}>{ data.NAMA_PEMILIK ? data.NAMA_PEMILIK : TRANSLATION[language].CONSTANT.NONE}</Heading>
                                            </Pane>
                                            <Pane>
                                                <Text fontWeight={600}>{TRANSLATION[language].CUKAI.ADDRESS}</Text>
                                                <Heading size={100}>{ data.ALAMAT ? data.ALAMAT : TRANSLATION[language].CONSTANT.NONE}</Heading>
                                            </Pane>
                                            <Pane>
                                                <Text fontWeight={600}>{TRANSLATION[language].CUKAI.DISTRICT}</Text>
                                                <Heading size={100}>{ data.MUKIM ? data.MUKIM : TRANSLATION[language].CONSTANT.NONE}</Heading>
                                            </Pane>
                                            <Pane>
                                                <Text fontWeight={600}>{TRANSLATION[language].CUKAI.DATE}</Text>
                                                <Heading size={100}>{data.TEMPOH_CUKAI}</Heading>
                                            </Pane>
                                            <Pane>
                                                <Text fontWeight={600}>{TRANSLATION[language].CUKAI.PAYMENT_DATE}</Text>
                                                <Heading size={100}>{data.TEMPOH_BAYARAN}</Heading>
                                            </Pane>
                                        </Card>
                                        <Card
                                            background="tint2"
                                            marginBottom={majorScale(2)}
                                            padding={minorScale(2)}
                                        >
                                            <Pane>
                                                <Heading size={200}>{TRANSLATION[language].CONSTANT.PAYMENT_STATUS}</Heading>
                                                <Heading size={200} fontWeight={400}>{ (data.STATUS.toUpperCase() === "PAID" || data.STATUS.toUpperCase() === "O") ? (<span className="uppercase font-medium text-xs text-green-400">{TRANSLATION[language].CONSTANT.PAID}</span>) : (<span className="uppercase font-medium text-xs text-red-400">{TRANSLATION[language].CONSTANT.PENDING}</span>)}</Heading>
                                            </Pane>
                                        </Card>

                                            <Pane className="mb-4">
                                                    <button type = "button" className="bg-teal-500 hover:bg-teal-400 text-white py-2 px-4 mr-2 rounded inline-flex items-center text-xs font-medium"
                                                        onClick={() => handleView(btoa(data.NOAKAUN))}
                                                        >
                                                        <i className="fas fa-file-download"></i>&nbsp;{TRANSLATION[language].CUKAI.PRINT_BILL}
                                                    </button>
                                                {   (!isLoading) &&
                                                        (response.invoiceNo !== null && (data.STATUS === 'O' || data.STATUS === 'PAID' ))  &&
                                                        <button type = "button" className="bg-teal-500 hover:bg-teal-400 text-white py-2 px-4 rounded inline-flex items-center text-xs font-medium"
                                                            onClick={() => handleReceipt(btoa(response.invoiceNo))}
                                                            >
                                                            <i className="fas fa-receipt"></i>&nbsp;{TRANSLATION[language].CONSTANT.PRINT_RECEIPT}
                                                        </button>
                                                }
                                            </Pane>

                                        { (data.STATUS.toUpperCase() === "PENDING PAYMENT" || data.STATUS.toUpperCase() === "PENDING" || data.STATUS.toUpperCase() === "X") &&
                                            <Card
                                                background="tint2"
                                                marginBottom={majorScale(1)}
                                                padding={minorScale(2)}
                                            >
                                                <Pane>
                                                    <Heading size={200}>{TRANSLATION[language].CONSTANT.PENDING_AMOUNT}</Heading>
                                                    <Heading size={500}>
                                                        <NumberFormat value={(parseInt(data.BAKI)).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'RM'} />
                                                    </Heading>
                                                </Pane>
                                            </Card>
                                        }
                                        <div className="flex flex-wrap py-1 w-full mt-2 rounded-md">
                                            <Pane width="100%" >
                                                <Button
                                                    appearance="primary"
                                                    intent="danger"
                                                    type="button"
                                                    onClick={() => window.history.back()}
                                                    iconBefore={ArrowLeftIcon}
                                                >
                                                    {TRANSLATION[language].CONSTANT.BACK}
                                                </Button>
                                                { (data.STATUS.toUpperCase() === "PENDING PAYMENT" || data.STATUS.toUpperCase() === "PENDING" || data.STATUS.toUpperCase() === "X") &&
                                                    <Button
                                                        appearance="primary"
                                                        intent="success"
                                                        type="button"
                                                        className="float-right ml-2 cursor-pointer"
                                                        onClick={ (data.STATUS.toUpperCase() === "PENDING PAYMENT" || data.STATUS.toUpperCase() === "PENDING" || data.STATUS.toUpperCase() === "X") ? () => handlePayment() : () => paidButton() }
                                                        iconAfter={ArrowRightIcon}
                                                    >
                                                        {TRANSLATION[language].CONSTANT.PAY}
                                                    </Button>
                                                }
                                                { (data.STATUS.toUpperCase() === "PAID" || data.STATUS.toUpperCase() === "O") &&
                                                    <Button
                                                        appearance="primary"
                                                        intent="danger"
                                                        type="button"
                                                        className="float-right cursor-pointer"
                                                        onClick={(e) => handleDelete(data.NOAKAUN)}
                                                        iconAfter={DeleteIcon}
                                                    >
                                                        {TRANSLATION[language].CONSTANT.DELETE}
                                                    </Button>
                                                }
                                            </Pane>
                                        </div>
                                        { (data.STATUS.toUpperCase() === "PENDING PAYMENT" || data.STATUS.toUpperCase() === "PENDING" || data.STATUS.toUpperCase() === "X") &&
                                        <div className="flex flex-wrap w-full mt-2 rounded-md">
                                            <Pane width = "100%">
                                            <Button
                                                        appearance="primary"
                                                        intent="danger"
                                                        type="button"
                                                        className="float-right cursor-pointer"
                                                        onClick={(e) => handleDelete(data.NOAKAUN)}
                                                        iconAfter={DeleteIcon}
                                                    >
                                                        {TRANSLATION[language].CONSTANT.DELETE}
                                                    </Button>
                                            </Pane>
                                        </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Cukai
