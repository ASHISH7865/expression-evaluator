import React, {useEffect, useState} from 'react';
import InputField from "../InputField/InputField";
import {useSelector} from "react-redux";
import {getUserData} from "../../utils/Firebase.utlis";
import {updateUserData} from "../../utils/Firebase.utlis";

function Profile(props) {

    const {user} = useSelector(state => state.user);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        dob: '',

    })

    useEffect(() => {
        getUserData(user.uid).then(data => {
                setValues({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    dob: data.dob,
                });
            }
        );
    }, [])

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }
    const handleSave = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        try {
            await updateUserData(user.uid, values);
            setIsLoading(false);
            setMessage('Profile updated successfully');

        } catch (e) {
            setIsLoading(false);
            setMessage('Error updating profile');
        }
    }


    const inputField = {
        firstName: {
            id: '1',
            type: 'text',
            name: 'firstName',
            placeholder: 'First Name',
            errorMessage: 'First Name is required',
            pattern: '^[a-zA-Z]+$',
            required: true,
            value: values.firstName,
            minLength: 3,
            maxLength: 40,
        },
        lastName: {
            id: '2',
            type: 'text',
            name: 'lastName',
            placeholder: 'Last Name',
            errorMessage: 'Last Name is required',
            pattern: '^[a-zA-Z]+$',
            required: true,
            value: values.lastName,
            minLength: 3,
            maxLength: 20,

        },
        email: {
            id: '3',
            type: 'email',
            name: 'email',
            placeholder: 'Email Address',
            errorMessage: 'It should be a valid email address!',
            required: true,
            value: values.email,
        },

        dateOfBirth: {
            id: '6',
            type: 'date',
            name: 'dob',
            placeholder: 'Date of Birth',
            errorMessage: 'Date of Birth is required',
            required: true,
            value: values.dob,
        },

    }


    return (
        <div className='wrapper'>
            <h2>Profile</h2>
            <div className="container">
                <form onSubmit={handleSave}>
                    <div className="row">
                        <h4>Name</h4>
                        <div className="col-half">
                            <div className="input-group">
                                <InputField {...inputField.firstName} onChange={handleChange}/>
                            </div>
                        </div>
                        <div className="col-half">
                            <div className="input-group">
                                <InputField {...inputField.lastName} onChange={handleChange}/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <h4>Email</h4>
                        <div className="input-group">
                            <InputField {...inputField.email} disabled/>
                            <span style={{fontSize: '12px', color: 'indianred', fontWeight: "600"}}>Email id cannot be changed</span>
                        </div>
                    </div>
                    <div className="row">
                        <h4>Date Of Birth</h4>
                        <div className="input-group">
                            <InputField {...inputField.dateOfBirth} onChange={handleChange}/>
                        </div>
                    </div>
                    <div className="button">
                        <button>{isLoading ? <span className='loader'></span> : <span>Save</span>}</button>
                    </div>
                </form>
                {message && <div className="message">
                    {message}
                </div>}
            </div>
        </div>
    );
}

export default Profile;
