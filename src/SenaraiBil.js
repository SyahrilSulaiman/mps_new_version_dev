import React, { useState, useEffect } from 'react'
import { getUser, getNOKP, getToken, removeUserSession } from "./Utils/Common";
import Sidebar from "./Sidebar";
import Navbar from "./components/Navbars/AdminNavbar";
import axios from 'axios';
import swal from 'sweetalert2';
import { Heading, Spinner, Pane, Button, Text, Paragraph, majorScale, minorScale, Card, UnorderedList, ListItem, Icon, ArrowLeftIcon, KeyDeleteIcon, DeleteIcon } from 'evergreen-ui';
import Topbaer from "./Topbar2";


export default function SenaraiBil(props) {
    const [isLoading, setLoading] = useState(true);
    const [bills, setBill] = useState(null);
    const nokp = getNOKP();
    const currentYear = new Date();

    const handleBack = () => {
        window.location.href = "/bill";
    }

    const handleBill = (e) => {
        window.location.href = "https://mymps.corrad.my/rp/bil_cukai_taksiran.php?noakaun=" + btoa(e)
    }

    const handleReceipt = (e) => {
        window.location.href = 'https://mymps.corrad.my/rp/resit.php?account=' + btoa(e);
    }

    useEffect(() => {
        axios.get("https://mymps.corrad.my/int/api_generator.php?api_name=getBill&noakaun=" + sessionStorage.getItem('noakaun'))
            .then(res => {
                if (res.data.status == 'success') {
                    setBill({
                        bill: res.data
                    });
                    setLoading(false);
                }
            })
            .catch(err => {
                console.log(err);
                swal.fire('Ralat', 'Sila hubungi pentadbir system', 'error');
            })
    }, [])

    const handleDelete = (e) => {
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
                // console.log('Confirm Delete');
                let formData = new FormData();
                formData.append('user',btoa(nokp));
                formData.append('noakaun',btoa(e));
                axios.post("https://mymps.corrad.my/int/api_generator.php?api_name=deleteBill",formData)
                .then(res => {
                    console.log(res);
                    if (res.data.status === 'success'){
                        swal.fire({
                            icon: 'success',
                            title: 'Berjaya',
                            text: 'Bil telah dihapuskan'
                        }).then(res => {
                            window.location.href = "/cukaitaksiran";
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
            }
        })
    }

    if (isLoading) {
        return (
            <div>
                <Sidebar />
                <div className="relative bg-gray-400 md:ml-64" style={{ height: "100vh" }}>
                    <Navbar />
                    <div className=" w-full xl:pt-24 lg:pt-24 md:pt-16 sm:pt-16 xs:pt-16">
                        <div className="flex flex-wrap">
                            <Pane background="#2c3e50" className="xl:mx-4 xl:rounded-md" width="100%">
                                <Topbaer title="Bil / Maklumat Bil" leftButtonIcon={ArrowLeftIcon} onClickLeftButton={() => window.history.back()} />
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
                                            MAKLUMAT PEMBAYARAN BIL
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
        );
    }

    return (
        <div>
            <Sidebar />
            <div className="relative md:ml-64" style={{ height: "100vh", background: "rgb(34,81,122)", background: "linear-gradient(90deg, rgba(34,81,122,1) 0%, rgba(27,147,171,1) 100%)" }}>
                <Navbar />
                <div className=" w-full xl:pt-24 lg:pt-24 md:pt-16 sm:pt-16 xs:pt-16" style={{ background: "rgb(34,81,122)", background: "linear-gradient(90deg, rgba(34,81,122,1) 0%, rgba(27,147,171,1) 100%)"}}>
                    <div className="flex flex-wrap">
                        <Pane background="#2c3e50" className="xl:mx-4 xl:rounded-md" width="100%">
                            <Topbaer title="Bil / Maklumat Bil" leftButtonIcon={ArrowLeftIcon} onClickLeftButton={() => window.history.back()} />
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
                                        MAKLUMAT BIL CUKAI TAKSIRAN
                                    </Heading>

                                    <Pane background="#c7ecee" marginBottom={majorScale(2)}>
                                        <Paragraph padding={majorScale(2)} size={400}>
                                            Berikut maklumat bil cukai taksiran bagi akaun <b>{bills.bill.data[0][0].NOAKAUN}</b>.
                                        </Paragraph>
                                    </Pane>

                                    <Card
                                        background="tint2"
                                        marginBottom={majorScale(2)}
                                        padding={minorScale(2)}
                                    >
                                        <Pane>
                                            <Text fontWeight={600}>Jenis Bil</Text>
                                            <Heading size={100}>Cukai - Cukai Taksiran</Heading>
                                        </Pane>
                                        <Pane>
                                            <Text fontWeight={600}>Nombor Akaun</Text>
                                            <Heading size={100}>{bills.bill.data[0][0].NOAKAUN ? bills.bill.data[0][0].NOAKAUN : "Tiada"}</Heading>
                                        </Pane>
                                        <Pane>
                                            <Text fontWeight={600}>Nama Pemilik</Text>
                                            <Heading size={100}>{bills.bill.data[0][0].NAMA_PEMILIK ? bills.bill.data[0][0].NAMA_PEMILIK : "Tiada"}</Heading>
                                        </Pane>
                                        <Pane>
                                            <Text fontWeight={600}>Alamat Harta</Text>
                                            <Heading size={100}>{bills.bill.data[0][0].ADDRHARTA ? bills.bill.data[0][0].ADDRHARTA : "Tiada"}</Heading>
                                        </Pane>
                                        <Pane>
                                            <Text fontWeight={600}>Mukim</Text>
                                            <Heading size={100}>{bills.bill.data[0][0].MUKIM ? bills.bill.data[0][0].MUKIM : "Tiada"}</Heading>
                                        </Pane>
                                        <Pane>
                                            <Text fontWeight={600}>Tempoh Cukai</Text>
                                            <Heading size={100}>
                                            {/* {  (new Date(bills.bill.data[3][0].DATE_BILL_LATEST).getMonth()+1 < parseInt(6)) ? 'Jan-Jun '+(currentYear.getFullYear()+0) : 'Julai-Disember ' +(currentYear.getFullYear()+0)} */}
                                            { "JAN - JUN 2021" }
                                            </Heading>
                                        </Pane>
                                        <Pane>
                                            <Text fontWeight={600}>Tempoh Bayaran</Text>
                                            <Heading size={100}>
                                            {/* { (new Date(bills.bill.data[3][0].DATE_BILL_LATEST).getMonth()+1 > parseInt(6)) ? '28-Feb-'+ (currentYear.getFullYear()+1) : '31-Aug-'+(currentYear.getFullYear()+0)}
                                             */}
                                             {"28-FEB-2021"}
                                            </Heading>
                                        </Pane>
                                    </Card>
                                    <Card
                                        background="tint2"
                                        marginBottom={majorScale(2)}
                                        padding={minorScale(2)}
                                    >
                                        <Pane>
                                            <Heading size={200}>Status Bayaran</Heading>
                                            <Heading size={200}>{bills.bill.data[0][0].STATUS == "PAID" ? (<span className="uppercase font-medium text-xs text-green-400">Telah Dibayar</span>) : (<span className="uppercase font-medium text-xs text-red-400">Tertunggak</span>)}</Heading>
                                        </Pane>
                                    </Card>
                                    <Card
                                        onClick={() => handleBill(btoa(bills.bill.data[0][0].NOAKAUN))}
                                        background="tint2"
                                        marginBottom={majorScale(1)}
                                        padding={minorScale(2)}
                                        className="cursor-pointer hover:bg-gray-300"
                                    >
                                        <Pane>
                                            <Heading size={200}><i className="fas fa-receipt"></i> Cetak Bil PDF <span><i className="pt-1 fas fa-chevron-right float-right"></i></span></Heading> 
                                        </Pane>
                                    </Card>
                                {
                                    bills.bill.status_bil === '1' ? (
                                    <Card
                                        onClick={() => handleReceipt(btoa(bills.bill.data[0][0].NOAKAUN))}
                                        background="tint2"
                                        marginBottom={majorScale(2)}
                                        padding={minorScale(2)}
                                        className="cursor-pointer hover:bg-gray-300"
                                    >
                                        <Pane>
                                            <Heading size={200}><i className="fas fa-receipt"></i> Cetak Resit PDF <span><i className="pt-1 fas fa-chevron-right float-right"></i></span></Heading> 
                                        </Pane>
                                    </Card>
                                     ) : ''
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
                                        intent="danger"
                                        type="button"
                                        className="float-right"
                                        onClick={(e) => handleDelete(btoa(bills.bill.data[0][0].NOAKAUN))}
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
    );
}