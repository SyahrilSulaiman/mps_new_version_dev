import React,{ useState, useEffect } from 'react'

export default function SenaraiCarianCukai({result, currentPage, resultPerPage, }){
    return (
        <>
        {
            result.map((res,index) => 
            <tr key={index}>
                <td className="border text-sm text-center py-2">{index+1+((currentPage-1)*resultPerPage)}</td>
                {/* <td className="border px-8 py-4">{res.email}</td> */}
                <td className="border text-sm text-center py-2">{res.name}</td>
                <td className="border text-sm text-center py-2">{res.phone}</td>
                <td className="border text-sm text-center py-2">{res.account}</td>
                <td className="border text-sm text-center py-2">{res.invoice}</td>
                <td className="border text-sm text-center py-2">{res.receipt}</td>
                <td className="border text-sm text-center py-2">{res.date}</td>
                <td className="border text-sm text-center py-2">RM&nbsp;{res.amount}</td>
            </tr>
        )
        }
        </>
    );
}