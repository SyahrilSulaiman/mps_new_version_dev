import React from 'react'
import { useLocation } from 'react-router-dom'

function SinglePayment() {
    const location = useLocation();

    console.log(location)
    return (
        <div>
            single payment page
        </div>
    )
}

export default SinglePayment
