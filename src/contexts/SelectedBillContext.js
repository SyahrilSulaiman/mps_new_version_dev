import React, { createContext, useState, useEffect } from 'react';
import { TickCircleIcon, CrossIcon } from "evergreen-ui";

export const SelectedBillContext = createContext();

const SelectedBillContextProvider = (props) => {
    const [selectedBil,setSelectedBil] = useState([]);
    const [unpaidBil, setUnpaidBil] = useState([]);

    const handleUnpaidBil = (dataset) => {

      const tmptArr = [];
      dataset.data.map((bill,index) => {
        if(bill[3][0].STATUS.toUpperCase() === 'PENDING PAYMENT'){
          tmptArr.push(bill[0][0]);
        }
      })
      setUnpaidBil(tmptArr); 
    }

    useEffect(() => {
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
    },[selectedBil])
    
    return ( 
        <SelectedBillContext.Provider value={{selectedBil, addSelectedBill, resetSelectedBill, handleSelectedBil, handleUnpaidBil, unpaidBil, handleBgChange}}>
            {props.children}
        </SelectedBillContext.Provider>
     );
}
 
export default SelectedBillContextProvider;