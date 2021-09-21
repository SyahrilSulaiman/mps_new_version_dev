import React, { createContext, useState, useEffect } from 'react';
import { TickCircleIcon, CrossIcon } from "evergreen-ui";

export const ContextHandler = createContext()

const ContextHandlerProvider = (props) => {
    const [selected, setSelected] = useState([])
    const [unpaid, setUnpaid] = useState([])

    useEffect(() => {},[unpaid])

    const handleUnpaid = (dataset) => {
        const tempArray = []
        dataset.data.map((element,index) => {
            if(element.STATUS.toUpperCase() === 'PENDING PAYMENT'){
                tempArray.push(element)
            }
            return tempArray
        })
        setUnpaid(tempArray)
    }

    const addSelected = (dataset) => {
        let tempArray = [...selected]
        let index = tempArray.findIndex(element => element.NOAKAUN === dataset.NOAKAUN)
        if(index !== -1){
            tempArray.splice(index,1)
            setSelected(tempArray)
        }
        else{
            setSelected([...selected,dataset])
        }
    }

    const handleBgChange = (account) => {
        let tempArray = [...selected]
        let index = tempArray.findIndex(element => element.NOAKAUN === account)
        if(index !== -1){
            return "bg-gray-400"
        }
        else{
            return "bg-gray-200"
        }
    }

    const handleSelected = (account) => {
        let tempArray = [...selected]
        let index = tempArray.findIndex(element => element.NOAKAUN === account)
        if(index !== -1){
            return <CrossIcon marginTop={40} marginLeft={10} color="danger"/>
        }
        else{
            return <TickCircleIcon marginTop={40} marginLeft={10} color="success" />
        }
    }

    const resetSelected = () => {
        setSelected([])
    }

    return ( 
        <ContextHandler.Provider value={{handleUnpaid, addSelected, handleBgChange, handleSelected, resetSelected, selected, unpaid}}>
            {props.children}
        </ContextHandler.Provider>
     );
}

export default ContextHandlerProvider