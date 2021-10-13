import React,{ useState } from 'react'
import { Pane, TextInputField, Button, SearchIcon, ArrowLeftIcon, Heading, toaster } from "evergreen-ui";
import CarianItem from './CarianItem';
import { getNOKP, getEmail, setAuthorization } from "../../Utils/Common";
import { SERVER_URL } from '../../Constants';
import { TRANSLATION } from '../../Translation';
import { ContextHandler } from "../../contexts/ContextHandler";
import { useContext } from 'react'
import swal from 'sweetalert';
import NoScroll from 'no-scroll'

function CarianList({type, code, carianBy, searchCode}) {
    NoScroll.on()
    const [search, setSearch] = useState("");
    const [display, setDisplay] = useState(false);
    const [array, setArray] = useState([]);
    const {language} = useContext(ContextHandler)

    // fetch state
    const [ response, setResponse ] = useState(null)
    const [ loading, setLoading ] = useState(true)
    const [ error, setError ] = useState(null)
    const abortCont = new AbortController()
    const nokp = getNOKP();
    const email = getEmail();
    const auth = setAuthorization(nokp,email);

    // add state
    const [addLoading, setAddLoading] = useState(false);

    const handleAddThis = () => {
      const url = SERVER_URL+"int/api_generator.php?api_name=newV2&mode=many&type="+carianBy+"&code="+code
      const addHeader = new Headers()
      const addData = new FormData()
      const accountAdded = JSON.stringify(array);
      addHeader.append('TOKEN',auth);
      addData.append('nokp', nokp)
      addData.append('account', accountAdded)
      
      setAddLoading(true)
      const requestOptions = {
        method : 'POST',
        redirect : 'follow',
        body : addData,
        headers : addHeader,
        signal: abortCont.signal
      }
      fetch(url, requestOptions)
    .then(res => {
        if(!res.ok){
            throw Error("Could't fetch response from the resource")
        }
        return res.json()
    })
    .then(response => {
        setAddLoading(false)
        setError(null)
        if(response.status === "success")
        {
            toaster.success(TRANSLATION[language].MESSAGE.addMessage,{id:"forbidden-action"})
        }
        else if(response.status === "failure")
        {
            toaster.danger(TRANSLATION[language].MESSAGE.failToAddMessage,{id:"forbidden-action"});
        }
        else
        {
            toaster.danger(TRANSLATION[language].MESSAGE.errorMessage,{id:"forbidden-action"});
        }
    })
    .catch(err => {
        if(err.name === "AbortError"){
            console.log("fetch aborted")
        }
        else{
            setAddLoading(false)
            setError(err.message)
            toaster.danger(error,{id:"forbidden-action"});
        }
    })
    }

    const addAll = () => {
      let account = []
      response.map((res,index) =>  account.push({account:res.NOAKAUN}));
      const url = SERVER_URL+"int/api_generator.php?api_name=newV2&mode=many&type="+carianBy+"&code="+code
      const addHeader = new Headers()
      const addData = new FormData()
      const accountAdded = JSON.stringify(account);
      addHeader.append('TOKEN',auth);
      addData.append('nokp', nokp)
      addData.append('account', accountAdded)
      
      setAddLoading(true)
      const requestOptions = {
        method : 'POST',
        redirect : 'follow',
        body : addData,
        headers : addHeader,
        signal: abortCont.signal
      }
      fetch(url, requestOptions)
    .then(res => {
        if(!res.ok){
            throw Error("Could't fetch response from the resource")
        }
        return res.json()
    })
    .then(response => {
        setAddLoading(false)
        setError(null)
        if(response.status === "success")
        {
            toaster.success(TRANSLATION[language].MESSAGE.addMessage,{id:"forbidden-action"})
        }
        else if(response.status === "failure")
        {
            toaster.danger(TRANSLATION[language].MESSAGE.failToAddMessage,{id:"forbidden-action"});
        }
        else
        {
            toaster.danger(TRANSLATION[language].MESSAGE.errorMessage,{id:"forbidden-action"});
        }
    })
    .catch(err => {
        if(err.name === "AbortError"){
            console.log("fetch aborted")
        }
        else{
            setAddLoading(false)
            setError(err.message)
            toaster.danger(error,{id:"forbidden-action"});
        }
    })
    }

    const resetArray = () => {
      setArray([]);
    }

    const handleChange = (e) => {
        setSearch(e.target.value);
    }

    const handleSubmit = () => {
      const url = SERVER_URL+"int/api_generator.php?api_name=searchV2&type="+carianBy+"&code="+searchCode
      const headers = new Headers();
      headers.append('TOKEN',auth);
      
      const formData = new FormData()
      formData.append('search',search.trim())
      formData.append('type',type.trim())
      
      const requestOptions = {
      method : 'POST',
      redirect : 'follow',
      // mode: 'no-cors',
      body : formData,
      headers : headers,
      signal: abortCont.signal
    }
      fetch(url,requestOptions)
      .then(res => {
        if(!res.ok){
            throw Error("Could't fetch response from the resource")
          }
          setDisplay(false)
          return res.json()
        })
        .then(response => {
          let alert = '';
          // console.log(response)
          if(type === 'akaun')
            alert = TRANSLATION[language].MESSAGE.accountNotFoundMessage
          if(type === 'kp')
            alert = TRANSLATION[language].MESSAGE.kpNotFoundMessage
          if(type === 'ssm')
            alert = TRANSLATION[language].MESSAGE.ssmNotFoundMessage

          if(response.status === 'SUCCESS'){
            setDisplay(true)
            NoScroll.on()
          }
          if(response.status === 'FAILED'){
            swal(TRANSLATION[language].MESSAGE.notFoundMessage,alert,"error")
            setDisplay(false)
            NoScroll.off()
          }
          setResponse(response.data)
          setLoading(false)
          setError(null)
        })
      .catch(err => {
        if(err.name === 'AbortError')
          console.log('Fetch Aborted')
        else{
          setLoading(false)
          setError(err.message)
      }
      })
    }

    const handleAdd = (event) => {
      const url = SERVER_URL+"int/api_generator.php?api_name=newV2&type="+carianBy+"&code="+code
      const addHeader = new Headers()
      const addData = new FormData()

      addHeader.append('TOKEN',auth);
      addData.append('nokp', nokp)
      addData.append('account', event)

      const requestOptions = {
        method : 'POST',
        redirect : 'follow',
        body : addData,
        headers : addHeader,
        signal: abortCont.signal
      }
      setAddLoading(true)

      fetch(url, requestOptions)
    .then(res => {
        if(!res.ok){
            throw Error("Could't fetch response from the resource")
        }
        return res.json()
    })
    .then(response => {
        setAddLoading(false)
        setError(null)
        if(response.status === "success")
        {
            toaster.success(TRANSLATION[language].MESSAGE.addMessage,{id:"forbidden-action"})
        }
        else if(response.status === "failure")
        {
            toaster.danger(TRANSLATION[language].MESSAGE.failToAddMessage,{id:"forbidden-action"});
        }
        else
        {
            toaster.danger(TRANSLATION[language].MESSAGE.errorMessage,{id:"forbidden-action"});
        }
    })
    .catch(err => {
        if(err.name === "AbortError"){
            console.log("fetch aborted")
        }
        else{
            setAddLoading(false)
            setError(err.message)
            toaster.danger(err.message,{id:"forbidden-action"});
        }
    })
    }

    const handleChoose = (account) => {
      let newArray = [...array]
      let index = newArray.findIndex(element => element.account === account)
      if(index !== -1){
        newArray.splice(index,1)
        setArray(newArray)
      }
      else{
        setArray(array => [...array,{account:account}])
      }

    }

    

    if( type === "" || type === null || type === 'tiada'){
        return (<div></div>)
    }
    else{
        return(<div>
            <div className="relative pb-4 ">
            <div className="flex flex-wrap">
              <div className="w-full">
                <Pane display="flex">
                  <TextInputField
                    width="100%"
                    required
                    onChange={(e) => handleChange(e)}
                    label={
                      type === "akaun"
                        ? TRANSLATION[language].SEARCH.MENU.ACCOUNT.TITLE
                        : type === "ssm"
                        ? TRANSLATION[language].SEARCH.MENU.NOSSM.TITLE
                        : type === "kp"
                        ? TRANSLATION[language].SEARCH.MENU.NOKP.TITLE
                        : TRANSLATION[language].CONSTANT.SEARCH + "..."
                    }
                    description={
                      type === "akaun"
                        ? TRANSLATION[language].SEARCH.MENU.ACCOUNT.SUBTITLE
                        : type === "ssm"
                        ? TRANSLATION[language].SEARCH.MENU.NOSSM.SUBTITLE
                        : type === "kp"
                        ? TRANSLATION[language].SEARCH.MENU.NOKP.SUBTITLE
                        : "Carian..."
                    }
                    placeholder={
                      type === "akaun"
                        ? TRANSLATION[language].CONSTANT.EXAMPLE + ": 1234567"
                        : type === "ssm"
                        ? TRANSLATION[language].CONSTANT.EXAMPLE + ": 123456-X"
                        : type === "kp"
                        ? TRANSLATION[language].CONSTANT.EXAMPLE + ": 901212059876"
                        : TRANSLATION[language].CONSTANT.SEARCH + "..."
                    }
                  />
                </Pane>
                <Pane>
                  <Button
                    type="button"
                    iconBefore={SearchIcon}
                    appearance="primary"
                    intent="success"
                    className="float-right"
                    onClick = {() => handleSubmit()}
                  >
                    {addLoading ? TRANSLATION[language].CONSTANT.SEARCHING + "..." : TRANSLATION[language].CONSTANT.SEARCH_NOUN}
                  </Button>

                  <Button
                    type="button"
                    iconBefore={ArrowLeftIcon}
                    appearance="primary"
                    intent="danger"
                    onClick={() => window.history.back()}
                  >
                    {TRANSLATION[language].CONSTANT.BACK}
                  </Button>
                </Pane>
                <Pane marginTop={5}  background="#fff">
                {!loading ? 
                  response.length > 1  ? (
                      <>
                        <Button
                          type="button"
                          onClick={() => resetArray()}
                          appearance="primary"
                          intent="warning"
                          className=""
                        >
                          {TRANSLATION[language].CONSTANT.RESET}
                        </Button>
                        <Button
                          type="button"
                          onClick={() => addAll()}
                          appearance="primary"
                          className="float-right"
                        >
                          {addLoading ? TRANSLATION[language].CONSTANT.ADDING+"..." : TRANSLATION[language].CONSTANT.ADD_ALL}
                        </Button>
                        <Button
                          type="button"
                          onClick={() => handleAddThis()}
                          appearance="primary"
                          className="float-right mr-2"
                        >
                          {addLoading ? TRANSLATION[language].CONSTANT.ADDING+"..." : TRANSLATION[language].CONSTANT.ADD+" "+array.length+" "+TRANSLATION[language].CONSTANT.BILL}
                        </Button>
                      </>
                    ) : (
                      ""
                    )
                : ''}
                </Pane>
                <Pane marginTop={10} padding={10} background="#2d3436">
                  <Heading size={400} textAlign="center" color="white">
                    {TRANSLATION[language].SEARCH.STATEMENT}
                  </Heading>
                </Pane>
              </div>
            </div>
        </div>
        <div
          className="relative pb-4 overflow-y-scroll"
          style={{ height: "45vh" }}
        >
          <div className="flex flex-wrap">
            <div className="w-full">
              <Pane background="tint1">
                {
                  (!loading && display) &&
                    <CarianItem className="bg-gray-100" response={response} loading={loading} handleAdd={response.length > 1 ? handleChoose : handleAdd} array={array} />

                }
              </Pane>
            </div>
          </div>
        </div>
        </div>)
    }
}

export default CarianList
