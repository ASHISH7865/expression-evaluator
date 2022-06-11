import React, {useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import { signInWithPopupGoogle,createUserDocumentFromGoogleAuth,signInAuthUserWithEmailAndPassword} from "../../utils/Firebase.utlis";

import InputField from "../InputField/InputField";
import { useDispatch } from "react-redux";
import { login } from "../../app/userSlice";

function Login(props) {
    const navigate = useNavigate()
    const [passwordType, setPasswordType] = useState('password');
    const [loading, setLoading] = useState(false);
    const [firebaseError, setFirebaseError] = useState('');
    const [values, setValues] = useState({
        email: '',
        password: '',
    });
    const dispatch = useDispatch();


    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }
    const showPassword = () => {
        if (passwordType === 'password') {
            setPasswordType('text');
        } else {
            setPasswordType('password');
        }
    }

    const loginWithGoogle = async () => {
            setLoading(true);
        try {
            const {user} = await signInWithPopupGoogle();
           const response =  await createUserDocumentFromGoogleAuth(user);
           if(user){
               console.log(user)
               localStorage.setItem('user',JSON.stringify(user));
               localStorage.setItem('userToken',user.accessToken);
               dispatch(login(user));
               navigate('/calculator');
           }
            setLoading(false);
            dispatch(login(user));
        }catch (error) {
            setLoading(false);
        }

    }

    const loginHandler = async (e) => {
        e.preventDefault();
        setFirebaseError('');
        setLoading(true);
       try {
           const response = await signInAuthUserWithEmailAndPassword(values.email, values.password);
              if(response){
                  localStorage.setItem('user',JSON.stringify(response.user));
                   localStorage.setItem('userToken',response.user.accessToken);
                    dispatch(login(response.user));
                    navigate('/calculator');
              }

       }catch (error){
           setLoading(false);
           switch (error.code) {
               case 'auth/wrong-password':
                     setFirebaseError('Wrong password');
                   break;
               case 'auth/user-not-found':
                     setFirebaseError('User not found');
                   break;
               default:
                   console.log(error);
           }
       }
       setLoading(false);

    }

    const inputField = {
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
            errorMessage: 'Password is required',
            required: true,
            value: values.password,
        },
    }

    return (
        <div className="wrapper">
            <h2>Login</h2>
            <div className="container">
                <form onSubmit={loginHandler}>
                    <div className="row">
                        <h4>Account</h4>
                        <div className="input-group input-group-icon">
                            <InputField {...inputField.email} onChange={handleChange}/>
                            <div className="input-icon"><img
                                src="https://img.icons8.com/material-sharp/24/undefined/new-post.png" width={'20px'}
                                alt={'email'}/></div>
                        </div>
                        <div className="input-group input-group-icon">
                            <InputField {...inputField.password} onChange={handleChange}/>
                            <div className="input-icon"><img
                                src="https://img.icons8.com/ios-glyphs/30/undefined/password--v1.png" width={'20px'}
                                alt={'pass'}/></div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="button">
                           <button>{loading ? <span className="loader"></span>:<span>Login</span>}</button>
                            <div className={'firebase-error'}>{firebaseError}</div>
                        </div>
                    </div>
                    <div className="google-sign-in" >
                        <p>or</p>
                        <div className="google-button" onClick={loginWithGoogle} >
                            <img src="https://img.icons8.com/color/48/undefined/google-logo.png" alt={'google'}/>
                            <span>Continue with Google</span>
                        </div>
                    </div>
                </form>
                <div className="footer">
                    <p>Don't have an account? <NavLink to={'/signup'}>Sign Up</NavLink></p>
                </div>
            </div>

        </div>
    );
}

export default Login;