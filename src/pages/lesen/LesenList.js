import React, { useContext } from 'react'
import { Pane, Heading, Strong, } from "evergreen-ui";
import { SelectedBillContext } from '../../contexts/SelectedBillContext';
import { Link } from 'react-router-dom';

function BillCardList({response, title}) {
  sessionStorage.removeItem("cukai")
  const { addSelectedBill, handleSelectedBil, handleBgChange } = useContext(SelectedBillContext)
  const data = { NOAKAUN:response[0].NOACC, STATUS:response[1].STATUS, NOKP:response[0].NOKP, NOSSM:response[0].REG_NO, NAMA_PEMILIK:response[0].OWNER, BAKI:response[1].BAKI, NAMA_SYARIKAT:response[0].COMP_NAME, ALAMAT_SYARIKAT:response[0].ALAMAT_PREMIS, TEMPOH_LESEN:response[0].TKH_TAMAT, TITLE:title}

  return (
        <div
          className=" w-full"
        >
          <div className="flex flex-wrap ">
            <div className="w-full px-6 border-white">
              <Pane
                borderColor="white"
                width="100%"
                className={"p-2 border cursor-pointer hover:bg-gray-500 " + handleBgChange(data.NOAKAUN) }
                display="grid"
                gridTemplateColumns="40px 1fr 10px"
              >
                <Pane color="gray" alignContent="right" justifyContent="center" onClick={ (e) => addSelectedBill(data) }>
                  { handleSelectedBil(data.NOAKAUN) }
                </Pane>
                <Link 
                  to={{
                    pathname: "/lesen",
                    state:{ data }
                  }}
                >
                  <table border="1" cellPadding="0" className="text-left overflow-x:auto">
                    <tbody>
                      <tr>
                        <th width="110px">
                          <Heading size={200}>{ data.NOKP === null ? "No. SSM Syarikat" : "No. Kad Pengenalan" }
                          </Heading>
                        </th>
                        <td>
                            <Strong size={300}> : { data.NOKP === null ? data.NOSSM : data.NOKP } </Strong>
                        </td>
                      </tr>
                      <tr>
                        <th><Heading size={200}>No. Akaun </Heading></th>
                        <td>
                          <Strong size={300}> : {data.NOAKAUN === null ? "-" : data.NOAKAUN} </Strong>
                        </td>
                      </tr>
                      <tr>
                        <th><Heading size={200}>Nama Pemilik </Heading></th>
                        <td>
                          <Strong size={300}> : {data.NAMA_PEMILIK === null ? "-" : data.NAMA_PEMILIK} </Strong>
                        </td>
                      </tr>
                      <tr>
                        <th><Heading size={200}>Status </Heading></th>
                        <td>
                          <Strong size={300} color={ data.STATUS === "PAID" ? "#47B881" : "#EC4C47"}>: { data.NAMA_PEMILIK === null ? "-" : data.STATUS == "PAID" ? "TELAH DIBAYAR" : "TERTUNGGAK" }</Strong>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Link>
                <Pane color="gray" alignContent="right" justifyContent="center" >
                  <i className="pt-12 fas fa-chevron-right"></i>
                </Pane>
              </Pane>
            </div>
          </div>
        </div>
  )
}

export default BillCardList
