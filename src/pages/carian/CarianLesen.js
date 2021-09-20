import React,{useState, useEffect} from 'react'
import useFetch from "../../hooks/useFetch"
import swal from 'sweetalert'
import {Heading, Text, Paragraph, Button, toaster, Pane, CrossIcon} from "evergreen-ui";
import { getNOKP, getEmail, setAuthorization } from "../../Utils/Common";
import { SERVER_URL } from '../../Constants';

function HasilCarian({response,loading, handleAdd, array}) {
    if(loading){
        return (<div></div>)
    }
    else{
        if(response.status === 'FAILED'){
            return(
                <div>
                    <Pane marginTop={5} paddingLeft={5} background="#ffffff">
                        <Heading size={200} textAlign="left" >
                            Lesen tidak dijumpai
                        </Heading>
                    </Pane>
                </div>
            )
        }
        else{
            return(
                response.map((res) => {
                    return (
                        <div key={res.NOACC} className="mx-auto w-full" 
                        onClick={() => handleAdd(res.NOACC)}
                        >
                            <Pane display="grid" gridTemplateColumns="40px 1fr 40px" marginBottom={10} className={"cursor-pointer "+ ((array.findIndex(element => element.account === res.NOACC) !== -1 )? 'bg-green-300 hover:bg-green-400' : 'bg-gray-300 hover:bg-gray-400')}>
                                <Pane padding={20} justifyContent="center" marginTop={7}>
                                </Pane>
                                <Pane padding={10}>
                                    <Heading size={200}>{"AKAUN " + res.NOACC}</Heading>
                                    <Heading size={200}>{res.OWNER}</Heading>
                                    <Heading size={100}>{"REG NO " + (res.REG_NO === null ? '-' : res.REG_NO)}</Heading>
                                </Pane>
                                <Pane padding={20} justifyContent="center" marginTop={7}>
                                    <i className="fas fa-chevron-right"></i>
                                </Pane>
                            </Pane>
                        </div>
                    )
                })
            )
        }
    }
}

export default HasilCarian
