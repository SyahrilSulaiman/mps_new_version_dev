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
    dataset.data.map((bill) => {
      let amount = bill.BAKI_DAHULU + bill.CAJ_DIKENAKAN + bill.CUKAI_SEMASA+ bill.TMP_LAIN+ bill.TUNGGAKAN_SEMASA+ bill.WARAN_TAHANAN;
      return (
        <div
          className=" w-full"
          key={bill.NOAKAUN}
        >
          <div className="flex flex-wrap ">
            <div className="w-full px-2 border-white">
              <Pane
                borderColor="white"
                width="100%"
                // background={}
                className={"p-2 border cursor-pointer hover:bg-gray-500 " + handleBgChange(bill.NOAKAUN)}
                display="grid"
                gridTemplateColumns="40px 1fr 10px"
              >
                <Pane color="gray" alignContent="right" justifyContent="center" onClick={(e) => addSelectedBill(bill.NOAKAUN,amount)}>
                  {handleSelectedBil(bill.NOAKAUN)}
                </Pane>
                <Pane onClick={ bill.STATUS !== "PAID" ? (e) => handleBayar(bill.NOAKAUN, amount, bill.NAMA_PEMILIK, bill.NOAKAUN) : () => handleViewBill(bill.NOAKAUN) }>
                  <table border="1" cellPadding="0" className="text-left overflow-x:auto">
                    <tbody>
                      <tr>
                        <th width="110px"><Heading size={200}>{bill.NOKP === null ? "No. SSM Syarikat" : "No. Kad Pengenalan"}</Heading></th>
                        <td><Strong size={300}> : {bill.NOKP === null ? bill.NOSSM : bill.NOKP}</Strong ></td>
                      </tr>
                      <tr>
                        <th><Heading size={200}>No. Akaun </Heading></th>
                        <td><Strong size={300}> : {bill.NOAKAUN === null ? "-" : bill.NOAKAUN}</Strong></td>
                      </tr>
                      <tr>
                        <th><Heading size={200}>Nama Pemilik </Heading></th>
                        <td><Strong size={300}> : {bill.NAMA_PEMILIK === null ? "-" : bill.NAMA_PEMILIK}</Strong></td>
                      </tr>
                      <tr>
                        <th><Heading size={200}>Status </Heading></th>
                        <td><Strong size={300} color={bill.STATUS === "PAID" ? "#47B881" : "#EC4C47"}> : {bill.NAMA_PEMILIK === null ? "-" : bill.STATUS == "PAID" ? "TELAH DIBAYAR" : "TERTUNGGAK"}</Strong></td>
                      </tr>
                    </tbody>
                  </table>
                </Pane>
                <Pane color="gray" alignContent="right" justifyContent="center" onClick={ bill.STATUS !== "PAID" ? (e) => handleBayar(bill.NOAKAUN, amount, bill.NAMA_PEMILIK, bill.NOAKAUN) : () => handleViewBill(bill.NOAKAUN) }>
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
