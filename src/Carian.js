import Axios from 'axios';
import React, {useState, useEffect} from 'react'
import swal from 'sweetalert'
import {Heading, Text, Paragraph, Button, toaster, Pane, CrossIcon} from "evergreen-ui";

export default function Carian({bill,type, display, handleAdd, array}){
    const [loading,setLoading] = useState(false);
    let accountType = "";
    useEffect(()=>{
        // console.log('Selected Bill :', array);
    },[array])

        useEffect(() =>{
            if(type === 'nokp')
            accountType = 'No Kad Pengenalan';
            if(type === 'akaun')
            accountType = 'Akaun';
            if(type === 'ssm')
            accountType = 'No SSM';
        },[bill]);


    
    if(!display){
        return (
            <div>
            </div>
        );
    }
    else{
        if( bill.length === 1 || type === 'akaun' )
        {
            return (
                <div>
                        <Pane marginTop={5} paddingLeft={5} background="#ffffff">
                            <Heading size={200} textAlign="left" >
                                Tekan pada bil untuk ditambah
                            </Heading>
                        </Pane>
                    <div key={bill[0].NOAKAUN} className="mx-auto w-full" onClick={() => handleAdd(bill[0].STATUS,bill[0].NOAKAUN)}>
                        <Pane display="grid" gridTemplateColumns="40px 1fr 40px" marginBottom={10} className="hover:bg-gray-400">
                            <Pane padding={20} justifyContent="center" marginTop={7}>
                                {/* <CrossIcon /> */}
                            </Pane>
                            <Pane padding={10}>
                                <Heading size={200}>{"AKAUN " + bill[0].NOAKAUN}</Heading>
                                <Heading size={200}>{bill[0].NAMA_PEMILIK}</Heading>
                                <Heading size={100}>{bill[0].ADDRHARTA}</Heading>
                            </Pane>
                            <Pane padding={20} justifyContent="center" marginTop={7}>
                                <i className="fas fa-chevron-right"></i>
                            </Pane>
                        </Pane>
                    </div>
                </div>)
        }

        else{
        return (
            <div>
                <Pane marginTop={5} background="#ffffff">
                    <Heading size={200} textAlign="center" >
                      Sila pilih bil untuk ditambah
                    </Heading>
                </Pane>
                <Pane marginTop={5}>
                    <Heading size={200} textAlign="center" >
                      
                    </Heading>
                </Pane>
            {
                bill.map(bills => (
                    <div key={bills.NOAKAUN} className="mx-auto w-full" onClick={() => handleAdd(bills.STATUS,bills.NOAKAUN)}>
                        <Pane display="grid" gridTemplateColumns="40px 1fr 40px" marginBottom={10} className={"cursor-pointer "+ ((array.findIndex(element => element.account === bills.NOAKAUN) !== -1 )? 'bg-green-300 hover:bg-green-400' : 'bg-gray-300 hover:bg-gray-400')}>
                            <Pane padding={20} justifyContent="center" marginTop={7}>

                                {
                                    /* (array.findIndex(element => element.account === bills.NOAKAUN) !== -1 )? <CrossIcon /> : '' */
                                }
                                
                            </Pane>
                            <Pane padding={10}>
                                <Heading size={200}>{"AKAUN " + bills.NOAKAUN}</Heading>
                                <Heading size={200}>{bills.NAMA_PEMILIK}</Heading>
                                <Heading size={100}>{bills.ADDRHARTA}</Heading>
                            </Pane>
                            <Pane padding={20} justifyContent="center" marginTop={7}>
                                {/* <i className="fas fa-chevron-right"></i> */}
                            </Pane>
                        </Pane>
                    </div>
                )
            )
        }
            </div>
        );
    }
    }
}