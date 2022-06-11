import React, {useState} from 'react';
import Button from "../Button/Button";
import { useSelector} from "react-redux";
import {createCalculatorHistoryDocument} from "../../utils/Firebase.utlis";

import './Calculator.scss';
import {NavLink} from "react-router-dom";

function Calculator(props) {
    const user = useSelector((state) => state.user);
    const [displayValue, setDisplayValue] = useState('');
    const [resultHistory, setResultHistory] = useState([]);


    const expressionEvaluator = (expression) => {
       try{
           if(expression.length === 0){
                return 'Please Enter Expression';
           }
              return eval(expression);
       }
         catch(e){
             return 'Invalid Expression';
         }
    }
    const handleChange =  (e) =>{
        setDisplayValue(e.target.value);
    }

    const calculateExpression = async (e)=>{
       setDisplayValue(expressionEvaluator(displayValue));
         const result = {
                expression: displayValue,
                result: expressionEvaluator(displayValue).toString()
         }
            setResultHistory([...resultHistory, result]);
            await createCalculatorHistoryDocument(user.user.uid,user.user.email, result);


    }





    const CalculatorButtons= [
        {
            value: 'C',
            className: 'button__component button__component--clear',
            onClick: () => {
                setDisplayValue('');
            }
        },
        {
            value:'back',
            className: 'button__component button__component--backspace',
            onClick: () => {
                setDisplayValue(displayValue.slice(0, -1));
            }
        },
        {
            value: '+',
            className: 'button__component button__component--operator',
            onClick: () => {
                setDisplayValue(displayValue + '+');
            }
        },
        {
            value: '-',
            className: 'button__component button__component--operator',
            onClick: () => {
                setDisplayValue(displayValue + '-');
            }
        },
        {
            value: '*',
            className: 'button__component button__component--operator',
            onClick: () => {
                setDisplayValue(displayValue + '*');
            }
        },
        {
            value: '/',
            className: 'button__component button__component--operator',
            onClick: () => {
                setDisplayValue(displayValue + '/');
            }
        },
        {
            value: '%',
            className: 'button__component button__component--operator',
            onClick: () => {
                setDisplayValue(displayValue + '%');
            }
        },
        {
            value: '=',
            className: 'button__component button__component--operator',
            onClick: () => {
                setDisplayValue(displayValue + '=');
            }

        },
        {
            value:'>',
            className: 'button__component button__component--operator',
            onClick: () => {
                setDisplayValue(displayValue + '>');
            }
        },
        {
            value:'<',
            className: 'button__component button__component--operator',
            onClick: () => {
                setDisplayValue(displayValue + '<');

            }
        },
        {
            value: '0',
            className: 'button__component button__component--number',
            onClick: () => {
                setDisplayValue(displayValue + '0');
            }
        },
        {
            value: '1',
            className: 'button__component button__component--number',
            onClick: () => {
                setDisplayValue(displayValue + '1');
            }
        },
        {
            value: '2',
            className: 'button__component button__component--number',
            onClick: () => {
                setDisplayValue(displayValue + '2');
            }
        },
        {
            value: '3',
            className: 'button__component button__component--number',
            onClick: () => {
                setDisplayValue(displayValue + '3');
            }
        },
        {
            value: '4',
            className: 'button__component button__component--number',
            onClick: () => {
                setDisplayValue(displayValue + '4');
            }
        },
        {
            value: '5',
            className: 'button__component button__component--number',
            onClick: () => {
                setDisplayValue(displayValue + '5');
            }
        },
        {
            value: '6',
            className: 'button__component button__component--number',
            onClick: () => {
                setDisplayValue(displayValue + '6');
            }
        },
        {
            value: '7',
            className: 'button__component button__component--number',
            onClick: () => {
                setDisplayValue(displayValue + '7');
            }
        },
        {
            value: '8',
            className: 'button__component button__component--number',
            onClick: () => {
                setDisplayValue(displayValue + '8');
            }
        },
        {
            value: '9',
            className: 'button__component button__component--number',
            onClick: () => {
                setDisplayValue(displayValue + '9');
            }
        },
        {
            value: '.',
            className: 'button__component button__component--number',
            onClick: () => {
                setDisplayValue(displayValue + '.');
            }
        },

        {
            value:'Calculate',
            className: 'button__component button__component--calculate',
            onClick: calculateExpression


        }

    ]

    return (
        <div className='wrapper'>
            <h2>Expression Evaluator</h2>
            <div className="container">
                <div className="row">
                    <h4>Expression</h4>
                    <input className='expression__input'  type={'text'}   value={displayValue} onChange={handleChange}/>
                    <div className="calculator__button-group">
                        {CalculatorButtons.map((button, index) => {
                            return (
                                <div key={button.value} className={button.value !== 'Calculate'?'col-fourth':"" }>
                                <Button key={index} value={button.value} className={button.className} onClick={button.onClick} />
                                </div>
                            )
                        }
                        )}
                    </div>
                </div>
                <h4>

                <NavLink style={{textAlign:'center'}} to='/history'>Click to see calculation history</NavLink>
                </h4>
            </div>
            <div className="instructions">
                <h4>Instructions</h4>
                <p>
                    This calculator is a simple calculator that can be used to evaluate mathematical expressions.
                </p>
                <p>
                    The calculator supports the following operators: +, -, *, /, %, >, &lt;, = .
                </p>
                <p>
                    You can also compare two expression using the >=, &lt;=, == operators. for example <span className="expression__input">2+2>=4</span>
                </p>
                <p>
                    You can also use your device keyboard to enter the expression.
                </p>
                <p>
                    To calculate the expression,click Calculate button.
                </p>
            </div>
        </div>
    );
}

export default Calculator;