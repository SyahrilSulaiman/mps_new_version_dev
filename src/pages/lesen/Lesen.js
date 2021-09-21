import React,{ useState } from 'react'
import useFetch from '../../hooks/useFetch'
import Sidebar from "../../Sidebar"
import Navbar from "../../components/Navbars/AdminNavbar"
import Topbar from "../../Topbar2";
import swal from 'sweetalert2';
import { Heading, Spinner, Pane, Button, Text, Paragraph, majorScale, minorScale, Card, ArrowRightIcon,Icon , ChevronRightIcon, ArrowLeftIcon, toaster, DeleteIcon } from 'evergreen-ui';
import NumberFormat from 'react-number-format';
import { useHistory, useLocation } from "react-router-dom";
import { getNOKP, getEmail, setAuthorization } from "../../Utils/Common";
import { SERVER_URL } from '../../Constants';

function Lesen() {
    const nokp = getNOKP();
    const email = getEmail();
    const auth = setAuthorization(nokp,email);
    const abortCont = new AbortController()
    const history = useHistory()

    const [res, setRes] = useState(null)
    const [pending, setPending] = useState(true)
    const [isError, setIsError] = useState(null)

    const handleView = (e) => {
        console.log('handleView ', e)
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

    const url = SERVER_URL+"int/api_generator.php?api_name=getActivity&code="+data.CODE
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
                                        MAKLUMAT PEMBAYARAN LESEN
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
                                <Topbar title="Bil / Maklumat Pembayaran" leftButtonIcon={ArrowLeftIcon} onClickLeftButton={() => window.history.back()} />
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
                                            MAKLUMAT PEMBAYARAN LESEN
                                        </Heading>

                                        <Pane background="#c7ecee" marginBottom={majorScale(2)}>
                                            <Paragraph padding={majorScale(2)} size={400}>
                                                Berikut merupakan maklumat lesen {location.state.data.TITLE} : <b>{data.NOAKAUN}</b>.
                                            </Paragraph>
                                        </Pane>

                                        <Card
                                            background="tint2"
                                            marginBottom={majorScale(2)}
                                            paddingY={minorScale(2)}
                                            paddingX={majorScale(1)}
                                        >
                                            <Pane>
                                                <Text fontWeight={600}>Jenis Bil</Text>
                                                <Heading size={100}>LESEN - {location.state.data.TITLE.toUpperCase()}</Heading>
                                            </Pane>
                                            <Pane>
                                                <Text fontWeight={600}>Nombor Akaun</Text>
                                                <Heading size={100}>{ data.NOAKAUN ? data.NOAKAUN : "Tiada"}</Heading>
                                            </Pane>
                                            <Pane>
                                                <Text fontWeight={600}>Nama Pemilik</Text>
                                                <Heading size={100}>{ data.NAMA_PEMILIK ? data.NAMA_PEMILIK : "Tiada"}</Heading>
                                            </Pane>
                                            <Pane>
                                                <Text fontWeight={600}>Nama Syarikat</Text>
                                                <Heading size={100}>{ data.NAMA_SYARIKAT ? data.NAMA_SYARIKAT : "Tiada"}</Heading>
                                            </Pane>
                                            <Pane>
                                                <Text fontWeight={600}>Alamat Syarikat</Text>
                                                <Heading size={100}>{ data.ALAMAT_SYARIKAT ? data.ALAMAT_SYARIKAT : "Tiada"}</Heading>
                                            </Pane>
                                            <Pane>
                                                <Text fontWeight={600}>Tempoh Lesen</Text>
                                                <Heading size={100}>
                                                { data.TEMPOH_LESEN}
                                                </Heading>
                                            </Pane>
                                        </Card>
                                        <Card
                                            background="tint2"
                                            marginBottom={majorScale(2)}
                                            padding={minorScale(2)}
                                        >
                                            <Pane>
                                                <Text fontWeight={600}>Senarai Aktiviti</Text>
                                                {(!isLoading) ?
                                                    (response.data.status === 'FAILED') ? 
                                                        <Heading size={100}>Tiada</Heading>
                                                    :
                                                    response.data.map((res,index) => {
                                                    return (
                                                        <div className="pt-2" key={index}>
                                                            <Heading size={100}>Kod Aktivit - { res.KOD_AKTIVITI}</Heading>
                                                            <Heading size={100}>{ res.KETERANGAN}</Heading>
                                                        </div>
                                                        )
                                                        
                                                })
                                                : ''}
                                            </Pane>
                                        </Card>
                                        <Card
                                            background="tint2"
                                            marginBottom={majorScale(2)}
                                            padding={minorScale(2)}
                                        >
                                            <Pane>
                                                <Heading size={200}>Status Bayaran</Heading>
                                                <Heading size={200} fontWeight={400}>{ data.STATUS === "PAID" ? (<span className="uppercase font-medium text-xs text-green-400">Telah Dibayar</span>) : (<span className="uppercase font-medium text-xs text-red-400">Tertunggak</span>)}</Heading>
                                            </Pane>
                                        </Card>


                                        {/* <Card
                                            background="tint2"
                                            marginBottom={majorScale(2)}
                                            padding={minorScale(2)}
                                            onClick={() => handleView(data.NOAKAUN)}
                                            className="cursor-pointer hover:bg-gray-300"
                                        >
                                            <Pane display="grid" gridTemplateColumns="1fr 10px">
                                                <Heading size={200}>Cetak Bil PDF</Heading>
                                                <Heading className="mx-auto"><Icon icon={ChevronRightIcon}></Icon></Heading>
                                            </Pane>
                                        </Card> */}

                                        { data.STATUS !== "PAID" &&
                                            <Card
                                                background="tint2"
                                                marginBottom={majorScale(1)}
                                                padding={minorScale(2)}
                                            >
                                                <Pane>
                                                    <Heading size={200}>Jumlah Tunggakan</Heading>
                                                    <Heading size={500}>
                                                        <NumberFormat value={(parseInt(data.BAKI)).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'RM'} />
                                                    </Heading>
                                                </Pane>
                                            </Card>
                                        }
                                        <div className="flex flex-wrap py-1 w-full mt-4 rounded-md">
                                            <Pane width="100%" >
                                                <Button
                                                    appearance="primary"
                                                    intent="danger"
                                                    type="button"
                                                    onClick={() => window.history.back()}
                                                    iconBefore={ArrowLeftIcon}
                                                >
                                                    Kembali
                                                </Button>
                                                <Button
                                                    appearance="primary"
                                                    intent="success"
                                                    type="button"
                                                    className="float-right cursor-pointer"
                                                    onClick={() => handlePayment()}
                                                    // className="float-right cursor-not-allowed opacity-75"
                                                    // onClick={disabledButton}
                                                    iconAfter={ArrowRightIcon}
                                                >
                                                    Bayar
                                                </Button>
                                            </Pane>
                                        </div>
                                        <div className="flex flex-wrap py-1 w-full mt-4 rounded-md">
                                            <Pane width="100%" >
                                                <Button
                                                    appearance="primary"
                                                    intent="danger"
                                                    type="button"
                                                    className="float-right"
                                                    onClick={(e) => handleDelete(data.NOAKAUN)}
                                                    iconAfter={DeleteIcon}
                                                >
                                                    Hapus
                                                </Button>
                                            </Pane>
                                        </div>
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

export default Lesen
