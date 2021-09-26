import React, { useState, useContext } from "react";
import { TRANSLATION } from "../../Translation";
import { Pane, Button, Heading, TextInputField, Text, Dialog, toaster } from "evergreen-ui";
import swal from "sweetalert";
import { SERVER_URL } from '../../Constants';
import { ContextHandler } from "../../contexts/ContextHandler";
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
  const { language } = useContext(ContextHandler)
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

    if (namapenuh === "") {
      swal("Opss!", TRANSLATION[language].MESSAGE.emptyNameMessage, "error");
      return false;
    }
    else if (emel === "") {
      swal("Opss!", TRANSLATION[language].MESSAGE.emptyEmailMessage, "error");
      return false;
    }
    else if (telefon === "") {
      swal("Opss!", TRANSLATION[language].MESSAGE.emptyPhoneMessage, "error");
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

      var urlAPI = SERVER_URL+"int/api_generator.php?api_name=update_profile";

      fetch(urlAPI, requestOptions)
        .then(response => response.json())
        .then(result => {

          if (result.status.toLowerCase() === "success") {

            setLoading("false");

            sessionStorage.removeItem('username');
            sessionStorage.removeItem('email');
            sessionStorage.setItem('username', result.data[0]["U_USERNAME"]);
            sessionStorage.setItem('email', result.data[0]['U_USEREMAIL']);

            swal("Berjaya", TRANSLATION[language].MESSAGE.successUpdateProfileMessage, "success")
              .then(() => {
                window.location.href = "/setting";
              });


          }
          else {
            setLoading("false");
            swal("Ralat!", TRANSLATION[language].MESSAGE.failUpdateProfileMessage, "error");
          }

        })
    }
  }

  const handleChangePassword = () => {
    
    setDialog2(false);

    if (password === "") 
    {
      toaster.danger(TRANSLATION[language].CONSTANT.NO_PASSWORD, {description:TRANSLATION[language].MESSAGE.emptyPasswordMessage, id:"forbidden-action"});
    } 
    else if (new_password === "") 
    {
      toaster.danger(TRANSLATION[language].CONSTANT.NO_NEW_PASSWORD, {description:TRANSLATION[language].MESSAGE.emptyPasswordMessage, id:"forbidden-action"});
    } 
    else if (conf_password === "") 
    {
      toaster.danger(TRANSLATION[language].CONSTANT.NO_CONFIRM_PASSWORD, {description:TRANSLATION[language].MESSAGE.emptyPasswordMessage, id:"forbidden-action"});
    } 
    else if (new_password !== conf_password) 
    {
      toaster.danger(TRANSLATION[language].CONSTANT.INCORRECT_PASSWORD, {description:TRANSLATION[language].MESSAGE.incorrectPasswordMessage, id:"forbidden-action"});
    }
    else if (!String(new_password).match(/[a-zA-z]/g) || !String(new_password).match(/\b/g) || new_password.length < 8) {
      toaster.danger(TRANSLATION[language].CONSTANT.UNSAFE_PASSWORD, {description:TRANSLATION[language].REGISTER.PASSWORD.SUBTITLE, id:"forbidden-action"});
    } 
    else {

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

              fetch(SERVER_URL+"int/api_generator.php?api_name=update_password", requestOptions)
                .then(response => response.json())
                .then(result => {
                  if (result.status.toLowerCase() === "pending") {
                    swal("Maaf", TRANSLATION[language].MESSAGE.resetPasswordWaitingMessage, "error")
                      .then(() => {
                        window.location.href = "/setting";
                      });
                  }
                  else if (result.status.toLowerCase() === "success") {
                    swal("Berjaya", TRANSLATION[language].MESSAGE.successUpdateProfileMessage, "success")
                      .then(() => {
                        window.location.href = "/setting";
                      });
                  } else {
                    swal("Maaf", TRANSLATION[language].MESSAGE.failUpdateProfileMessage, "error")
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
              {TRANSLATION[language].PROFILE.PROFILE.BUTTON}
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
              {TRANSLATION[language].CONSTANT.PASSWORD}
              </a>
          </li>
        </ul>

        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
          <div className="px-4 py-5 flex-auto">
            <div className="tab-content tab-space">
              <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                
                  <Pane display="flex" padding={10} background="#dfe6e9" borderRadius={5}>
                    <Pane flex={1} alignItems="center" display="flex">
                      <Text size={600}>{TRANSLATION[language].PROFILE.PROFILE.TITLE}</Text>
                    </Pane>
                  </Pane>

                  <Pane display="flex" padding={3} background="tint3" borderRadius={3} marginTop="30px">
                    <Pane flex={1} alignItems="center">
                      <TextInputField
                        label={TRANSLATION[language].PROFILE.PROFILE.NAMA_PENUH}
                        width="100%"
                        placeholder={TRANSLATION[language].PROFILE.PROFILE.PLACEHOLDER.NAME}
                        required={true}
                        defaultValue={namapenuh}
                        onChange={(e) => setUsername(e.target.value)}
                      />

                      <TextInputField
                        label={TRANSLATION[language].CONSTANT.NOKP}
                        width="100%"
                        placeholder={TRANSLATION[language].PROFILE.PROFILE.PLACEHOLDER.NOKP}
                        required={true}
                        disabled
                        defaultValue={kadpengenalan}
                      />

                      <TextInputField
                        label={TRANSLATION[language].PROFILE.PROFILE.EMAIL}
                        width="100%"
                        placeholder={TRANSLATION[language].PROFILE.PROFILE.PLACEHOLDER.EMAIL}
                        required={true}
                        defaultValue={emel}
                        disabled
                      />

                      <TextInputField
                        label={TRANSLATION[language].PROFILE.PROFILE.PHONE}
                        width="100%"
                        placeholder={TRANSLATION[language].PROFILE.PROFILE.PLACEHOLDER.PHONE}
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
                      {TRANSLATION[language].CONSTANT.UPDATE}
                    </Button>
                  </Pane>
                
              </div>
              <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                
                  <Pane display="flex" padding={10} background="#dfe6e9" borderRadius={5}>
                    <Pane flex={1} alignItems="center" display="flex">
                      <Text size={600}>{TRANSLATION[language].CONSTANT.CONFIRM+" "+TRANSLATION[language].CONSTANT.PASSWORD}</Text>
                    </Pane>
                  </Pane>

                  <Pane padding={3} background="tint3" borderRadius={3} marginTop="30px">
                    <TextInputField
                      type="password"
                      label={TRANSLATION[language].CONSTANT.PASSWORD}
                      width="100%"
                      placeholder={TRANSLATION[language].PROFILE.PASSWORD.PLACEHOLDER.CURRENT_PASSWORD}
                      required={true}
                      onChange={(e) => setPassword(e.target.value)}
                    />

                    <TextInputField
                      type="password"
                      label={TRANSLATION[language].PROFILE.PASSWORD.NEW_PASSWORD}
                      width="100%"
                      placeholder={TRANSLATION[language].PROFILE.PASSWORD.PLACEHOLDER.NEW_PASSWORD}
                      required={true}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />

                    <TextInputField
                      type="password"
                      label={TRANSLATION[language].CONSTANT.CONFIRM+' '+TRANSLATION[language].PROFILE.PASSWORD.NEW_PASSWORD}
                      width="100%"
                      placeholder={TRANSLATION[language].PROFILE.PASSWORD.PLACEHOLDER.CONFIRM_PASSWORD}
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
                      {TRANSLATION[language].CONSTANT.UPDATE}
                      </Button>
                  </Pane>
                
              </div>
            </div>
          </div>
        </div>
        <Dialog
          isShown={dialog}
          title={TRANSLATION[language].PROFILE.MESSAGE.updateAccountTitle}
          onConfirm={() => handleUpdate()}
          onCancel={() => setDialog(false)}
          cancelLabel={TRANSLATION[language].CONSTANT.NO}
          intent="danger"
          confirmLabel={TRANSLATION[language].CONSTANT.YES}
          // intent="success"
          shouldCloseOnOverlayClick={false}
        >
          {TRANSLATION[language].PROFILE.MESSAGE.updateAccountMessage}
        </Dialog>

        <Dialog
          isShown={dialog2}
          title={TRANSLATION[language].PROFILE.MESSAGE.updatePasswordTitle}
          onConfirm={() => handleChangePassword()}
          onCancel={() => setDialog2(false)}
          cancelLabel={TRANSLATION[language].CONSTANT.NO}
          intent="danger"
          confirmLabel={TRANSLATION[language].CONSTANT.YES}
          // intent="success"
          shouldCloseOnOverlayClick={false}
        >
          {TRANSLATION[language].PROFILE.MESSAGE.updatePasswordMessage}
        </Dialog>
      </div>

    </>
  );
}
