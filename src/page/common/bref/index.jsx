import React from 'react';
import { Link } from 'react-router-dom';
import Style from './style';

function Bref({data}) {
    return (
        <div className={Style.bref}>
            <h4>
                <Link exact="true" to={data.url}/>
            </h4>
            <p>{data.description}</p>
        </div>
    )
}

export default Bref;