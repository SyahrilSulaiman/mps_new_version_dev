import React, { createContext, useState, useEffect } from 'react';
import { TickCircleIcon, CrossIcon } from "evergreen-ui";

export const SelectedBillContext = createContext();

const SelectedBillContextProvider = (props) => {
    const [selectedBil,setSelectedBil] = useState([]);
    const [unpaidBil, setUnpaidBil] = useState([]);

    const handleUnpaidBil = (dataset) => {
      const results = dataset.data.filter( json => json[3][0].STATUS.toUpperCase().includes('PENDING PAYMENT'))
      setUnpaidBil(results); 
    }

    useEffect(() => {
      // console.log('Unpaid : ', unpaidBil)
    },[unpaidBil])
    
    const addSelectedBill = (dataset) => {
        let newArray = [...selectedBil]
        let index = newArray.findIndex(element => element.NOAKAUN === dataset.NOAKAUN)
        if(index !== -1){
          newArray.splice(index,1);
          setSelectedBil(newArray);
        }
        else{
          setSelectedBil([...selectedBil,dataset])
        }
    }

    const handleBgChange = (account) => {
      let newArray = [...selectedBil]
      let index = newArray.findIndex(element => element.NOAKAUN === account)
      if(index !== -1){
        return "bg-gray-400"
      }
      else{
        return "bg-gray-200"
      }
    }

    const handleSelectedBil = (account) => {
        let newArray = [...selectedBil]
        let index = newArray.findIndex(element => element.NOAKAUN === account)
        if(index !== -1){
          return <CrossIcon marginTop={40} marginLeft={10} color="danger"/>
        }
        else{
          return <TickCircleIcon marginTop={40} marginLeft={10} color="success" />
        }
    }

    const resetSelectedBill = () => {
        setSelectedBil([]);
    }
    
    useEffect(() => {
		// console.log('Selected Bil :', selectedBil)
    },[selectedBil])
    
    return ( 
        <SelectedBillContext.Provider value={{selectedBil, addSelectedBill, resetSelectedBill, handleSelectedBil, handleUnpaidBil, unpaidBil, handleBgChange}}>
            {props.children}
        </SelectedBillContext.Provider>
     );
}
 
export default SelectedBillContextProvider;