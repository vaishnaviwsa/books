import React, {useState} from 'react';
import ActionPage from './actionPage';
import * as Yup from 'yup';
import {Formik,Field,Form,ErrorMessage} from 'formik';
import {Link,useHistory} from 'react-router-dom';

const Logout=()=>{
    let history=useHistory();
    // console.log('props',props);
    const logOut=()=>{
        localStorage.removeItem('login-token');
        history.push("/")
     }
   
return(
    <>
        <div className="col-xs-6 col-md-12 ">
        <button type="button" className="btn btn-info" onClick={logOut}>Log Out</button>
        </div>
    </>
)
}
export default Logout;
