import React, {memo, useState} from 'react';



function InputField(props) {
    const [focused, setFocused] = useState(false);


    const {
        onChange,
        errorMessage,
        ...inputProps
    } = props;

    const handleFocus = (e) => {
        setFocused(true);
    }

    return (
        <div>
            <input {...inputProps} onChange={onChange} onBlur={handleFocus} onFocus={()=>inputProps.name === 'confirmPassword' && setFocused(true)} focused={focused.toLocaleString()} />
                <span className="error">{errorMessage}</span>
        </div>
    );
}

export default InputField;