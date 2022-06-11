
import './App.css';
import Login from "./Components/Login/Login";
import SignUp from "./Components/SignUp/SignUp";
import { Routes, Route,useNavigate} from "react-router-dom";
import {useSelector,useDispatch} from "react-redux";
import {selectUser} from "./app/userSlice";
import {useEffect} from "react";
import Calculator from "./Components/Calculator/Calculator";
import {ProtectedRoute} from "./utils/ProtectedRoute";
import Navbar from "./Components/NavBar/Navbar";
import CalculationHistory from "./Components/CalculationHistory/CalculationHistory";
import Profile from "./Components/Profile/Profile";


function App() {
const navigate = useNavigate();
const user = useSelector(selectUser);

    useEffect(() => {
        if(user){
            return navigate("/calculator");
        }
    }, []);

  return (
    <div className="App">
        <Navbar />
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/calculator" element={<ProtectedRoute><Calculator/></ProtectedRoute>}/>
            <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
            <Route path="/history" element={<ProtectedRoute><CalculationHistory/></ProtectedRoute>}/>
        </Routes>
    </div>
  );
}

export default App;
