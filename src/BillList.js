import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { getNOKP } from "./Utils/Common";
import swal from "sweetalert";
import NoScroll from "no-scroll";
import BayarCukai from "./BayarCukai";
import { Pane, Spinner, Heading, Strong, Button, Icon, ArrowLeftIcon, DocumentIcon, AddIcon, CrossIcon } from "evergreen-ui";
import { SelectedBillContext } from "./contexts/SelectedBillContext";

export default function BillList({dataset,isNoData}) {

  sessionStorage.removeItem("cukai");
  const nokp = getNOKP();
  const displayKP = '<h5 className="uppercase font-medium text-xs text-gray-600">No Kad Pengenalan </h5>';

  const handleViewBill = (e) => {
    sessionStorage.setItem("noakaun", btoa(btoa(e)));
    window.location.href = "/bill_cukai_taksiran";
  };

  const handleBayar = (cukai, amount, penama, akaun) => {

    var array = [];
    array["CUKAI"] = cukai;
    array["TUNGGAKAN"] = amount;
    array["PEMILIK"] = penama;
    array["AKAUN"] = akaun;

    sessionStorage.setItem("INFO", btoa(btoa(btoa(JSON.stringify(array)))));
    sessionStorage.setItem("noakaun", btoa(btoa(akaun)));
    window.location.href = "/PengesahanPembayaran?Cukai=" + btoa(cukai);
  };

  const {addSelectedBill, resetSelectedBill, handleSelectedBil, handleBgChange} = useContext(SelectedBillContext);

  // Reset selected bill guna context 'resetSelectedBill' 

  const bills = dataset.data.length ? (
    dataset.data.map((bill,index) => {
      let amount = bill[0][0].BAKI_DAHULU + bill[0][0].CAJ_DIKENAKAN + bill[0][0].CUKAI_SEMASA+ bill[0][0].TMP_LAIN+ bill[0][0].TUNGGAKAN_SEMASA+ bill[0][0].WARAN_TAHANAN;
      return (
        <div
          className=" w-full"
          key={bill[0][0].NOAKAUN}
        >
          <div className="flex flex-wrap ">
            <div className="w-full px-6 border-white">
              <Pane
                borderColor="white"
                width="100%"
                // background={}
                className={"p-2 border cursor-pointer hover:bg-gray-500 " + handleBgChange(bill[0][0].NOAKAUN)}
                display="grid"
                gridTemplateColumns="40px 1fr 10px"
              >
                <Pane color="gray" alignContent="right" justifyContent="center" onClick={(e) => addSelectedBill(bill[0][0])}>
                  {handleSelectedBil(bill[0][0].NOAKAUN)}
                </Pane>
                <Pane 
                onClick={ bill[3][0].STATUS === "PENDING PAYMENT" ? (e) => handleBayar(bill[0][0].NOAKAUN, amount, bill[0][0].NAMA_PEMILIK, bill[0][0].NOAKAUN) : () => handleViewBill(bill[0][0].NOAKAUN) }
                >
                  <table border="1" cellPadding="0" className="text-left overflow-x:auto">
                    <tbody>
                      <tr>
                        <th width="110px"><Heading size={200}>{bill[0][0].NOKP === null ? "No. SSM Syarikat" : "No. Kad Pengenalan"}</Heading></th>
                        <td><Strong size={300}> : {bill[0][0].NOKP === null ? bill[0][0].NOSSM : bill[0][0].NOKP}</Strong ></td>
                      </tr>
                      <tr>
                        <th><Heading size={200}>No. Akaun </Heading></th>
                        <td><Strong size={300}> : {bill[0][0].NOAKAUN === null ? "-" : bill[0][0].NOAKAUN}</Strong></td>
                      </tr>
                      <tr>
                        <th><Heading size={200}>Nama Pemilik </Heading></th>
                        <td><Strong size={300}> : {bill[0][0].NAMA_PEMILIK === null ? "-" : bill[0][0].NAMA_PEMILIK}</Strong></td>
                      </tr>
                      <tr>
                        <th><Heading size={200}>Status </Heading></th>
                        <td><Strong size={300} color={bill[3][0].STATUS === "PAID" ? "#47B881" : "#EC4C47"}> : {bill[0][0].NAMA_PEMILIK === null ? "-" : bill[3][0].STATUS == "PAID" ? "TELAH DIBAYAR" : "TERTUNGGAK"}</Strong></td>
                      </tr>
                    </tbody>
                  </table>
                </Pane>
                <Pane color="gray" alignContent="right" justifyContent="center" onClick={ bill[3][0].STATUS === "PENDING PAYMENT" ? (e) => handleBayar(bill[0][0].NOAKAUN, amount, bill[0][0].NAMA_PEMILIK, bill[0][0].NOAKAUN) : () => handleViewBill(bill[0][0].NOAKAUN) }>
                  <i className="pt-12 fas fa-chevron-right"></i>
                </Pane>
              </Pane>
            </div>
          </div>
        </div>
      );
    })
  ) : (

      <div className="w-full bg-transparent px-3">
        <Pane display="flex" alignItems="center" justifyContent="center" background="white" paddingY={100}>
          <Spinner />
        </Pane>
      </div>
    )

  if (isNoData) {
    return (
      <div className="w-full bg-transparent px-3">
        <Pane display="flex" alignItems="center" justifyContent="center" background="white" paddingY={100}>
          <Heading size={200}>Tekan pada butang <Button type="button" appearance="primary" intent="success">Tambah Bil</Button> untuk menambah bil.</Heading>
        </Pane>
      </div>
    )
  }
  else {
    return (
      <div className="">{bills}</div>
    );
  }
}
