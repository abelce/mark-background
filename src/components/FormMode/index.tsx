import * as React from 'react';
import { getMode } from "@utils"

const FormMode = (HocComponent: React.Component) => {
    return (props: any) => {
        return <HocComponent mode={getMode()} {...props}/>
    }
}

export default FormMode;