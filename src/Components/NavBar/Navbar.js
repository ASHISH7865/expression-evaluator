import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../app/userSlice";
import {selectUser} from "../../app/userSlice";
import {auth} from "../../utils/Firebase.utlis";
import './Navbar.scss'

const logoutNavElement = [
    {
        name: 'Login',
        path: '/'
    },
    {
        name: 'Sign Up',
        path: '/signup'
    }
]

const loginNavElement=[
    {
        name:'Home',
        path:'/calculator'
    },
    {
        name:'Profile',
        path:'/profile'
    },
]

function Navbar(props) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const user = useSelector(selectUser);


    const logOutHandler = () => {
        setLoading(true);
        setTimeout(async () => {
            setLoading(false);
            await auth.signOut();
            localStorage.removeItem('user');
            localStorage.removeItem('userToken');
            dispatch(logout());
        }, 1000)

    }
    return (
        <div className='navbar__wrapper'>
            <div className='navbar__logo'>
                <img src="https://img.icons8.com/cute-clipart/64/undefined/apple-calculator.png" alt='logo'/>
            </div>
            <div className='navbar__menu'>
                <ul>
                    {user ? loginNavElement.map(({name, path}) => (
                        <li key={name}>
                            <NavLink style={({isActive}) => ({background: isActive ? "#00a8ff" : "#fff", color:isActive? "#fff":"#333"})} to={path}>{name}</NavLink>
                        </li>
                    )) : logoutNavElement.map(({name, path}) => (
                        <li key={name}>
                            <NavLink style={({isActive}) => ({background: isActive ? "#00a8ff" : "#fff",  color:isActive? "#fff":"#333"})} to={path}>{name}</NavLink>
                        </li>
                    ))}
                </ul>
                {user && <div className="button" onClick={logOutHandler}>
                    <button className='logout'>{loading ? <span className='loader'></span> : <span >Logout</span>}</button>
                </div>}
            </div>
        </div>
    );
}

export default Navbar;