import React,{ useEffect, useState} from 'react';
import SenaraiCarianCukai from './Senarai_Carian_Cukai';
import Pagination from './Pagination';
// import {Table} from 'evergreen-ui';

export default function SenaraiCukai({result,type}){
    const [currentPage, setCurrentPage] = useState(1);
    const [resultPerPage, setResultPerPage] = useState(5);

    const indexOfLastResult = currentPage * resultPerPage;
    const indexOfFirstResult = indexOfLastResult - resultPerPage;
    const currentResults = result.slice(indexOfFirstResult, indexOfLastResult);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    // const showResult = (result) => setResultDetail(user);
    const [isSort,setSorting] = useState(false);
    const [sort,setSort] = useState('desc');

    const handleSort = (e) => {
        setSorting(true);
        if(isSort === true){
            if(sort === 'desc'){
                setSort('asc');
                // console.log('asc')
                // result.invoice_no.sort();

            }
            else{
                setSort('desc')
                console.log('desc')
                // result.invoice_no.sort();
                // result.invoice_no.reverse();
            }
        }
    }

    return(
        <div>
            <table className="table-auto w-full shadow-lg bg-white">
                <thead>
                <tr>
                    <th className=" bg-blue-100 border text-xs text-center px-2">Bil</th>
                    {/* <th className=" bg-blue-100 border text-left px-8 py-4">Emel</th> */}
                    <th className=" bg-blue-100 border hidden md:table-cell text-sm text-center px-4 py-2">Nama</th>
                    <th className=" bg-blue-100 border md:table-cell text-sm text-center px-4 py-2">No Tel</th>
                    <th className=" bg-blue-100 border text-sm text-center px-4 py-2">
                        {/* {
                            type === 'akaun' ? 'No Akaun':
                            type === 'nokp' ? 'No kad Pengenalan': 'No ROB ROC'
                        } */}
                        No Akaun
                    </th>

                    <th className=" bg-blue-100 border hidden lg:table-cell text-sm text-center px-4 py-2">No Invois</th>
                    <th className=" bg-blue-100 border hidden md:table-cell text-sm text-center px-4 py-2">No Resit</th>
                    <th className=" bg-blue-100 border hidden lg:table-cell text-sm text-center px-4 py-2" onClick={handleSort}>Tarikh Pembayaran&nbsp;
                        {
                            // !isSort?<i className="fas fa-sort"></i>:(sort === 'desc' ? (<i className="fas fa-caret-down"></i>) : sort === 'asc' ? (<i className="fas fa-caret-up"></i>) : '')
                        }
                    </th>
                    <th className=" bg-blue-100 border text-center px-4 py-2">Amaun</th>
                </tr>
                </thead>
                <tbody>
                {
                    <SenaraiCarianCukai result={currentResults} currentPage={currentPage} resultPerPage={resultPerPage}/>
                }
                </tbody>
            </table>
            {
                <Pagination resultPerPage={resultPerPage} totalResult={result.length} paginate={paginate} />
            }
        </div>
    )
}