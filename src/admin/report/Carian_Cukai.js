import React, { useState, useEffect } from 'react'
import { Pane, TextInputField, Button, SearchIcon, ArrowLeftIcon, Heading } from "evergreen-ui";
import NoScroll from "no-scroll";
import swal from 'sweetalert2';
import axios from 'axios';
import SenaraiCukai from './Laporan_Carian_Cukai'
import { SERVER_URL } from '../../Constants';


export default function Carian_Cuaki({type, startDate}){
    const [loading, setLoading] = useState(false);
    const [account,setAccount] = useState('');
    const [result,setResult] = useState('');
    const [total,setTotal] = useState(0);
    const handleChange = (e) => {
        setAccount(e.target.value);
    }
    const handleSubmit = (e) => {
            e.preventDefault();
            const formData = new FormData();
            formData.append('account',account);
            formData.append('type',type);
            formData.append('date',startDate);
            axios.post(SERVER_URL+"int/api_generator.php?api_name=laporan_cukai_taksiran",formData)
            .then(res => {
                setLoading(true);
                if(res.data.status === 'success'){
                    setResult(JSON.parse(res.data.result))
                    setTotal(0)
                }
                else if(res.data.status === 'failure'){
                    setResult('');
                }
                else{
                    swal.fire('Ralat','Sila hubungi pentadbir system','error');
                }
            })
    }

    // useEffect(() => {
    //     console.log(total);
    // },[total])

    

    return (
        <div>
            {/* Header */}
            <div className="relative pb-4 ">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="flex flex-wrap">
                        <div className="w-full">
                            {
                                type === '' ? '' :
                                <Pane display="flex">
                                <TextInputField
                                    width="100%"
                                    required
                                    onChange={handleChange}
                                    label={
                                        type === 'akaun' ? ('Nombor Akaun')
                                            : type === 'ssm' ? ('Nombor ROC/ROB Syarikat')
                                                : type === 'nokp' ? ('Nombor Kad Pengenalan')
                                                    : type === 'invoice' ? ('No Invois')
                                                    : ('Carian...')
                                    }
                                    description={
                                        type === 'akaun' ? ('Lengkapkan maklumat nombor akaun dibawah.')
                                            : type === 'ssm' ? ('Lengkapkan nombor ROC/ROB syarikat dibawah.')
                                                : type === 'nokp' ? ('Lengkapkan nombor kad pengenalan dibawah')
                                                    : type === 'invoice' ? ('Lengkapkan no invois dibawah')
                                                    : ('Carian...')
                                    }
                                    placeholder={
                                        type === 'akaun' ? ('Sila isi nombor akaun')
                                            : type === 'ssm' ? ('Sila isi nombor ROC/ROB Syarikat')
                                                : type === 'nokp' ? ('Sila isi nombor kad pengenalan')
                                                    : type === 'invoice' ? ('Sila isi no invois')
                                                    : ('Carian...')
                                    }
                                />
                            </Pane>
                            }

                            <Pane>
                                <Button
                                    type="submit"
                                    iconBefore={SearchIcon}
                                    appearance="primary"
                                    intent="success"
                                    className="float-right"
                                    // onClick={handleSearch}
                                >
                                    {loading ? 'Cari' : 'Cari'}
                                    
                                </Button>
    
                                <Button
                                    type="button"
                                    iconBefore={ArrowLeftIcon}
                                    appearance="primary"
                                    intent="danger"
                                    onClick={() => window.history.back()}
                                >
                                    Kembali
                                </Button>
                            </Pane>
                            <Pane marginTop={32} padding={10} background="#2d3436">
                                <Heading size={400} textAlign="center" color="white">Senarai laporan bayaran akan dipaparkan dibawah</Heading>
                            </Pane>
                        </div>
                    </div>
                </form>
            </div>
            <div className="relative pb-4 overflow-y-scroll" style={{height:"62vh"}}>
                <div className="flex flex-wrap">
                    <div className="w-full">
                        <Pane background="tint1">
                            {
                                // <Carian className="bg-gray-100" bill={bill} type={type} display={display} />
                                loading? (
                                    result === '' ? 'Maklumat laporan bayaran tidak ditemui' : <SenaraiCukai total={total} setTotal={setTotal} result={result} type={type} /> ):  ''
                                // <SenaraiCukai result={result} type={type}/>
                            }
                        </Pane>
                    </div>
                </div>
            </div>
        </div>
    );
}