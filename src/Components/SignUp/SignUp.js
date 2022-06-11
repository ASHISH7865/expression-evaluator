import React, {useState} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import InputField from "../InputField/InputField";
import {
    createUserDocumentFromGoogleAuth,
    createUserAuthFromEmailAndPassword,
    signInWithPopupGoogle
} from "../../utils/Firebase.utlis";
import {login} from "../../app/userSlice";
import '../../form.css'


function SignUp(props) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [firebaseError, setFirebaseError] = useState('');

    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        dob: '',

    })


    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }


    const signUpWithGoogle = async () => {
        setLoading(true);
        try {

            const {user} = await signInWithPopupGoogle();
            await createUserDocumentFromGoogleAuth(user);
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('userToken', user.accessToken);
            dispatch(login(user));
            navigate('/calculator');
        } catch (error) {
            setLoading(false);
            console.log(error);

        }

    }
    const handleSubmit = async (e) => {
        setFirebaseError('')
        setLoading(true);
        const additionalInfo = {
            firstName: values.firstName,
            lastName: values.lastName,
            dob: values.dob,
        }
        e.preventDefault();
        if (values.password !== values.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        try {
            const {user} = await createUserAuthFromEmailAndPassword(values.email, values.password);
            await createUserDocumentFromGoogleAuth(user, additionalInfo);
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('userToken', user.accessToken);
            dispatch(login(user));
            setLoading(false);
            navigate('/calculator');

        } catch (error) {
            setLoading(false);
            setFirebaseError(error.code);
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
            maxLength: 20,
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
        password: {
            id: '4',
            type: 'password',
            name: 'password',
            placeholder: 'Password',
            errorMessage: 'Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!',
            pattern: '^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$',
            required: true,
            value: values.password,
        },
        confirmPassword: {
            id: '5',
            type: 'password',
            name: 'confirmPassword',
            placeholder: 'Confirm Password',
            errorMessage: 'password do not match!',
            pattern: values.password,
            required: true,
            value: values.confirmPassword,
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
        profilePicture: {
            id: '7',
            type: 'file',
            name: 'profilePicture',
            placeholder: 'Profile Picture',
            accept: 'image/*',
        }
    }


    return (
        <div className="wrapper">
            <h2>Sign Up</h2>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <h4>Account</h4>
                        <div className="row">
                            <div className="input-group input-group-icon">
                                <InputField {...inputField.email} onChange={handleChange}/>
                                <div className="input-icon"><img
                                    src="https://img.icons8.com/material-sharp/24/undefined/new-post.png"
                                    width={'20px'}
                                    alt={'email'}/></div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-half">
                                <div className="input-group input-group-icon">
                                    <InputField {...inputField.firstName} onChange={handleChange}/>
                                    <div className="input-icon"><img
                                        src="https://img.icons8.com/ios-glyphs/30/undefined/user--v1.png" alt='user'
                                        width='20px'/></div>
                                </div>
                            </div>
                            <div className="col-half">
                                <div className="input-group input-group-icon">
                                    <InputField {...inputField.lastName} onChange={handleChange}/>
                                    <div className="input-icon"><img
                                        src="https://img.icons8.com/ios-glyphs/30/undefined/user--v1.png" alt='user'
                                        width={'20px'}/></div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-half">
                            <div className="input-group input-group-icon">
                                <InputField {...inputField.password} onChange={handleChange}/>
                                <div className="input-icon"><img
                                    src="https://img.icons8.com/ios-glyphs/30/undefined/password--v1.png" width={'20px'}
                                    alt={'pass'}/></div>
                            </div>
                        </div>
                        <div className="col-half">

                            <div className="input-group input-group-icon">
                                <InputField {...inputField.confirmPassword} onChange={handleChange}/>
                                <div className="input-icon"><img
                                    src="https://img.icons8.com/ios-glyphs/30/undefined/password--v1.png" width={'20px'}
                                    alt={'pass'}/></div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-half">
                            <h4>Date of Birth</h4>
                            <div className="input-group">
                                <InputField {...inputField.dateOfBirth} onChange={handleChange}/>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="button">
                            <button>{loading ? <span className='loader'></span> : <span>SIGN UP</span>}</button>

                            <div className={'firebase-error'}>{firebaseError}</div>
                        </div>
                    </div>
                    <div className="google-sign-in">
                        <p>or</p>
                        <div className="google-button" onClick={signUpWithGoogle}>
                            <img src="https://img.icons8.com/color/48/undefined/google-logo.png" alt={'google'}/>
                            <span>Continue with Google</span>
                        </div>
                    </div>
                </form>
                <div className="footer">
                    <p>Already have an account? <NavLink to={'/'}>Sign In</NavLink></p>
                </div>
            </div>

        </div>
    );
}

export default SignUp;