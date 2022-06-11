import React, {useEffect, useState} from 'react';
import {getCalculatorHistory} from "../../utils/Firebase.utlis";
import {useSelector} from "react-redux";
import './CalculatorHistory.scss'
import {NavLink} from "react-router-dom";

function CalculationHistory(props) {
    const user = useSelector((state) => state.user);
    const [calculationHistory, setCalculationHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setIsLoading(true);
        getCalculatorHistory(user.user.uid).then((calculationHistory) => {
            setCalculationHistory(calculationHistory.result);
            setIsLoading(false);
        }
        );
    }, []);





    return (
        <div className='wrapper'>
            <h4>Calculation History</h4>
            <div className="container">
                <div className="row">
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th>Expression</th>
                                <th>Result</th>
                            </tr>
                            </thead>
                            <tbody>
                            {isLoading?<span style={{fontSize:'12px',fontWeight:'600',marginLeft:'50px',marginTop:'10px'}}>Loading....</span> : calculationHistory ? calculationHistory.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.expression}</td>
                                            <td>{item.result}</td>
                                        </tr>
                                    )
                                }
                            ): <p style={{fontSize:'20px',textAlign:'center'}}>No History</p>}
                            </tbody>
                        </table>
                </div>
                <h4><NavLink to='/calculator'>Return to Calculator</NavLink></h4>
            </div>
        </div>
    );
}

export default CalculationHistory;