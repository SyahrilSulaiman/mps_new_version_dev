import React, { useContext } from 'react'
import { Pane, Heading, Strong, } from "evergreen-ui";
import { SelectedBillContext } from '../contexts/SelectedBillContext';

function BillCardList() {
  sessionStorage.removeItem("cukai")
  
  const { addSelectedBill, handleSelectedBil, handleBgChange } = useContext(SelectedBillContext)
  
  const handleViewBill = (e) => {
    sessionStorage.setItem("noakaun", btoa(btoa(e)));
    // window.location.href = "/bill_cukai_taksiran";
  };

  const handleBayar = (cukai, amount, penama, akaun) => {

    var array = [];
    array["CUKAI"] = cukai;
    array["TUNGGAKAN"] = amount;
    array["PEMILIK"] = penama;
    array["AKAUN"] = akaun;

    sessionStorage.setItem("INFO", btoa(btoa(btoa(JSON.stringify(array)))));
    sessionStorage.setItem("noakaun", btoa(btoa(akaun)));
    // window.location.href = "/PengesahanPembayaran?Cukai=" + btoa(cukai);
  };

  const data = { account:"", status:"", kp:"", ssm:"", owner:"", amount:""}

  

  return (
        <div
          className=" w-full"
        >
          <div className="flex flex-wrap ">
            <div className="w-full px-6 border-white">
              <Pane
                borderColor="white"
                width="100%"
                className={"p-2 border cursor-pointer hover:bg-gray-500 " + handleBgChange(data.account) }
                display="grid"
                gridTemplateColumns="40px 1fr 10px"
              >
                <Pane color="gray" alignContent="right" justifyContent="center" onClick={ (e) => addSelectedBill(data) }>
                  { handleSelectedBil(data.account) }
                </Pane>
                <Pane 
                onClick={ data.status === "PENDING PAYMENT" ? (e) => handleBayar(data.account, data.amount, data.owner, data.account) : () => handleViewBill(data.account) }
                >
                  <table border="1" cellPadding="0" className="text-left overflow-x:auto">
                    <tbody>
                      <tr>
                        <th width="110px">
                          <Heading size={200}>{ data.kp === null ? "No. SSM Syarikat" : "No. Kad Pengenalan" }
                          </Heading>
                        </th>
                        <td>
                            <Strong size={300}> : { data.kp === null ? data.ssm : data.kp } </Strong>
                        </td>
                      </tr>
                      <tr>
                        <th><Heading size={200}>No. Akaun </Heading></th>
                        <td>
                          <Strong size={300}> : {data.account === null ? "-" : data.account} </Strong>
                        </td>
                      </tr>
                      <tr>
                        <th><Heading size={200}>Nama Pemilik </Heading></th>
                        <td>
                          <Strong size={300}> : {data.owner === null ? "-" : data.owner} </Strong>
                        </td>
                      </tr>
                      <tr>
                        <th><Heading size={200}>Status </Heading></th>
                        <td>
                          <Strong size={300} color={ data.status === "PAID" ? "#47B881" : "#EC4C47"}>: { data.owner === null ? "-" : data.status == "PAID" ? "TELAH DIBAYAR" : "TERTUNGGAK" }</Strong>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Pane>
                <Pane color="gray" alignContent="right" justifyContent="center" onClick={ data.status === "PENDING PAYMENT" ? (e) => handleBayar(data.account, data.amount, data.owner, data.account) : () => handleViewBill(data.account) }>
                  <i className="pt-12 fas fa-chevron-right"></i>
                </Pane>
              </Pane>
            </div>
          </div>
        </div>
  )
}

export default BillCardList
