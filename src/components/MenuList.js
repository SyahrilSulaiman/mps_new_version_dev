import { ArrowRightIcon, Heading, Pane, Icon } from 'evergreen-ui'
import React from 'react'
import { Link } from 'react-router-dom'

export default function MenuList({menu}) {

    return (
        menu.map((res,index) => {
            return <Link to={{ pathname:res.to, state:res.data }} key={index}>
                <Pane display="grid" gridTemplateColumns="1fr 20px" className="p-5 my-1 rounded-lg" background="#2f3542" color="#f1f2f6" opacity={res.status ? "" :"0.5"}  cursor={res.status ? "" :"not-allowed"}>
                    <Pane>
                        <Heading color="#f1f2f6"> {res.title} </Heading><small className="text-gray-500">{res.subtitle}</small>
                    </Pane>
                    <Pane>
                        <Icon icon={ArrowRightIcon} color="#f1f2f6" className="py-5"></Icon>
                    </Pane>
                </Pane>
            </Link>
        })
    )
}
