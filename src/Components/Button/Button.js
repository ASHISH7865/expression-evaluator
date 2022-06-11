import React from 'react';
import './Button.scss'

function Button(props) {
    return (
        <div className='button__component'>
            <button type={props.type} className={props.className} onClick={props.onClick}>{props.value}</button>
        </div>
    );
}

export default Button;