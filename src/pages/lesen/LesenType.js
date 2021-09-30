import React from 'react'
import Sidebar from "../../Sidebar"
import Navbar from "../../components/Navbars/AdminNavbar"
import { Pane, ArrowLeftIcon,} from "evergreen-ui";
import Topbar from "../../Topbar2";
import MenuList from "../../components/MenuList"
import { SERVER_URL } from "../../Constants"

export default function lesen() {
    const listMenu = [
        {"title":"Lesen Perniagaan Tred / Kritikal","subtitle":"-","status":true, "to":"/menulesen", data:{title:"Lesen Perniagaan Tred / Kritikal", api:SERVER_URL+"int/api_generator.php?api_name=showV2&type=lesen&code=L", code:'L', searchCode:'L', type:'lesen'}},
        {"title":"Lesen Penjaja / Pasar Malam / Pasar Pagi","subtitle":"-","status":true, "to":"/menulesen", data:{title:"Lesen Penjaja / Pasar Malam / Pasar Pagi", api:SERVER_URL+"int/api_generator.php?api_name=showV2&type=lesen&code=LR", code:'LR',  searchCode:'L', type:'lesen'}},
        {"title":"Lesen Visual Papan Iklan Luaran","subtitle":"-","status":true, "to":"/menulesen", data:{title: "Lesen Visual Papan Iklan Luaran", api:SERVER_URL+"int/api_generator.php?api_name=showV2&type=lesen&code=LV", code:'LV',  searchCode:'LV', type:'lesen'}},
        {"title":"Permit Sementara","subtitle":"-","status":true, "to":"/menulesen", data:{title:"Permit Sementara", api:SERVER_URL+"int/api_generator.php?api_name=showV2&type=lesen&code=PS", code:'PS',  searchCode:'PS', type:'lesen'}},
    ]

    return (
<div>
			<Sidebar />
			<div className="relative md:ml-64" style={{ height: "100vh", background: "linear-gradient(90deg, rgba(34,81,122,1) 0%, rgba(27,147,171,1) 100%)" }}>
				<Navbar />
				<div className="w-full xl:pt-24 lg:pt-24 md:pt-16 sm:pt-16 xs:pt-16" style={{ background: "linear-gradient(90deg, rgba(34,81,122,1) 0%, rgba(27,147,171,1) 100%)" }}>
					<div className="flex flex-wrap ">
						<Pane background="#2c3e50" className="xl:mx-6 xl:rounded-md mb-5" width="100%">
							<Topbar title="Bil / Lesen" leftButtonIcon={ArrowLeftIcon} onClickLeftButton={() => window.history.back()} />
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
