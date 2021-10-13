import React, { useContext } from 'react'
import { Pane, Heading, Strong, } from "evergreen-ui";
import { ContextHandler } from '../../contexts/ContextHandler';
import { Link } from 'react-router-dom';
import { TRANSLATION } from "../../Translation";

function PermitList({response, title,code, type}) {
  sessionStorage.removeItem("cukai")
  const { addSelected, handleSelected, handleBgChange, language } = useContext(ContextHandler)
  const data = { NOAKAUN:response.NOAKAUN, STATUS:response.STATUS, NAMA_PEMILIK:response.NAMA_PEMILIK, NAMA_COMPANY:response.NAMA_COMPANY, KETERANGAN:response.KETERANGAN, BAKI:response.BAKI, ALAMAT:response.ALAMAT, DATE:response.DATE, DATE_END:response.DATE_END, TITLE:title, CODE:code, TYPE:type, PDF:response.PDF, PRINT:response.PRINT}

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
                <Pane color="gray" alignContent="right" justifyContent="center" onClick={ (e) => addSelected(data) }>
                  { handleSelected(data.NOAKAUN) }
                </Pane>
                <Link 
                  to={{
                    pathname: "/permit",
                    state:{ data }
                  }}
                >
                  <table border="1" cellPadding="0" className="text-left overflow-x:auto">
                    <tbody>
                      <tr>
                        <th><Heading size={200}>{TRANSLATION[language].CONSTANT.ACCOUNT_NO}</Heading></th>
                        <td>
                          <Strong size={300}> : {data.NOAKAUN === null ? "-" : data.NOAKAUN} </Strong>
                        </td>
                      </tr>
                      <tr>
                        <th><Heading size={200}>{TRANSLATION[language].CONSTANT.OWNER}</Heading></th>
                        <td>
                          <Strong size={300}> : {data.NAMA_PEMILIK === null ? "-" : data.NAMA_PEMILIK.toUpperCase()} </Strong>
                        </td>
                      </tr>
                      <tr>
                        <th width="110px">
                          <Heading size={200}>{ TRANSLATION[language].CONSTANT.COMPANY_NAME }
                          </Heading>
                        </th>
                        <td>
                            <Strong size={300}> : { data.NAMA_COMPANY === null ? "-" : data.NAMA_COMPANY } </Strong>
                        </td>
                      </tr>
                      <tr>
                        <th><Heading size={200}>{TRANSLATION[language].CONSTANT.PAYMENT_STATUS}</Heading></th>
                        <td>
                          <Strong size={300} color={ data.STATUS.toUpperCase() === "PAID"  || data.STATUS.toUpperCase() === 'O' ? "#47B881" : "#EC4C47"}>: { data.STATUS.toUpperCase() === "PAID"  || data.STATUS.toUpperCase() === 'O'  ?  TRANSLATION[language].CONSTANT.PAID.toUpperCase() : TRANSLATION[language].CONSTANT.PENDING.toUpperCase() }</Strong>
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

export default PermitList
