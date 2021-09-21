import React, { useState, useEffect } from "react";
import { useLocation} from 'react-router-dom';
import axios from 'axios';
import swal from "sweetalert";
import { toaster, Heading, Pane, ArrowLeftIcon, TextInputField, Dialog, Checkbox, Text, Button, SegmentedControl, Paragraph } from "evergreen-ui";
import Topbar from "./Topbar";
import NumberFormat from "react-number-format";
import { getNOKP, getEmail, setAuthorization } from "./Utils/Common";
import { SERVER_URL, PAYMENT_URL } from './Constants';

const FPX = "FPX";
const CARD = "CARD";

function Pay() {

    const location = useLocation();
    const year = new Date().getFullYear();

    const [account, setAccount]         = useState(location.state.payBill);
    const [method, setMethod]           = useState(FPX);
    const [dialog, setDialog]           = useState(false);
    const [dialogcc, setDialogCC]       = useState(false);
    const [data, setData]               = useState(null);
    const [bankCode, setBankCode]       = useState("");
    const [block, setBlock]             = useState(false);
    const [payorname, setPayorName]     = useState(sessionStorage.getItem("username"));
    const [payoremail, setPayorEmail]   = useState(sessionStorage.getItem("email"));
    const [payorphone, setPayorPhone]   = useState(sessionStorage.getItem("notel"));

    const [amount, setAmount]       = useState(0.00);
    const [invoiceNo, setInvoiceNo] = useState('A' + year + Math.floor(1000000000000 + Math.random() * 9999999999999)); 
    const [receiptno, setReceiptNo] = useState("");
    const nokp = getNOKP();
	const email = getEmail();
    const auth = setAuthorization(nokp,email);
    const headers = {
		token: auth
    }

    const myHeaders = new Headers();
    myHeaders.append('token',auth);

    const disabledButton = () => {
		toaster.danger("Fungsi belum diaktifkan.",{ description: "Harap maaf. Fungsi pembayaran belum diaktifkan.", id: "forbidden-action"});
    }
    
    useEffect(() => {
        if(account === null || account === ""){
            window.location.href = "/cukaitaksiran";
        }
        let total = 0;
        for(var i = 0; i < account.length; i++){
            // console.log(account);
            setAmount(total = total + (account[i].BAKI ));
        }

        fetch(PAYMENT_URL+'fpx/bankList.php')
        .then(response => response.json())
        .then(result => {
            setData(result);
        })
        .catch(err => {
            console.log(err);
            toaster.danger("Sistem Ralat.", { id: "forbidden-action", description: "Tiada pembayaran yang boleh dibuat pada masa ini. Sila hubungi pentadbir sistem untuk berurusan dengan lebih lanjut." })
        })

        const formData = new FormData();
        formData.append('userSecret', sessionStorage.nokp)
        axios.post(SERVER_URL+"int/api_generator.php?api_name=get_user_status", formData)
        .then((res) => {
            if (res.data.status !== "Pending" && res.data.status !== "Active") {
                toaster.warning("Pembayaran Dibatalkan.", { id: "forbidden-action", description: "Akaun anda masih belum diaktifkan. Sila semak emel anda untuk pengesahan akaun." });
                setBlock(true);
            }
        })
        .catch((err) => {
            console.log(err);
            swal("Ralat", "Sila hubungi pentadbir sistem!", "error");
        });

    }, [])

    const handleBayar = () => {

        setDialogCC(false);
        setDialog(false);

        if(amount == 0.00 || amount == "") {
            toaster.danger("Harap maaf, Pembayaran batal kerana maklumat pembayaran tidak lengkap.", { id: "forbidden-action" });
            return false;
        }
        else if (payorname == "") {
            toaster.danger("Harap maaf, Sila lengkapkan maklumat nama pembayar sebelum membuat pembayaran.", { id: "forbidden-action" });
            return false;
        }
        else if (payoremail == "") {
            toaster.danger("Harap maaf, Sila lengkapkan maklumat emel pembayar sebelum membuat pembayaran.", { id: "forbidden-action" });
            return false;
        }
        else if (payorphone == "") {
            toaster.danger("Harap maaf, Sila lengkapkan maklumat nombor telefon pembayar sebelum membuat pembayaran.", { id: "forbidden-action" });
            return false;
        }
        else if (bankCode == "") {
            toaster.danger("Harap maaf, Sila membuat pilihan bank sebelum membuat pembayaran.", { id: "forbidden-action" });
            return false;
        }
        else {

            var formdata = new FormData();
            formdata.append("bill", JSON.stringify(account));
            formdata.append("invoiceNo", invoiceNo);
            formdata.append("payorname", payorname);
            formdata.append("payoremail", payoremail);
            formdata.append("payorphone", payorphone);
            formdata.append("method", 0);
            formdata.append("nokp", sessionStorage.nokp);

            var requestOptions = {
                method: 'POST',
                body: formdata,
                redirect: 'follow',
                headers : myHeaders
            };

            var urlAPI1 = SERVER_URL+"int/api_generator.php?api_name=multibill_payment";

            fetch(urlAPI1, requestOptions)
                .then(response => response.json())
                .then(result => {
                    if (result.status == "success") {
                        setReceiptNo(result.receiptNo);
                        if(result.newInvoice !== ""){
                            setInvoiceNo(result.newInvoice);
                        }
                        document.getElementById("bayar").submit();
                    }
                    else {
                        toaster.danger("Harap maaf, tidak boleh membuat sebarang pembayaran pada masa kini.", { id: "forbidden-action" });
                    }
                })

        }

    }

    const handleBayar2 = () => {

        setDialogCC(false);
        setDialog(false);

        if(amount == 0.00 || amount == "") {
            toaster.danger("Harap maaf, Pembayaran batal kerana maklumat jumlah pembayaran tidak lengkap.", { id: "forbidden-action" });
            return false;
        }
        else if (payorname == "") {
            toaster.danger("Harap maaf, Sila lengkapkan maklumat nama pembayar sebelum membuat pembayaran.", { id: "forbidden-action" });
            return false;
        }
        else if (payoremail == "") {
            toaster.danger("Harap maaf, Sila lengkapkan maklumat emel pembayar sebelum membuat pembayaran.", { id: "forbidden-action" });
            return false;
        }
        else if (payorphone == "") {
            toaster.danger("Harap maaf, Sila lengkapkan maklumat nombor telefon pembayar sebelum membuat pembayaran.", { id: "forbidden-action" });
            return false;
        }
        else {

            var formdata = new FormData();
            formdata.append("bill", JSON.stringify(account));
            formdata.append("amount", amount.toFixed(2));
            formdata.append("invoiceNo", invoiceNo);
            formdata.append("payorname", payorname);
            formdata.append("payoremail", payoremail);
            formdata.append("payorphone", payorphone);
            formdata.append("method", 1);
            formdata.append("nokp", sessionStorage.nokp);

            var requestOptions = {
                method: 'POST',
                body: formdata,
                redirect: 'follow',
                headers:myHeaders
            };

            var urlAPI1 = SERVER_URL+"int/api_generator.php?api_name=multibill_payment";

            fetch(urlAPI1, requestOptions)
                .then(response => response.json())
                .then(result => {
                    if (result.status == "success") {
                        setReceiptNo(result.receiptNo);
                        if(result.newInvoice !== ""){
                            setInvoiceNo(result.newInvoice);
                        }
                        document.getElementById("bayarCC").submit();
                    }
                    else {
                        toaster.danger("Harap maaf, tidak boleh membuat sebarang pembayaran pada masa kini.", { id: "forbidden-action" });
                    }
                })

        }

    }

    if (account) {
        return (
            <div className = "overflow-y-scroll">
                <Topbar
                    title="Pembayaran Cukai"
                    leftButtonIcon={ArrowLeftIcon}
                    onClickLeftButton={() => window.location.href = '/cukaitaksiran'}
                />

                <div className="bg-white shadow overflow-hidden" style={{ paddingTop: "50px" }}>
                    <Pane background="tint1" padding={10}>
                        <Pane>
                            <Heading size={500}>Maklumat Pembayaran</Heading>
                        </Pane>
                        <Pane>
                            <Text>Sila lengkapkan maklumat pembayar dan pilih kaedah pembayaran</Text>
                        </Pane>
                    </Pane>
                    <div>
                        <form action="" method="post">
                            <Pane display="flex" width="100%" className="pt-5" paddingX={20}>
                                <TextInputField
                                    width="100%"
                                    label="Nama Pembayar"
                                    description="Sila isi nama pembayar"
                                    placeholder="cth: Suriati"
                                    value={payorname}
                                    onChange={(e) => setPayorName(e.target.value)}
                                    readOnly
                                />
                            </Pane>
                            <Pane display="flex" width="100%" paddingX={20}>
                                <TextInputField
                                    width="100%"
                                    label="Alamat Emel"
                                    description="Sila isi alamat emel pembayar"
                                    placeholder="cth: kiminawa@gmail.com"
                                    value={payoremail}
                                    onChange={(e) => setPayorEmail(e.target.value)}
                                    readOnly
                                />
                            </Pane>
                            <Pane display="flex" width="100%" paddingX={20}>
                                <TextInputField
                                    width="100%"
                                    label="Nombor Telefon"
                                    description="Sila isi nombor telefon pembayar"
                                    placeholder="cth: 0123456789"
                                    value={payorphone}
                                    onChange={(e) => setPayorPhone(e.target.value)}
                                    readOnly
                                />
                            </Pane>
                            <Pane paddingX={20} className="flex flex-wrap overflow-y-auto" style={{height:"100px"}}>
                                {account && account.map((bill, index) => 
                                    <Pane key={index} display="grid" width="100%" padding={10} background="tint2">
                                        <Pane display="grid" gridTemplateColumns="1fr 1fr">
                                            <Heading size={200}>AKAUN {index + 1}</Heading>
                                            <Heading size={100} textAlign="right">{bill.NOAKAUN}&emsp;&emsp;
                                                <NumberFormat value={(bill.BAKI ).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'RM'} />
                                            </Heading>
                                        </Pane>
                                    </Pane>
                                )}
                            </Pane>
                            <Pane paddingX={20} className="flex flex-wrap">
                                <Pane display="grid" width="100%" padding={10} className="bg-gray-200">
                                    <Pane display="grid" gridTemplateColumns="1fr 1fr">
                                        <Heading size={200}>JUMLAH</Heading>
                                        <Heading size={100} textAlign="right">(Untuk {account.length} Akaun)&emsp;&emsp;
                                            <NumberFormat value={amount.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'RM'} />
                                        </Heading>
                                    </Pane>
                                </Pane>
                            </Pane>
                            
                            <Pane marginY={15} paddingX={20}>
                                <Paragraph fontWeight="bold" fontSize={15}>
                                    Kaedah Pembayaran
                                </Paragraph>
                                <SegmentedControl
                                    value={method}
                                    onChange={(value) => {
                                        setMethod(value);
                                    }}
                                    height={30}
                                    options={[
                                        {
                                            label: "Online Banking (FPX)",
                                            value: "FPX",
                                        },
                                        {
                                            label: "Debit / Credit Card",
                                            value: "CARD",
                                        },
                                    ]}
                                ></SegmentedControl>
                            </Pane>
                            <Pane paddingX={20} style={{ height: "150vh" }}>
                                {method === "CARD" && (
                                    <Pane marginY={15} style={{ height: "50vh" }}>
                                        <Paragraph fontWeight="bold" fontSize={13}>
                                            Kad Kredit & Kad Debit
                                    </Paragraph>
                                        <Paragraph>
                                            Jika anda ingin meneruskan pembayaran dengan menggunakan kredit atau debit kad, sila tekan butang pembayaran di bawah.
                                    </Paragraph>
                                    </Pane>
                                )}
                                {method === "FPX" && (
                                    <Pane marginY={15}>
                                        <Paragraph fontWeight="bold" fontSize={13}>
                                            Perbankan Online
                                        </Paragraph>
                                        <Paragraph>
                                            Tekan pada mana-mana logo bank untuk pilih :
                                        </Paragraph>
                                        <Pane display="grid" gridTemplateColumns="1fr 1fr" marginX={1} columnGap={1}>
                                            {data && data.map((bankk, index) => {

                                                let isOffline = bankk.NAME.includes("Offline");
                                                return (
                                                    <Pane
                                                        userSelect="none"
                                                        opacity={isOffline ? 0.4 : 1}
                                                        key={index}
                                                        backgroundColor="#fff"
                                                        paddingX={15}
                                                        paddingY={10}
                                                        marginBottom={1}
                                                        className="cursor-pointer"
                                                        alignItems="center"
                                                        textAlign="center"
                                                        borderRadius={3}
                                                        borderWidth={2}
                                                        borderColor={bankCode === bankk.CODE ? "#2f3640" : "#ebebeb"}
                                                        boxShadow={bankCode === bankk.CODE ? "0px 2px 2px #c49b9b" : "none"}
                                                        borderBottomWidth={bankCode === bankk.CODE ? 5 : 2}
                                                        borderStyle="solid"
                                                        position="relative"
                                                        onClick={() => {
                                                            if (isOffline) {
                                                                toaster.danger("Harap maaf, pilihan bank tidak boleh membuat pembayaran untuk waktu sekarang.", { id: "forbidden-action" });
                                                                return;
                                                            } else {
                                                                setBankCode(bankk.CODE)
                                                            }
                                                        }}
                                                    >
                                                        <img className="mx-auto" alt={bankk.CODE} style={{ height: "40px", width: "40px" }} src={process.env.PUBLIC_URL + "/assets/img/" + bankk.CODE + ".png"} /><Heading size={200}>{bankk.NAME}</Heading></Pane>)
                                            }
                                            )
                                            }
                                        </Pane>
                                    </Pane>
                                )}
                            </Pane>
                        </form>
                    </div>
                    <Pane>
                        <Dialog
                            isShown={dialog}
                            title="Pengesahan Bayaran"
                            onConfirm={() => handleBayar()}
                            onCancel={() => setDialog(false)}
                            cancelLabel="Tidak"
                            intent="danger"
                            confirmLabel="Ya"
                            shouldCloseOnOverlayClick={false}
                            hasFooter={false}
                        >
                            <Checkbox checked label="Dengan ini saya mengesahkan untuk membuat pembayaran ke atas cukai taksiran." />
                            <Pane paddingTop={30} display="float" className="float-right">
                                <Button marginRight={16} intent="success" appearance="primary" onClick={() => handleBayar()}
>
                                            Ya
                                </Button>
                                <Button marginRight={16} intent="none" onClick={() => setDialog(false)}>
                                            Tidak
                                </Button>
                            </Pane>
                        </Dialog>

                        <Dialog
                            isShown={dialogcc}
                            title="Pengesahan Pembayar"
                            onConfirm={() => handleBayar2()}
                            onCancel={() => setDialogCC(false)}
                            cancelLabel="Tidak"
                            intent="danger"
                            confirmLabel="Ya"
                            intent="success"
                            shouldCloseOnOverlayClick={false}
                            hasFooter={false}
                        >
                            <Checkbox checked label="Dengan ini saya mengesahkan untuk membuat pembayaran ke atas cukai taksiran." />
                            <Pane paddingTop={30} display="float" className="float-right">
                                <Button marginRight={16} intent="success" appearance="primary" onClick={() => handleBayar2()}
>
                                            Ya
                                </Button>
                                <Button marginRight={16} intent="none" onClick={() => setDialogCC(false)}>
                                            Tidak
                                </Button>
                            </Pane>
                        </Dialog>
                    </Pane>
                    {method === "FPX" &&
                        <Pane
                            position="fixed"
                            bottom={0}
                            left={0}
                            right={0}
                            height={50}
                            background={1 ? "#009432" : "#9a0b0b"}
                            display="grid"
                            gridTemplateColumns="1fr"
                            columnGap={10}
                            userSelect="none"
                            paddingX={15}
                        >
                            <Pane
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                flexDirection="column"
                                overflow="hidden"
                            >

                                <Paragraph
                                    color="#fff"
                                    fontWeight="bold"
                                    fontSize={15}
                                    whiteSpace="nowrap"
                                    overflow="hidden"
                                    textOverflow="ellipsis"
                                >
                                </Paragraph>
                            </Pane>
                            <Pane alignItems="center" alignContent="center" textAlign="center" justifyContent="center" className="cursor-pointer" onClick={() => {
                                if (bankCode && method === "FPX") {
                                    setDialog(true)
                                } else if (bankCode == "" && method === "FPX") {
                                    toaster.danger("Harap maaf, Sila membuat pilihan bank sebelum membuat pembayaran.", { id: "forbidden-action" });
                                }
                            }}>
                                <Heading size={500} color="white">Teruskan Pembayaran (FPX)</Heading>
                            </Pane>
                        </Pane>
                    }

                    {method === "CARD" && (
                        <Pane
                        position="fixed"
                        bottom={0}
                        left={0}
                        right={0}
                        height={50}
                        background={1 ? "#009432" : "#9a0b0b"}
                        display="grid"
                        gridTemplateColumns="1fr"
                        columnGap={10}
                        userSelect="none"
                        paddingX={15}
                    >
                        <Pane
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            flexDirection="column"
                            overflow="hidden"
                        >

                            <Paragraph
                                color="#fff"
                                fontWeight="bold"
                                fontSize={15}
                                whiteSpace="nowrap"
                                overflow="hidden"
                                textOverflow="ellipsis"
                            >
                            </Paragraph>
                        </Pane>
                        <Pane alignItems="center" alignContent="center" textAlign="center" justifyContent="center" 
                            onClick={() => {    if (method === "CARD") {    setDialogCC(true)   }   }}
                            className="cursor-pointer"
                            
                            // className="cursor-not-allowed opacity-75"
                            // onClick={ disabledButton }
                        >
                            <Heading size={400} color="white">Teruskan Pembayaran (Credit Card)</Heading>
                        </Pane>
                    </Pane>
                    )}

                    <div>
                        <form action={PAYMENT_URL+'fpx/sd.php'} method="post" id="bayar">
                            <input type="hidden" name="receipt_no" value={receiptno} />
                            <input type="hidden" name="payment_ref_no" value={invoiceNo} />
                            <input type="hidden" name="bank" value={bankCode ? bankCode : 'TEST0021'} />
                            <input type="hidden" name="channel" value="01" />
                            <input type="hidden" name="web_return_address" value={SERVER_URL+"int/resitpembayaran.php"} />
                            <input type="hidden" name="web_service_return_address" value={SERVER_URL+"int/callback.php"} />
                            <input type="hidden" name="payment_amount" value={amount.toFixed(2)} />
                            <input type="hidden" name="payment_description" value={"Cukai " + invoiceNo} />
                            <input type="hidden" name="email" value={payoremail} />
                        </form>

                        <form action={PAYMENT_URL+'MiGS/payment.php'} method="post" id="bayarCC">
                            <input type="hidden" name="receipt_no" value={receiptno} />
                            <input type="hidden" name="payment_ref_no" value={invoiceNo} />
                            <input type="hidden" name="web_return_address" value={SERVER_URL+"int/resitpembayaran.php"} />
                            <input type="hidden" name="web_service_return_address" value={SERVER_URL+"int/callback.php"} />
                            <input type="hidden" name="payment_amount" value={amount.toFixed(2)} />
                            <input type="hidden" name="payment_description" value={"Cukai " + invoiceNo} />
                            <input type="hidden" name="email" value={payoremail} />
                        </form>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <Topbar
                    title="Pembayaran Cukai"
                    leftButtonIcon={ArrowLeftIcon}
                    onClickLeftButton={() => window.history.back()}
                />
            </div>
        )
    }

}

export default Pay;