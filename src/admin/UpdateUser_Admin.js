import Axios from "axios";
import React, {useState, useEffect} from "react";
// import swal from "sweetalert";
import swal from "sweetalert2";
import Sidebar from "../admin/Sidebar_Admin";
import Navbar from "../components/Navbars/AdminNavbar";
import Footer from "../components/Footers/Footer";
import { get } from "jquery";
import { Pane, Button, Heading, TextInputField, Text } from "evergreen-ui";
import axios from 'axios'
import { getUser, getNOKP, getToken, removeUserSession } from "../Utils/Common";
import { SERVER_URL } from '../Constants';

export default function UserDetail({showUser,display}) {
  const admin = getNOKP();
  const user = showUser.U_USERIC;
  const user_email = showUser.U_USEREMAIL;
  const formData = new FormData();
  formData.append('user',user);
  formData.append('admin',admin);

  const handleBack = (e) => {
    // window.location.href = "./usermanagement";
    display(false);
  }
  const handleApprove = (e) => {
    console.log('Approve');
    console.log(admin);
    console.log(user);
    swal.fire({
      title: 'Adakah anda pasti?',
      text: "Mengesahkan Pengguna",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sahkan Pengguna',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        formData.append('mode','approve');
        axios.post(SERVER_URL+"int/api_generator.php?api_name=update_user",formData)
        .then(res=>{
          console.log(res);
          swal.fire({
            title:'',
            text:'Pengguna telah disahkan',
            icon:'warning',
            'timer': 3000
          })
          .then(res => {
            window.location.href = "./usermanagement"
            }
          )
        }).catch(err=>{console.log(err)})
      
      }
    })
  }
  const handleUpdate = (e) => {
    console.log('Update');
    swal.fire({
      title: 'Adakah anda pasti?',
      text: "Menetapkan semula kata laluan pengguna",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Kemaskini',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        formData.append('username',user_email);
        formData.append('admin',true);
        axios.post(SERVER_URL+"int/api_generator.php?api_name=change_password",formData)
        .then(res=>{
          console.log(res);
          if (res.data.status == "unsuccess") {
            console.log(res);
            swal.fire("Opss!", "Sila pastikan emel anda telah diisi dan sah.", "error");
            return false;
        }
        else if (res.data.status == "pending") {
            console.log(res);
            swal.fire("Harap Maaf!", "Akaun ini mesti menunggu 10 minit sebelum ingin menukar kata laluan yang baru.", "error");
        }
        else if (res.data.status == "success") {
            console.log(res);
            swal.fire({
              title: "Berjaya",
              html: "Kata laluan baru anda ialah <strong>"+res.data.password+"</strong>",
              icon: "success"});
            // window.location.href = "./usermanagement"
        }
        }).catch(err=>{})
      }
    })
  }
  const handleRemove = (e) => {
    console.log("Remove");
    swal.fire({
      title: 'Adakah anda pasti?',
      text: "Anda tidak akan dapat membalikkan tindakan ini!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Pasti',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        formData.append('mode','remove');
        axios.post(SERVER_URL+"int/api_generator.php?api_name=update_user",formData)
        .then(res=>{
          console.log(res);
          swal.fire({
            title:'',
            text:'Pengguna telah dihapuskan',
            icon:'warning',
            'timer': 3000
          })
          .then(res => {
            window.location.href = "./usermanagement"
            }
          )
        }).catch(err=>{console.log(err)})
      
      }
    })
  }
  console.log(showUser);
  return (
        <div className="w-full">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                <div className="block" id="link1">
                <Pane display="flex" paddingTop={3} paddingBottom={10} background="tint3">
                  <Pane flex={1} alignItems="right" display="flex">
                    <Button
                      className="float-right"
                      appearance="primary"
                      intent="none"
                      type="button"
                      onClick={handleBack}
                    >
                      Kembali
                    </Button>
                  </Pane>
                </Pane>

                  <Pane display="flex" padding={10} background="#dfe6e9" borderRadius={5}>
                    <Pane flex={1} alignItems="center" display="flex">
                      <Text size={600}>Profil Pengguna mymps</Text>
                    </Pane>
                  </Pane>

                  <Pane display="flex" padding={3} background="tint3" borderRadius={3} marginTop="10px">
                    <Pane flex={1} alignItems="center">
                      <TextInputField
                        label="NAMA PENUH"
                        width="100%"
                        placeholder="Sila isi nama penuh anda"
                        required={false}
                        disabled
                        defaultValue={showUser.U_USERNAME}
                        // onChange={(e) => setUsername(e.target.value)}
                      />

                      <TextInputField
                        label="NOMBOR KAD PENGENALAN"
                        width="100%"
                        placeholder="Sila isi nombor kad pengenalan anda"
                        required={false}
                        disabled
                        defaultValue={showUser.U_USERIC}
                      />

                      <TextInputField
                        label="ALAMAT EMEL"
                        width="100%"
                        placeholder="Sila isi alamat emel anda"
                        required={false}
                        disabled
                        defaultValue={showUser.U_USEREMAIL}
                        // onChange={(e) => setEmail(e.target.value)}
                      />

                      <TextInputField
                        label="NOMBOR TELEFON"
                        width="100%"
                        placeholder="Sila isi nombor telefon anda"
                        required={false}
                        disabled
                        defaultValue={showUser.U_USERPHONE}
                        // onChange={(e) => setTelephone(e.target.value)}
                      />

                      <TextInputField
                        label="STATUS"
                        width="100%"
                        placeholder=""
                        required={false}
                        disabled
                        defaultValue={showUser.U_USERSTATUS}
                        // onChange={(e) => setTelephone(e.target.value)}
                      />
                      
                    </Pane>
                  </Pane>

                  <Pane display="flex" padding={3}>
                  {showUser.U_USERSTATUS === 'Pending' ? 
                    <Pane flex={1} display="flex">
                            <Button
                              className="float-left"
                              appearance="primary"
                              intent="warning"
                              type="button"
                              onClick={handleApprove}
                            >
                              Sahkan
                            </Button>
                      </Pane>
                      : '' }


                    </Pane>

                      <Pane  display="flex" padding={3} marginTop="10px">
                        <Pane flex={1} alignItems="center" display="flex">
                          <Button
                            className=""
                            appearance="primary"
                            intent="danger"
                            type="button"
                            onClick={handleRemove}
                          >
                            Hapus
                          </Button>
                        </Pane>
                        <Pane marginRight={0}>
                          <Button
                            className=""
                            appearance="primary"
                            intent="success"
                            type="button"
                            onClick={handleUpdate}
                          >
                            Tetapkan Semula Kata Laluan
                          </Button>
                          </Pane>
                      </Pane>

                </div>
              </div>
            </div>
          </div>
      </div>
  );

}
