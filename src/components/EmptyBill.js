import React from 'react'
import { Pane, Heading, Button} from "evergreen-ui";

function EmptyBill() {
    return (
        <div className="w-full bg-transparent px-3">
        <Pane display="flex" alignItems="center" justifyContent="center" background="white" paddingY={100}>
          <Heading size={200}>Tekan pada butang <Button type="button" appearance="primary" intent="success"><i className="fas fa-plus"></i> <Heading size={200} className="pl-2" color="white">Bil</Heading></Button> untuk menambah bil.</Heading>
        </Pane>
      </div>
    )
}

export default EmptyBill
