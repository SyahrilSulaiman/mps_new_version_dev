import React,{ useState,useContext } from 'react'
import Sidebar from "../../Sidebar"
import Navbar from "../../components/Navbars/AdminNavbar"
import { Pane, Spinner, toaster, ArrowLeftIcon, Heading, TickCircleIcon } from "evergreen-ui";
import Topbaer from "../../Topbar2";
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';
import { SelectedBillContext } from '../../contexts/SelectedBillContext';
import BillCardList from '../../components/BillCardList';
import useFetch from '../../hooks/useFetch';
import EmptyBill from '../../components/EmptyBill';
import { SERVER_URL } from '../../Constants';
import { getNOKP, getEmail, setAuthorization } from "../../Utils/Common";


function LesenMenu(props) {
	const { selectedBil, handleUnpaidBil, unpaidBil } = useContext(SelectedBillContext);

	const nokp = getNOKP();
	const email = getEmail();
	const auth = setAuthorization(nokp,email);
	
	const headers = new Headers();
	headers.append('TOKEN',auth)

	const formData = new FormData();
	formData.append('nokp', nokp)

	const requestOptions = {
		method : 'POST',
		redirect : 'follow',
		body : formData,
		headers : headers
	}

    const history = useHistory()
    const location = useLocation()
	const { response, loading, } = useFetch(location.state.api,requestOptions);
	const [ disabled,setDisabled] = useState(false);

	const handleBayarSemua = () => {
        setDisabled(true);
		handleUnpaidBil(response);
		if (unpaidBil.length < 1) {
			toaster.danger("Tiada bil tertunggak buat masa sekarang.", { id: "forbidden-action" });
		}
		else {
			history.push({
				pathname: '/multiplepayment',
				state: { payBill: unpaidBil }
			})
		}
	}

    const handleBayarSelected = () => {
		console.log('Handle bayar selected')
	};
    const handleAddBill = () => {
		history.push({
			pathname:'/carian',
			state:{type:location.state.type, code:location.state.code, from:location.pathname}
		})
	};

    return (
        <div>
            <Sidebar />
            <div className="relative md:ml-64" style={{ height: "100vh", background: "linear-gradient(90deg, rgba(34,81,122,1) 0%, rgba(27,147,171,1) 100%)" }}>
                <Navbar />
                <div className="w-full xl:pt-24 lg:pt-24 md:pt-16 sm:pt-16 xs:pt-16" style={{ background: "linear-gradient(90deg, rgba(34,81,122,1) 0%, rgba(27,147,171,1) 100%)" }}>
                    <div className="flex flex-wrap">
                    <Pane background="#2c3e50" className="xl:mx-6 xl:rounded-md mb-5" width="100%">
							<Topbaer title={location.state.title} leftButtonIcon={ArrowLeftIcon} onClickLeftButton={() => history.goBack()} />
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
												<Heading size={400} color="white">
                                                {selectedBil.length}
                                                </Heading>	
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
												<Heading size={400} color="white">
                                                {unpaidBil.length}
                                                </Heading>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
                    </div>
                    <div className="w-full py-4">
						<div className="flex-auto">
							{ 
								(loading) ? 
									<div className="w-full bg-transparent px-3">
										<Pane display="flex" alignItems="center" justifyContent="center" background="white" paddingY={100}>
											<Spinner />
										</Pane>
									</div>
								: 	response.data.length !== 0
								? 
									response.data.map((res,index) => {
										return <BillCardList response={res} key={index}/>
									})
								: <EmptyBill />	

							}
						</div>
						
					</div>
                </div>
            </div>
        </div>
    )
}

export default LesenMenu
