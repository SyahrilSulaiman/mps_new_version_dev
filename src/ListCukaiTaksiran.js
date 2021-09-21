import React, { useState, useEffect, useContext } from "react";
import { getNOKP, getEmail, setAuthorization } from "./Utils/Common";
import { useHistory } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./components/Navbars/AdminNavbar";
import { Pane, toaster, ArrowLeftIcon, Heading, TickCircleIcon } from "evergreen-ui";
import BillList from './BillList';
import Topbaer from "./Topbar2";
import axios from 'axios'
import swal from 'sweetalert'
// import { SelectedBillContext } from "./contexts/SelectedBillContext";
import { ContextHandler } from "./contexts/ContextHandler";
import { SERVER_URL } from './Constants';


function Bill(props) {

	const nokp = getNOKP();
	const email = getEmail();
	const auth = setAuthorization(nokp,email);
	const [dataset, setDataSet] = useState({ data: [] });
	const [loading, setLoading] = useState(false);
	const [isNoData, setIsNoData] = useState(false);
	const { selected, handleUnpaid, unpaid } = useContext(ContextHandler);
	// const { selectedBil, handleUnpaidBil, unpaidBil } = useContext(SelectedBillContext);
	const [disabled, setDisabled] = useState(false);
	const headers = {
		TOKEN: auth
	}

	const history = useHistory();

	const handleAddBill = () => {
		window.location.href = '/add_cukai_taksiran';
	}

	const handleBayarSemua = () => {
        setDisabled(true);
        const formData = new FormData();
        formData.append('userSecret', nokp)
        axios.post(SERVER_URL+"int/api_generator.php?api_name=get_user_status", formData)
            .then((res) => {
                if (res.data.status !== "Pending" && res.data.status !== 'Active' ) {
                    toaster.danger("Pembayaran Dibatalkan.",{description:"Akaun anda masih belum diaktifkan. Sila semak emel anda untuk pengesahan akaun."}, { id: "forbidden-action" })
                }else{
					handleUnpaid(dataset);
					if (unpaid.length < 1) {
						toaster.danger("Tiada bil tertunggak buat masa sekarang.", { id: "forbidden-action" });
					}
					else {
						history.push({
							pathname: '/multiaccount-payment',
							state: { payBill: unpaid }
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
        axios.post(SERVER_URL+"int/api_generator.php?api_name=get_user_status", formData)
            .then((res) => {
                if (res.data.status !== "Pending" && res.data.status !== 'Active' ) {
                    toaster.danger("Pembayaran Dibatalkan.",{ description:"Akaun anda masih belum diaktifkan. Sila semak emel anda untuk pengesahan akaun.", id: "forbidden-action" })
                }else{
					if (selected.length < 1) {
						toaster.danger("Sila pilih akaun yang ingin dibayar dan tekan pada butang bayar bil berwarna kuning.", { id: "forbidden-action" });
					}
					else {
						history.push({
							pathname: '/multiaccount-payment',
							state: { payBill: selected }
						})
					}
                }
            })
            .catch((err) => {
                console.log(err);
                swal.fire("Ralat", "Sila hubungi pentadbir sistem!", "error");
            });
	}

	const disabledButton = () => {
		toaster.danger("Fungsi belum diaktifkan.",{ description: "Harap maaf. Fungsi pembayaran belum diaktifkan.", id: "forbidden-action"});
	}

	useEffect(() => {

		const formData = new FormData();
		formData.append("nokp", nokp);
		axios.post(	SERVER_URL+"int/api_generator.php?api_name=showV2&type=cukai&code=A", formData, {headers:headers} )
			.then((res) => {
				setLoading(true);
				if (res.data.status === "success") {
					setDataSet({ data: res.data.data, });
					handleUnpaid({ data: res.data.data });
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
						<div 
							className="w-full lg:w-6/12 xl:w-4/12 px-6"
							onClick={handleBayarSelected}

							// className="w-full lg:w-6/12 xl:w-4/12 px-6 opacity-75"
							// onClick={disabledButton}
						>
							<div 
								className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg cursor-pointer"
								// className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg cursor-not-allowed"
							>
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
										<div
											className="relative w-auto pl-4 flex-initial" 
											onClick={	handleBayarSelected	}
											// onClick={	disabledButton	}
										>
											<div className="text-white p-3 text-center inline-flex items-center justify-center w-8 h-8 shadow-lg rounded-full bg-yellow-500">
												<Heading size={400} color="white">{selected.length}</Heading>	
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div 
							className="w-full lg:w-6/12 xl:w-4/12 px-6"
							onClick={	handleBayarSemua }

							// className="w-full lg:w-6/12 xl:w-4/12 px-6 opacity-75" 
							// onClick={	disabledButton	}
						>
							<div 
								className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg cursor-pointer"
								// className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg cursor-not-allowed"
							>
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
										<div
											className="relative w-auto pl-4 flex-initial" 
											onClick={	handleBayarSemua	}
											// onClick={	disabledButton	}
										>
											<div className="text-white p-3 text-center inline-flex items-center justify-center w-8 h-8 shadow-lg rounded-full bg-blue-500">
												<Heading size={400} color="white">{unpaid.length}</Heading>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="w-full py-4">
							<div className="flex-auto">
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
