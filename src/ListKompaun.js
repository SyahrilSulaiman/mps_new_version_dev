import React, { useState, useEffect } from "react";
import { getUser, getNOKP, getToken, removeUserSession } from "./Utils/Common";
import Sidebar from "./Sidebar";
import Navbar from "./components/Navbars/AdminNavbar";
import { Pane, toaster, Button, AddIcon, ArrowLeftIcon, Dialog, SortNumericalIcon, Tablist, Tab, Heading } from "evergreen-ui";
import BillList from './BillList';
import Topbar from "./Topbar2";

function Bill(props) {

	const token 	= getToken();
	const user 		= getUser();
	const nokp 		= getNOKP();
	const [dialog, setDialog ] = useState(false)

	const handleAddBill = () => {
		window.location.href = '/add_cukai_taksiran';
	}	

	return (
		<div>
			<Sidebar />
			<div className="relative md:ml-64 bg-gray-400" style={{ height: "100vh" }}>
				<Navbar />
				<div className="w-full xl:pt-24 lg:pt-24 md:pt-16 sm:pt-16 xs:pt-16">
					<div className="flex flex-wrap ">
						<Pane background="#2c3e50" className="xl:mx-4 xl:rounded-md" width="100%">
							<Topbar title="Bil / Kompaun" leftButtonIcon={ArrowLeftIcon} onClickLeftButton={() => window.history.back()} />
						</Pane>
						<Pane className="py-5 xl:mx-4 xl:rounded-md" position="relative" width="100%">
							<Tablist display="grid" gridTemplateColumns="1fr 1fr">
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
								<Tab onSelect={() => toaster.danger("Harap maaf, tiada kaedah pembayaran secara menyeluruh buat masa ini.", { id: "forbidden-action" })}>
									<Button
									width="100%"
									justifyContent="center"
									appearance="primary"
									iconBefore={SortNumericalIcon}
									className="xs:ml-5 ml-1"
									onClick={() => toaster.danger("Harap maaf, tiada kaedah pembayaran secara menyeluruh buat masa ini.", { id: "forbidden-action" })}
									>
									Bayar Semua
									</Button>
								</Tab>
							</Tablist>
						</Pane>
						<div className="w-full">
							<div className="flex-auto overflow-y-scroll" style={{ height: "60vh" }}>
								{/* <BillList /> */}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Bill;
