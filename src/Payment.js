import React, { useState, useEffect } from "react";
import axios from 'axios';
import swal from "sweetalert";
import { toaster, Heading, Pane, ArrowLeftIcon, TextInputField, Dialog, Checkbox, Text, Button, SegmentedControl, Paragraph } from "evergreen-ui";
import Topbar from "./Topbar";
import NumberFormat from 'react-number-format';
import { getNOKP, getEmail, setAuthorization } from "./Utils/Common";

const FPX = "FPX";
const CARD = "CARD";

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function Pay() {

    const year = new Date().getFullYear();

    const [method, setMethod]           = useState(FPX);
    const [dialog, setDialog]           = useState(false);
    const [dialogcc, setDialogCC]       = useState(false);
    const [data, setData]               = useState(null);
    const [bankCode, setBankCode]       = useState("");
    const [block, setBlock]             = useState(false);
    const [noBill, setNoBill]           = useState(true);
    const [payorname, setPayorName]     = useState(sessionStorage.getItem("username"));
    const [payoremail, setPayorEmail]   = useState(sessionStorage.getItem("email"));
    const [payorphone, setPayorPhone]   = useState(sessionStorage.getItem("notel"));

    const [penama, setPenama]       = useState("");
    const [accountNo, setAccountNo] = useState(sessionStorage.noakaun);
    const [amount, setAmount]       = useState(0.00);
    const [invoiceNo, setInvoiceNo] = useState('A'+year+getRandomInt(10000000000000, 99999999999999));  
    const [receiptno, setReceiptNo] = useState("");
    const nokp = getNOKP();
	const email = getEmail();
	const auth = setAuthorization(nokp,email);

    useEffect(() => {
        fetch('https://epstaging.mps.gov.my/fpx/bankList.php')
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
        axios.post("https://mymps.corrad.my/int/api_generator.php?api_name=get_user_status", formData)
        .then((res) => {
            if (res.data.status === "Pending") {
                toaster.warning("Pembayaran Dibatalkan.", { id: "forbidden-action", description: "Akaun anda masih belum diaktifkan. Sila semak emel anda untuk pengesahan akaun." });
                setBlock(true);
            }
        })
        .catch((err) => {
            console.log(err);
            swal("Ralat", "Sila hubungi pentadbir sistem!", "error");
        });

        var urlAPI = "https://mymps.corrad.my/int/api_generator.php?api_name=searchBill";
        const formData2 = new FormData();
        formData2.append('search', accountNo);
        formData2.append('type', 'akaun');
        axios.post(urlAPI, formData2)
        .then((res) => {
            setNoBill(false);
            setAccountNo(res.data[0][0].NOAKAUN);;
            setAmount(res.data[2][0].BAKI);
            setPenama(res.data[0][0].NAMA_PEMILIK);
        })
        .catch((err) => {
            console.log(err);
            setNoBill(false);
            toaster.danger("Tiada Bil.", {description:"Harap maaf. Bil yang ingin dibayar tidak dijumpai. Sila kembali ke paparan bil untuk membuat sebarang pembayaran bil anda."});
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
            formdata.append("accountId", accountNo);
            formdata.append("amount", amount);
            formdata.append("invoiceNo", invoiceNo);
            formdata.append("payorname", payorname);
            formdata.append("payoremail", payoremail);
            formdata.append("payorphone", payorphone);
            formdata.append("method", 0);
            formdata.append("nokp", sessionStorage.nokp);

            var requestOptions = {
                method: 'POST',
                body: formdata,
                redirect: 'follow'
            };

            var urlAPI1 = "https://mymps.corrad.my/int/api_generator.php?api_name=register_payment";

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
            formdata.append("accountId", accountNo);
            formdata.append("amount", amount);
            formdata.append("invoiceNo", invoiceNo);
            formdata.append("payorname", payorname);
            formdata.append("payoremail", payoremail);
            formdata.append("payorphone", payorphone);
            formdata.append("method", 1);
            formdata.append("nokp", sessionStorage.nokp);

            var requestOptions = {
                method: 'POST',
                body: formdata,
                redirect: 'follow'
            };

            var urlAPI1 = "https://mymps.corrad.my/int/api_generator.php?api_name=register_payment";

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

    if (block == false && noBill == false) {
        return (
            <div className="">
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
                            <Pane paddingX={20} className="flex flex-wrap">
                                <Pane display="grid" width="100%" padding={10} background="tint2" >
                                    <Pane display="grid" gridTemplateColumns="1fr 200px">
                                        <Heading size={400}>Pemilik</Heading>
                                        <Heading size={100} textAlign="right">{penama ? penama : "-"}</Heading>
                                    </Pane>
                                </Pane>
                                <Pane display="grid" width="100%" padding={10} background="tint2">
                                    <Pane display="grid" gridTemplateColumns="1fr 1fr">
                                        <Heading size={400}>Akaun</Heading>
                                        <Heading size={100} textAlign="right">{accountNo ? accountNo : "-"}</Heading>
                                    </Pane>
                                </Pane>
                                <Pane display="grid" width="100%" padding={10} background="tint2">
                                    <Pane display="grid" gridTemplateColumns="1fr 1fr">
                                        <Heading size={400}>Jumlah Bayaran</Heading>
                                        <Heading size={100} textAlign="right"><NumberFormat value={amount.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'RM'} /></Heading>
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
                                                        <img className="mx-auto" style={{ height: "40px", width: "40px" }} src={"https://dev1.toyyibpay.com/asset/img/logobank/" + bankk.CODE + ".png"} /><Heading size={200}>{bankk.NAME}</Heading></Pane>)
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
                            cancelLabel="batal"
                            // cancelBackground = "danger"
                            intent="danger"
                            confirmLabel="betul"
                            // intent="success"
                            shouldCloseOnOverlayClick={false}
                            hasFooter={false}
                        >
                            <Checkbox checked label="Dengan ini saya mengesahkan untuk membuat pembayaran ke atas cukai taksiran." />
                            <Pane paddingTop={30} display="float" className="float-right">
                                <Button marginRight={16} intent="success" appearance="primary" onClick={() => handleBayar()}
>
                                            Betul
                                </Button>
                                <Button marginRight={16} intent="none" onClick={() => setDialog(false)}>
                                            Batal
                                </Button>
                            </Pane>
                        </Dialog>

                        <Dialog
                            isShown={dialogcc}
                            title="Pengesahan Pembayar"
                            onConfirm={() => handleBayar2()}
                            onCancel={() => setDialogCC(false)}
                            cancelLabel="batal"
                            intent="danger"
                            confirmLabel="betul"
                            intent="success"
                            shouldCloseOnOverlayClick={false}
                            hasFooter={false}
                        >
                            <Checkbox checked label="Dengan ini saya mengesahkan untuk membuat pembayaran ke atas cukai taksiran." />
                            <Pane paddingTop={30} display="float" className="float-right">
                                <Button marginRight={16} intent="success" appearance="primary" onClick={() => handleBayar2()}
>
                                            Betul
                                </Button>
                                <Button marginRight={16} intent="none" onClick={() => setDialogCC(false)}>
                                            Batal
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
                            <Pane alignItems="center" alignContent="center" textAlign="center" justifyContent="center" onClick={() => {
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
                        <Pane alignItems="center" alignContent="center" textAlign="center" justifyContent="center" onClick={() => {
                            if (method === "CARD") {
                                setDialogCC(true);
                            }
                        }}>
                            <Heading size={400} color="white">Teruskan Pembayaran (Credit Card)</Heading>
                        </Pane>
                    </Pane>
                    )}

                    <div>
                        <form action="https://epstaging.mps.gov.my/fpx/sd.php" method="post" id="bayar">
                            <input type="hidden" name="account_no" value={accountNo} />
                            <input type="hidden" name="receipt_no" value={receiptno} />
                            <input type="hidden" name="payment_ref_no" value={invoiceNo} />
                            <input type="hidden" name="bank" value={bankCode ? bankCode : 'TEST0021'} />
                            <input type="hidden" name="channel" value="01" />
                            <input type="hidden" name="web_return_address" value="https://mymps.corrad.my/int/resitpembayaran.php" />
                            <input type="hidden" name="web_service_return_address" value="https://mymps.corrad.my/int/callback.php" />
                            <input type="hidden" name="payment_amount" value={amount} />
                            <input type="hidden" name="payment_description" value={"Cukai Taksiran " + accountNo} />
                            <input type="hidden" name="email" value={payoremail} />
                        </form>

                        <form action="https://epstaging.mps.gov.my/MiGS/payment.php" method="post" id="bayarCC">
                            <input type="hidden" name="account_no" value={accountNo} />
                            <input type="hidden" name="receipt_no" value={receiptno} />
                            <input type="hidden" name="payment_ref_no" value={invoiceNo} />
                            <input type="hidden" name="web_return_address" value="https://mymps.corrad.my/int/resitpembayaran.php" />
                            <input type="hidden" name="web_service_return_address" value="https://mymps.corrad.my/int/callback.php" />
                            <input type="hidden" name="payment_amount" value={amount} />
                            <input type="hidden" name="payment_description" value={"Cukai Taksiran " + accountNo} />
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