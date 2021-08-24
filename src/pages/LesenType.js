import React from 'react'
import Sidebar from "../Sidebar"
import Navbar from "../components/Navbars/AdminNavbar"
import { Pane, toaster, ArrowLeftIcon, Heading, TickCircleIcon } from "evergreen-ui";
import Topbaer from "../Topbar2";
import MenuList from "../components/MenuList"

export default function lesen() {
    const listMenu = [
        {"title":"Lesen Tred / Penjana / Pasar Malam","subtitle":"-","status":true, "to":"/menulesen", data:{title:"Bil / Lesen Tred / Penjana / Pasar Malam"}},
        {"title":"Visual Papan Iklan","subtitle":"-","status":false, "to":" Bil / Visual Papan Iklan", data:{}},
        {"title":"Permit Lesen","subtitle":"-","status":false, "to":"Bil / Permit Lesen", data:{}},
    ]

    return (
<div>
			<Sidebar />
			<div className="relative md:ml-64" style={{ height: "100vh", background: "linear-gradient(90deg, rgba(34,81,122,1) 0%, rgba(27,147,171,1) 100%)" }}>
				<Navbar />
				<div className="w-full xl:pt-24 lg:pt-24 md:pt-16 sm:pt-16 xs:pt-16" style={{ background: "linear-gradient(90deg, rgba(34,81,122,1) 0%, rgba(27,147,171,1) 100%)" }}>
					<div className="flex flex-wrap ">
						<Pane background="#2c3e50" className="xl:mx-6 xl:rounded-md mb-5" width="100%">
							<Topbaer title="Bil / Lesen" leftButtonIcon={ArrowLeftIcon} onClickLeftButton={() => window.history.back()} />
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
