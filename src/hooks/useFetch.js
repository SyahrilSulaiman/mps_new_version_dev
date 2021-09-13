import { useState, useEffect } from "react";

const useFetch = (url,requestOptions) => {
    const [ response, setResponse ] = useState(null)
    const [ loading, setLoading ] = useState(true)
    const [ error, setError ] = useState(null)
    const abortCont = new AbortController()

    // const [init,setInit] = useState({
    //     method:"POST",   // *GET, POST, PUT, DELETE, etc.
    //     mode:"cors",        // *cors, no-cors, same-origin
    //     cache:"default",       // *default, no-cache, reload, force-cache, only-if-cache
    //     credentials:"same-origin", // *same-origin, inlude, omit
    //     headers:{
    //         'Content-Type' : 'application/json',
    //         // 'Content-Type' : 'appliaction/x-www-form-urlencoded',
    //     },     // 
    //     redirect:"follow",    // *follow, manual, error
    //     referrerPolicy:"no-referrer", // *no-referrer-when-downgrade, no-referrer, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    //     body:"",        // body data type must match "Content-Type" header
    //     signal:abortCont.signal
    // })

    useEffect(() => {
            fetch(url, {
                method:requestOptions.method,   // *GET, POST, PUT, DELETE, etc.
                mode:requestOptions.mode,        // *cors, no-cors, same-origin
                cache:"default",       // *default, no-cache, reload, force-cache, only-if-cache
                credentials:"same-origin", // *same-origin, inlude, omit
                headers:requestOptions.headers,     // 
                redirect:requestOptions.redirect,    // *follow, manual, error
                referrerPolicy:"no-referrer", // *no-referrer-when-downgrade, no-referrer, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body:requestOptions.body,        // body data type must match "Content-Type" header
                signal:abortCont.signal
            })
            .then(res => {
                if(!res.ok){
                    throw Error("Could't fetch response from the resource")
                }
                return res.json()
            })
            .then(response => {
                setResponse(response)
                setLoading(false)
                setError(null)
            })
            .catch(err => {
                if(err.name === "AbortError"){
                    console.log("fetch aborted")
                }
                else{
                    setLoading(false)
                    setError(err.message)
                }
            })

        return () => abortCont.abort()
    }, [url])
    return { response, loading, error}
}

export default useFetch