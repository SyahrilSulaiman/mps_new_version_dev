import React, { useState } from "react";
import { Pane, Button, Heading, TextInputField, Text, Dialog, toaster } from "evergreen-ui";
import swal from "sweetalert";

// components

const useFormInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return {
    value,
    onChange: handleChange,
  };
};

export default function CardSettings({
  nama = "",
  nokp = "",
  email = "",
  notel = "",
  color = "blue",
}) {

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [namapenuh, setUsername] = useState(nama);
  const [kadpengenalan, setIC] = useState(nokp);
  const [emel, setEmail] = useState(email);
  const [telefon, setTelephone] = useState(notel);
  const [password, setPassword] = useState("");
  const [new_password, setNewPassword] = useState("");
  const [conf_password, setConformPassword] = useState("");
  const [openTab, setOpenTab] = useState(1);
  const [dialog, setDialog] = useState(false);
  const [dialog2, setDialog2] = useState(false);

  const handleUpdate = () => {

    setDialog(false);

    if (namapenuh == "") {
      swal("Opss!", "Kata nama tidak boleh dikosongkan.", "error");
      return false;
    }
    else if (emel == "") {
      swal("Opss!", "Emel tidak boleh dikosongkan", "error");
      return false;
    }
    else if (telefon == "") {
      swal("Opss!", "Nombor telefon tidak boleh dikosongkan", "error");
      return false;
    }
    else {

      var formdata = new FormData();

      formdata.append("username", namapenuh.trim());
      formdata.append("email", emel.trim());
      formdata.append("nokp", kadpengenalan);
      formdata.append("notel", telefon.trim());

      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
      };

      var urlAPI = "https://mymps.corrad.my/int/api_generator.php?api_name=update_profile";

      fetch(urlAPI, requestOptions)
        .then(response => response.json())
        .then(result => {

          if (result.status == "success") {

            setLoading("false");

            sessionStorage.removeItem('username');
            sessionStorage.setItem('username', result.data[0]["U_USERNAME"]);

            sessionStorage.removeItem('email');
            sessionStorage.setItem('email', result.data[0]['U_USEREMAIL']);

            swal("Berjaya", "Akaun profil anda sudah dikemaskini.", "success")
              .then(() => {
                window.location.href = "/setting";
              });


          }
          else {
            setLoading("false");
            swal("Ralat!", "Kemaskini tidak berjaya.", "error");
          }

        })
    }
  }

  const handleChangePassword = () => {
    
    setDialog2(false);

    if (password == "") 
    {
      toaster.danger("Tiada Kata Laluan Semasa", {description:"Harap maaf. Sila isi kata laluan semasa anda.", id:"forbidden-action"});
    } 
    else if (new_password == "") 
    {
      toaster.danger("Tiada Kata Laluan Baharu", {description:"Harap maaf. Sila isi kata laluan baharu anda.", id:"forbidden-action"});
    } 
    else if (conf_password == "") 
    {
      toaster.danger("Tiada Kata Laluan Pengesahan", {description:"Harap maaf. Sila isi pengesahan kata laluan anda.", id:"forbidden-action"});
    } 
    else if (new_password !== conf_password) 
    {
      toaster.danger("Kata Laluan Tidak Sah", {description:"Harap maaf. Kata laluan yang baharu tidak disahkan.", id:"forbidden-action"});
    }
    else if (!String(new_password).match(/[a-zA-z]/g) || !String(new_password).match(/\b/g) || new_password.value.length < 8) {
      toaster.danger("Kata Laluan Tidak Selamat", {description:"Harap maaf. Kata laluan yang baharu perlu sekurang-kurangnya menpunya lapan (8) aksara, dan mesti terdiri daripada kombinasi huruf dan nombor.", id:"forbidden-action"});
    } 
    else {

      console.log(password);
      console.log(new_password);
      console.log(conf_password);

      swal("Anda pasti untuk set semula kata laluan anda?", {
        buttons: {
          cancel: "Tidak",
          teruskan: {
            text: "Teruskan",
            value: "pasti",
          }
        }
      })
        .then((value) => {
          switch (value) {
            case "pasti":

              var formdata = new FormData();
              formdata.append("old_password", password);
              formdata.append("new_password", new_password);
              formdata.append("conf_password", conf_password);
              formdata.append("userid", sessionStorage.getItem("nokp"));

              var requestOptions = {
                method: 'POST',
                body: formdata,
                redirect: 'follow'
              };

              fetch("https://mymps.corrad.my/int/api_generator.php?api_name=update_password", requestOptions)
                .then(response => response.json())
                .then(result => {
                  console.log(result);
                  if (result.status == "pending") {
                    swal("Maaf", "Anda perlu tunggu 10 minit sebelum membuat penukaran kata laluan semula.", "error")
                      .then(() => {
                        window.location.href = "/setting";
                      });
                  }
                  else if (result.status == "success") {
                    swal("Berjaya", "Kata laluan akaun telah berjaya ditukar", "success")
                      .then(() => {
                        window.location.href = "/setting";
                      });
                  } else {
                    swal("Maaf", "Kata laluan akaun tidak berjaya ditukar", "error")
                      .then(() => {
                        window.location.href = "/setting";
                      });
                  }
                }
                )
                .catch(error =>
                  console.log('error', error)
                );


              break;

            case "cancel":
              break;

            default:
          }

        })
    }
  }

  return (
    <>

      <div className="w-full">
        <ul className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row justify-center" role="tablist">
          <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
            <a
              className={
                "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                (openTab === 1
                  ? "text-white bg-" + color + "-600"
                  : "text-" + color + "-600 bg-white")
              }
              onClick={e => {
                e.preventDefault();
                setOpenTab(1);
              }}
              data-toggle="tab"
              href="#link1"
              role="tablist"
            >
              Profil
              </a>
          </li>
          <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
            <a
              className={
                "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                (openTab === 2
                  ? "text-white bg-" + color + "-600"
                  : "text-" + color + "-600 bg-white")
              }
              onClick={e => {
                e.preventDefault();
                setOpenTab(2);
              }}
              data-toggle="tab"
              href="#link2"
              role="tablist"
            >
              Kata Laluan
              </a>
          </li>
        </ul>

        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
          <div className="px-4 py-5 flex-auto">
            <div className="tab-content tab-space">
              <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                <p>
                  <Pane display="flex" padding={10} background="#dfe6e9" borderRadius={5}>
                    <Pane flex={1} alignItems="center" display="flex">
                      <Text size={600}>Profil Akaun mymps</Text>
                    </Pane>
                  </Pane>

                  <Pane display="flex" padding={3} background="tint3" borderRadius={3} marginTop="30px">
                    <Pane flex={1} alignItems="center">
                      <TextInputField
                        label="Nama Penuh"
                        width="100%"
                        placeholder="Sila isi nama penuh anda"
                        required={true}
                        defaultValue={namapenuh}
                        onChange={(e) => setUsername(e.target.value)}
                      />

                      <TextInputField
                        label="No Kad Pengenalan"
                        width="100%"
                        placeholder="Sila isi nombor kad pengenalan anda"
                        required={true}
                        disabled
                        defaultValue={kadpengenalan}
                      />

                      <TextInputField
                        label="Alamat Emel"
                        width="100%"
                        placeholder="Sila isi alamat emel anda"
                        required={true}
                        defaultValue={emel}
                        disabled
                      />

                      <TextInputField
                        label="Nombor Telefon"
                        width="100%"
                        placeholder="Sila isi nombor telefon anda"
                        required={true}
                        defaultValue={telefon}
                        onChange={(e) => setTelephone(e.target.value)}
                      />
                    </Pane>
                  </Pane>
                  <Pane>
                    <Button
                      className="float-right"
                      appearance="primary"
                      intent="success"
                      type="button"
                      onClick={() => setDialog(true)}
                    >
                      Kemaskini
                    </Button>
                  </Pane>
                </p>
              </div>
              <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                <p>
                  <Pane display="flex" padding={10} background="#dfe6e9" borderRadius={5}>
                    <Pane flex={1} alignItems="center" display="flex">
                      <Text size={600}>Kemaskini Kata Laluan</Text>
                    </Pane>
                  </Pane>

                  <Pane padding={3} background="tint3" borderRadius={3} marginTop="30px">
                    <TextInputField
                      type="password"
                      label="Kata Laluan Semasa"
                      width="100%"
                      placeholder="Sila isi kata laluan terkini"
                      required={true}
                      onChange={(e) => setPassword(e.target.value)}
                    />

                    <TextInputField
                      type="password"
                      label="Kata Laluan Baharu"
                      width="100%"
                      placeholder="Sila isi kata laluan baru"
                      required={true}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />

                    <TextInputField
                      type="password"
                      label="Sah Kata Laluan Baharu"
                      width="100%"
                      placeholder="Sila sahkan kata laluan baru"
                      required={true}
                      onChange={(e) => setConformPassword(e.target.value)}
                    />
                  </Pane>

                  <Pane>
                    <Button
                      className="float-right"
                      appearance="primary"
                      intent="success"
                      type="button"
                      onClick={() => setDialog2(true)}
                    >
                      Kemaskini
                      </Button>
                  </Pane>
                </p>
              </div>
            </div>
          </div>
        </div>
        <Dialog
          isShown={dialog}
          title="Pengesahan Kemaskini Profil"
          onConfirm={() => handleUpdate()}
          onCancel={() => setDialog(false)}
          cancelLabel="Tidak"
          intent="danger"
          confirmLabel="Ya"
          intent="success"
          shouldCloseOnOverlayClick={false}
        >
          Anda pasti untuk kemaskini maklumat akaun anda?
        </Dialog>

        <Dialog
          isShown={dialog2}
          title="Pengesahan Kemaskini Kata Laluan"
          onConfirm={() => handleChangePassword()}
          onCancel={() => setDialog2(false)}
          cancelLabel="Tidak"
          intent="danger"
          confirmLabel="Ya"
          intent="success"
          shouldCloseOnOverlayClick={false}
        >
          Anda pasti untuk kemaskini kata laluan akaun anda?
        </Dialog>
      </div>

    </>
  );
}
