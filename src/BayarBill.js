import React, { useEffect } from "react";
import { getNOKP, getEmail, setAuthorization } from "./Utils/Common";
import Sidebar from "./Sidebar";
import Navbar from "./components/Navbars/AdminNavbar";
import { Pane, Icon, Heading, ArrowRightIcon } from "evergreen-ui";
import Topbaer from "./Topbar2";
import swal from "sweetalert";
import axios from "axios";

function Bill(props) {

	useEffect(() => {

		const formData2 = new FormData();
		formData2.append("userSecret", nokp)
		axios.post("https://mymps.corrad.my/int/api_generator.php?api_name=user_notification", formData2)
		.then((res) => {
		if(res.data.status === "inactive"){
			setTimeout(function(){ 
				swal("Tahniah!","Terima kasih kerana mendaftar sebagai pengguna MyMPS, sila semak emel anda untuk pengesahan akaun bagi membolehkan pembayaran dilakukan.","success"); 
			}, 1000);
		}
		})
		.catch((err) => {
		console.log(err);
		swal("Ralat", "Sila hubungi pentadbir sistem!", "error");
		});

	}, []);

	const nokp = getNOKP();
	const email = getEmail();
	const auth = setAuthorization(nokp,email);
	const headers = {
		token: auth
	}

	return (
		<div>
			<Sidebar />
			<div className="relative md:ml-64" style={{ height: "100vh" }} >
				<Navbar />
				<div className="w-full xl:pt-24 lg:pt-24 md:pt-16 sm:pt-16 xs:pt-16" style={{ background: "rgb(34,81,122)", background: "linear-gradient(90deg, rgba(34,81,122,1) 0%, rgba(27,147,171,1) 100%)" }}>
					<div className="flex flex-wrap" >
						<Pane background="#2c3e50" className="xl:mx-4 xl:rounded-md" width="100%">
							<Topbaer title="Bil / Senarai Bil" />
						</Pane>
						<div className="w-full xl:mx-4">
							<div className="flex-auto" style={{ height: "100vh" }}>
								<Pane width="100%">
									<Pane display="grid" gridTemplateColumns="1fr 20px" className="p-5 my-1 rounded-lg" background="#2f3542" onClick={() => window.location.href = "/cukaitaksiran"} cursor="pointer">
										<Pane>
											<Heading color="#f1f2f6"> Cukai Taksiran </Heading><small className="text-gray-500">Senarai bil cukai taksiran</small>
										</Pane>
										<Pane>
											<Icon icon={ArrowRightIcon} color="#f1f2f6" className="py-5"></Icon>
										</Pane>
									</Pane>
									<Pane display="grid" gridTemplateColumns="1fr 20px" className="p-5 my-1 rounded-lg" background="#2f3542"  opacity={0.5} color="#f1f2f6" cursor="not-allowed">
										<Pane>
											<Heading color="#f1f2f6"> Kompaun </Heading><small className="text-gray-500">Senarai bil kompaun</small>
										</Pane>
										<Pane>
											<Icon icon={ArrowRightIcon} color="#f1f2f6" className="py-5"></Icon>
										</Pane>
									</Pane>
									<Pane display="grid" gridTemplateColumns="1fr 20px" className="p-5 my-1 rounded-lg" background="#2f3542"  opacity={0.5} color="#f1f2f6" cursor="not-allowed">
										<Pane>
											<Heading color="#f1f2f6"> Lesen </Heading><small className="text-gray-500">Senarai bil lesen</small>
										</Pane>
										<Pane>
											<Icon icon={ArrowRightIcon} color="#f1f2f6" className="py-5"></Icon>
										</Pane>
									</Pane>
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
