import React,{ useState, useContext, useEffect } from "react"
import Sidebar from "../../Sidebar"
import Navbar from "../../components/Navbars/AdminNavbar"
import { Pane, Spinner, toaster, ArrowLeftIcon, Heading, TickCircleIcon } from "evergreen-ui";
import Topbar from "../../Topbar2";
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";
import { ContextHandler } from "../../contexts/ContextHandler";
import PermitList from "./PermitList";
import useFetch from "../../hooks/useFetch";
import EmptyBill from "../../components/EmptyBill";
import { SERVER_URL } from "../../Constants";
import { getNOKP, getEmail, setAuthorization } from "../../Utils/Common";
import { TRANSLATION } from "../../Translation";
import noScroll from "no-scroll"


function PermitMenu(props) {
	noScroll.off();
	const { handleUnpaid, selected, unpaid, language, setUnpaid } = useContext(ContextHandler);

	const nokp = getNOKP();
	const email = getEmail();
	const auth = setAuthorization(nokp,email);

	const [response, setResponse] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error,setError] = useState(null)
	const headers = new Headers();
	headers.append("TOKEN",auth)

	const formData = new FormData();
	formData.append("nokp", nokp)

	const abortCont = new AbortController()

	const requestOptions = {
		method : "POST",
		redirect : "follow",
		body : formData,
		headers : headers,
		signal:abortCont.signal
	}
	
    const history = useHistory()
    const location = useLocation()

	const url = SERVER_URL+"int/api_generator.php?api_name=showV2&type="+location.state.type+"&code="+location.state.code;
	const [ disabled,setDisabled] = useState(false);

	useEffect(() => {
		fetch( url, requestOptions )
		.then(res => {
			if(!res.ok){
				throw Error("Could't fetch response from the resource")
			}
			return res.json()
		})
		.then(res => {
			if(res.status.toLowerCase() === 'success'){
				handleUnpaid(res)
			}
			setResponse(res)
			setLoading(false)
			setError(null)
		})
		.catch(err => {
			if(err.name === "AbortError"){
				console.log("fetch aborted")
			}
			else{
				setLoading(false)
				setError(err.message)
			}
		})
	}, []);

	const handleBayarSemua = () => {
        setDisabled(true);
		handleUnpaid(response);
		if (unpaid.length < 1) {
			toaster.danger(TRANSLATION[language].MESSAGE.emptyUnpaid, { id: "forbidden-action" });
		}
		else {
			history.push({
				pathname: "/multiplepayment",
				state: { payBill: unpaid, code:location.state.code, type:location.state.type}
			})
		}
	}

    const handleBayarSelected = () => {
        setDisabled(true);
		handleUnpaid(response);
		if (unpaid.length < 1) {
			toaster.danger(TRANSLATION[language].MESSAGE.emptyUnpaid, { id: "forbidden-action" });
		}
		else {
			history.push({
				pathname: "/multiplepayment",
				state: { payBill: selected, code:location.state.code, type:location.state.type}
			})
		}
	}
    const handleAddBill = () => {
        // toaster.notify(TRANSLATION[language].MESSAGE.maintenanceFunctionMessage, { id: "forbidden-action" });
		history.push({
			pathname:"/carian",
			state:{type:location.state.type, code:location.state.code, searchCode:location.state.searchCode, title:location.state.title, from:location.pathname}
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
							<Topbar title={TRANSLATION[language].BREADCRUMB.LIST+' '+location.state.title} leftButtonIcon={ArrowLeftIcon} onClickLeftButton={() => history.goBack()} />
						</Pane>
						<div className="w-full lg:w-6/12 xl:w-4/12 px-6" onClick={handleAddBill}>
							<div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg cursor-pointer">
								<div className="flex-auto p-3">
									<div className="flex flex-wrap">
										<div className="relative w-full pr-4 max-w-full flex-grow flex-1">
											<h5 className="text-gray-500 uppercase font-bold text-xs">
												{TRANSLATION[language].ACTION.ADD_BILL.TITLE}
											</h5>
											<span className="font-semibold text-xs text-gray-800">
												<Pane display="flex">{TRANSLATION[language].ACTION.ADD_BILL.SUBTITLE}</Pane>
											</span>
										</div>
										<div className="relative w-auto pl-4 flex-initial" onClick={handleAddBill}>
											<div className="text-white p-3 text-center inline-flex items-center justify-center w-15 h-8 shadow-lg rounded bg-green-500">
												<i className="fas fa-plus"></i> <Heading size={200} className="pl-2" color="white">{TRANSLATION[language].ACTION.ADD_BILL.BUTTON}</Heading>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
                        <div 
							className="w-full lg:w-6/12 xl:w-4/12 px-6"
							onClick={handleBayarSelected}
						>
							<div 
								className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg cursor-pointer"
								// className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg cursor-not-allowed"
							>
								<div className="flex-auto p-3">
									<div className="flex flex-wrap">
										<div className="relative w-full pr-4 max-w-full flex-grow flex-1">
											<h5 className="text-gray-500 uppercase font-bold text-xs">
												<Pane display="flex"> {TRANSLATION[language].ACTION.SELECT_BILL.TITLE} </Pane>
											</h5>
											<span className="font-semibold text-xs text-gray-800">
												<Pane display="flex"> {TRANSLATION[language].ACTION.SELECT_BILL.SUBTITLE1} <TickCircleIcon color="success" marginLeft="2px" marginRight="2px"/> {TRANSLATION[language].ACTION.SELECT_BILL.SUBTITLE2}</Pane>
											</span>
										</div>
										<div
											className="relative w-auto pl-4 flex-initial" 
											onClick={	handleBayarSelected	}
											// onClick={	disabledButton	}
										>
											<div className="text-white p-3 text-center inline-flex items-center justify-center w-8 h-8 shadow-lg rounded-full bg-yellow-500">
												<Heading size={400} color="white">
                                                {selected.length}
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
											{TRANSLATION[language].ACTION.PAY_BILL.TITLE}
											</h5>
											<span className="font-semibold text-xs text-gray-800">
												<Pane>{TRANSLATION[language].ACTION.PAY_BILL.SUBTITLE}</Pane>
											</span>
										</div>
										<div
											className="relative w-auto pl-4 flex-initial" 
											onClick={	handleBayarSemua	}
											// onClick={	disabledButton	}
										>
											<div className="text-white p-3 text-center inline-flex items-center justify-center w-8 h-8 shadow-lg rounded-full bg-blue-500">
												<Heading size={400} color="white">
                                                {unpaid.length}
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
								: 	(response.status === "success")
								? 
									response.data.map((res,index) => {
										return <PermitList response={res} title={location.state.title} type={location.state.type} code={location.state.code} key={index}/>
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

export default PermitMenu
