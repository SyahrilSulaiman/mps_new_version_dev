import React, { useState, useEffect, useContext } from "react";
import { getUser, getNOKP, getToken, removeUserSession } from "./Utils/Common";
import { useHistory } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./components/Navbars/AdminNavbar";
import { Pane, toaster, Button, AddIcon, ArrowLeftIcon, Dialog, SortNumericalIcon, Tablist, Tab, Heading, TickCircleIcon } from "evergreen-ui";
import BillList from './BillList';
import Topbaer from "./Topbar2";
import axios from 'axios'
import swal from 'sweetalert'
import { SelectedBillContext } from "./contexts/SelectedBillContext";

function Bill(props) {

	const token = getToken();
	const user = getUser();
	const nokp = getNOKP();
	const [dialog, setDialog] = useState(false);
	const [dataset, setDataSet] = useState({ data: [] });
	const [loading, setLoading] = useState(false);
	const [isNoData, setIsNoData] = useState(false);
	const { selectedBil, handleUnpaidBil, unpaidBil } = useContext(SelectedBillContext);
	const [disabled, setDisabled] = useState(false);

	const history = useHistory();

	const handleAddBill = () => {
		window.location.href = '/add_cukai_taksiran';
	}

	const handleBayarSemua = () => {
        setDisabled(true);
        const formData = new FormData();
        formData.append('userSecret', nokp)
        axios.post('https://mymps.corrad.my/int/api_generator.php?api_name=get_user_status', formData)
            .then((res) => {
                if (res.data.status === "Pending") {
                    toaster.danger("Pembayaran Dibatalkan.",{description:"Akaun anda masih belum diaktifkan. Sila semak emel anda untuk pengesahan akaun."})
                }else{
					handleUnpaidBil(dataset);
					if (unpaidBil.length < 1) {
						toaster.danger("Tiada bil tertunggak buat masa sekarang.", { id: "forbidden-action" });
					}
					else {
						history.push({
							pathname: '/multiaccount-payment',
							state: { payBill: unpaidBil }
						})
					}
                }
            })
            .catch((err) => {
                console.log(err);
                swal.fire("Ralat", "Sila hubungi pentadbir sistem!", "error");
            });
	}



	const handleBayarSelected = () => {
        setDisabled(true);
        const formData = new FormData();
        formData.append('userSecret', nokp)
        axios.post('https://mymps.corrad.my/int/api_generator.php?api_name=get_user_status', formData)
            .then((res) => {
                if (res.data.status === "Pending") {
                    toaster.danger("Pembayaran Dibatalkan.",{description:"Akaun anda masih belum diaktifkan. Sila semak emel anda untuk pengesahan akaun."})
                }else{
					if (selectedBil.length < 1) {
						toaster.danger("Sila pilih akaun yang ingin dibayar dan tekan pada butang bayar bil berwarna biru.", { id: "forbidden-action" });
					}
					else {
						history.push({
							pathname: '/multiaccount-payment',
							state: { payBill: selectedBil }
						})
					}
                }
            })
            .catch((err) => {
                console.log(err);
                swal.fire("Ralat", "Sila hubungi pentadbir sistem!", "error");
            });
	}

	useEffect(() => {

		const formData = new FormData();
		formData.append("nokp", nokp);
		axios
			.post(
				"https://mymps.corrad.my/int/api_generator.php?api_name=showBill",
				formData
			)
			.then((res) => {
				setLoading(true);
				if (res.data.status === "success") {
					setDataSet({ data: res.data.data, });
					handleUnpaidBil({ data: res.data.data });
					setLoading(false);
				} else {
					setIsNoData(true);
					setLoading(false);
				}
			})
			.catch((err) => {
				console.log(err);
				swal("Ralat", "Sila hubungi pentadbir sistem!", "error");
			});


	}, []);


	return (
		<div>
			<Sidebar />
			<div className="relative md:ml-64" style={{ height: "100vh", background: "rgb(34,81,122)", background: "linear-gradient(90deg, rgba(34,81,122,1) 0%, rgba(27,147,171,1) 100%)" }}>
				<Navbar />
				<div className="w-full xl:pt-24 lg:pt-24 md:pt-16 sm:pt-16 xs:pt-16" style={{ background: "rgb(34,81,122)", background: "linear-gradient(90deg, rgba(34,81,122,1) 0%, rgba(27,147,171,1) 100%)" }}>
					<div className="flex flex-wrap ">
						<Pane background="#2c3e50" className="xl:mx-6 xl:rounded-md mb-5" width="100%">
							<Topbaer title="Bil / Cukai Taksiran" leftButtonIcon={ArrowLeftIcon} onClickLeftButton={() => window.history.back()} />
						</Pane>
						<div className="w-full lg:w-6/12 xl:w-4/12 px-6" onClick={handleAddBill}>
							<div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg cursor-pointer">
								<div className="flex-auto p-3">
									<div className="flex flex-wrap">
										<div className="relative w-full pr-4 max-w-full flex-grow flex-1">
											<h5 className="text-gray-500 uppercase font-bold text-xs">
												Tambah Bil
											</h5>
											<span className="font-semibold text-xs text-gray-800">
												<Pane display="flex">Tekan ini untuk menambah bil</Pane>
											</span>
										</div>
										<div className="relative w-auto pl-4 flex-initial" onClick={handleAddBill}>
											<div className="text-white p-3 text-center inline-flex items-center justify-center w-15 h-8 shadow-lg rounded bg-green-500">
												<i className="fas fa-plus"></i> <Heading size={200} className="pl-2" color="white">Bil</Heading>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="w-full lg:w-6/12 xl:w-4/12 px-6" onClick={handleBayarSelected}>
							<div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg cursor-pointer">
								<div className="flex-auto p-3">
									<div className="flex flex-wrap">
										<div className="relative w-full pr-4 max-w-full flex-grow flex-1">
											<h5 className="text-gray-500 uppercase font-bold text-xs">
												<Pane display="flex"> Pembayaran akaun terpilih </Pane>
											</h5>
											<span className="font-semibold text-xs text-gray-800">
												<Pane display="flex"> Sila tekan pada <TickCircleIcon color="success" marginLeft="2px" marginRight="2px"/> untuk pilih bil</Pane>
											</span>
										</div>
										<div className="relative w-auto pl-4 flex-initial" onClick={handleBayarSelected}>
											<div className="text-white p-3 text-center inline-flex items-center justify-center w-8 h-8 shadow-lg rounded-full bg-orange-500">
												<Heading size={400} color="white">{selectedBil.length}</Heading>	
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="w-full lg:w-6/12 xl:w-4/12 px-6" onClick={handleBayarSemua}>
							<div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg cursor-pointer">
								<div className="flex-auto p-3">
									<div className="flex flex-wrap">
										<div className="relative w-full pr-4 max-w-full flex-grow flex-1">
											<h5 className="text-gray-500 uppercase font-bold text-xs">
												Pembayaran semua bil
											</h5>
											<span className="font-semibold text-xs text-gray-800">
												<Pane>Membayar keseluruhan bil yang tertunggak</Pane>
											</span>
										</div>
										<div className="relative w-auto pl-4 flex-initial" onClick={handleBayarSemua}>
											<div className="text-white p-3 text-center inline-flex items-center justify-center w-8 h-8 shadow-lg rounded-full bg-blue-500">
												<Heading size={400} color="white">{unpaidBil.length}</Heading>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<Pane className="py-2 xl:mx-4 xl:rounded-md" position="relative" width="100%">
							{/* <Tablist display="grid" gridTemplateColumns="1fr 1fr 1fr">
								<Tab onSelect={() => handleAddBill()}>
									<Button
										width="100%"
										justifyContent="center"
										appearance="primary"
										intent="success"
										iconBefore={AddIcon}
										className="xs:ml-5"
										onClick={handleAddBill}
									>
										Tambah Bil
									</Button>
								</Tab>
								<Tab >
									<Button
										width="100%"
										justifyContent="center"
										appearance="primary"
										className="xs:ml-5 ml-1"
										onClick={handleBayarSelected}
									>
										Bayar {selectedBil.length} Bil
									</Button>
								</Tab>
								<Tab >
									<Button
										width="100%"
										justifyContent="center"
										appearance="primary"
										className="xs:ml-5 ml-1"
										onClick={handleBayarSemua}
									>
										Bayar Semua Bil
									</Button>
								</Tab>
							</Tablist> */}
						</Pane>
						<div className="w-full">
							<div className="flex-auto" style={{ height: "120vh" }}>
								<BillList dataset={dataset} isNoData={isNoData} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Bill;
