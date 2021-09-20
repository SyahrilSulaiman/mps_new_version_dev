import React, { useEffect } from "react";
import { getNOKP, getEmail, setAuthorization } from "./Utils/Common";
import Sidebar from "./Sidebar";
import Navbar from "./components/Navbars/AdminNavbar";
import { Pane, Icon, Heading, ArrowRightIcon } from "evergreen-ui";
import Topbar from "./Topbar2";
import swal from "sweetalert2";
import axios from "axios";
import { SERVER_URL } from './Constants';
import { Link } from "react-router-dom";
import MenuList from "./components/MenuList";

function Bill(props) {

	useEffect(() => {

		const formData2 = new FormData();
		formData2.append("userSecret", nokp)
		axios.post(SERVER_URL+"int/api_generator.php?api_name=user_notification", formData2)
		.then((res) => {
		if(res.data.status === "inactive"){
			setTimeout(function(){ 
				swal.fire({title:"Tahniah!",
							// html: "Terima kasih kerana mendaftar sebagai pengguna MyMPS, sila semak emel anda untuk pengesahan akaun bagi membolehkan pembayaran dilakukan. Jika Bil Cukai Taksiran anda tidak dipaparkan secara automatik selepas log masuk, sila ke halaman <a href='https://digitalbil.mps.gov.my/' target='_blank' class='text-blue-400 hover:text-blue-200'>https://digitalbil.mps.gov.my/</a> untuk kemaskini maklumat akaun anda.",
							html: "Terima kasih kerana mendaftar sebagai pengguna MyMPS. Jika Bil Cukai Taksiran anda tidak dipaparkan secara automatik selepas log masuk, sila ke halaman <a href='https://digitalbil.mps.gov.my/' target='_blank' class='text-blue-400 hover:text-blue-200'>https://digitalbil.mps.gov.my/</a> untuk kemaskini maklumat akaun anda.",
							icon:"success"}); 
			}, 1000);
		}
		})
		.catch((err) => {
		console.log(err);
		swal.fire("Ralat", "Sila hubungi pentadbir sistem!", "error");
		});

	}, []);

	const nokp = getNOKP();
	const email = getEmail();
	const auth = setAuthorization(nokp,email);
	const headers = {
		token: auth
	}

    const listMenu = [
        {"title":"Cukai Taksiran","subtitle":"Senarai bil cukai Taksiran","status":true, "to":"cukaitaksiran"},
        {"title":"Lesen","subtitle":"Senarai bil lesen","status":true, "to":"jenislesen"},
        {"title":"Kompaun","subtitle":"Senarai bil kompaun","status":false, "to":"#"},
    ]

	return (
		<div>
			<Sidebar />
			<div className="relative md:ml-64" style={{ height: "100vh" }} >
				<Navbar />
				<div className="w-full xl:pt-24 lg:pt-24 md:pt-16 sm:pt-16 xs:pt-16" style={{ background: "rgb(34,81,122)", background: "linear-gradient(90deg, rgba(34,81,122,1) 0%, rgba(27,147,171,1) 100%)" }}>
					<div className="flex flex-wrap" >
						<Pane background="#2c3e50" className="xl:mx-4 xl:rounded-md" width="100%">
							<Topbar title="Bil / Senarai Bil" />
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
	);
}

export default Bill;
