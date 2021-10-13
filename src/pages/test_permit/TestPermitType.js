import React from 'react'
import Sidebar from "../../Sidebar"
import Navbar from "../../components/Navbars/AdminNavbar"
import { Pane, ArrowLeftIcon,} from "evergreen-ui";
import Topbar from "../../Topbar2";
import MenuList from "../../components/MenuList"
import { SERVER_URL } from "../../Constants"

export default function TestPermitType() {
    const listMenu = [
        {"title":"Permit Bangunan", "subtitle":"-","status":true, "to":"/testpermitmenu", data:{title:"Permit Bangunan", code:'PB', searchCode:'PB', type:'permit'}},
        {"title":"Permit Telko", "subtitle":"-","status":true, "to":"/testpermitmenu", data:{title:"Permit Telko", code:'PT',  searchCode:'PT', type:'permit'}},
        {"title":"Permit Tunjuk Arah", "subtitle":"-","status":true, "to":"/testpermitmenu", data:{title: "Permit Tunjuk Arah", code:'PTA',  searchCode:'PTA', type:'permit'}},
        {"title":"Permit Papan Iklan", "subtitle":"-","status":true, "to":"/testpermitmenu", data:{title:"Permit Papan Iklan", code:'PPI',  searchCode:'PPI', type:'permit'}},
    ]

    return (
<div>
			<Sidebar />
			<div className="relative md:ml-64" style={{ height: "100vh", background: "linear-gradient(90deg, rgba(34,81,122,1) 0%, rgba(27,147,171,1) 100%)" }}>
				<Navbar />
				<div className="w-full xl:pt-24 lg:pt-24 md:pt-16 sm:pt-16 xs:pt-16" style={{ background: "linear-gradient(90deg, rgba(34,81,122,1) 0%, rgba(27,147,171,1) 100%)" }}>
					<div className="flex flex-wrap ">
						<Pane background="#2c3e50" className="xl:mx-6 xl:rounded-md mb-5" width="100%">
							<Topbar title="Bil / Test Permit" leftButtonIcon={ArrowLeftIcon} onClickLeftButton={() => window.history.back()} />
						</Pane>
                        <div className="w-full xl:mx-4">
							<div className="flex-auto" style={{ height: "100vh" }}>
								<Pane width="100%">
									<MenuList menu={listMenu}/>
								</Pane>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
    )
}
