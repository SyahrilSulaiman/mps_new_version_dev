import React from 'react'
import Sidebar from "../Sidebar"
import Navbar from './Navbars/AdminNavbar'
import { Pane, toaster, ArrowLeftIcon, Heading, TickCircleIcon } from "evergreen-ui";
import Topbaer from "../Topbar2";
import { useHistory } from 'react-router';



function BillMenuList(props) {
    const history = useHistory()
    const { title, } = props
    return (
        <div>
            <Sidebar />
            <div className="relative md:ml-64" style={{ height: "100vh", background: "rgb(34,81,122)", background: "linear-gradient(90deg, rgba(34,81,122,1) 0%, rgba(27,147,171,1) 100%)" }}>
                <Navbar />
                <div className="w-full xl:pt-24 lg:pt-24 md:pt-16 sm:pt-16 xs:pt-16" style={{ background: "rgb(34,81,122)", background: "linear-gradient(90deg, rgba(34,81,122,1) 0%, rgba(27,147,171,1) 100%)" }}>
                    <div className="flex flex-wrap">
                    <Pane background="#2c3e50" className="xl:mx-6 xl:rounded-md mb-5" width="100%">
							<Topbaer title="Bil / Cukai Taksiran" leftButtonIcon={ArrowLeftIcon} onClickLeftButton={() => history.goBack()} />
						</Pane>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BillMenuList
