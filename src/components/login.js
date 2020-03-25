import React, {useState,useEffect} from 'react';
import Axios from 'axios';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory
  } from "react-router-dom";
//   import { useHistory } from "react-router-dom";
import BugsData from './bugsData';

const Login=()=>{
    const history = useHistory();
    const [credentials,setCredentials]=useState({email:'',password:''});
    const [errMsg,setErrMsg]=useState('');

    const onInptChng=(e)=>{
        e.preventDefault();
        console.log('name',e.target.name,'value',e.target.value);
        let newCred={...credentials};
        if(e.target.name=='email'){
            newCred.email=e.target.value;
            setCredentials(newCred);
        }
        else{
            newCred.password=e.target.value;
            setCredentials(newCred);
        }
    }

    const submitDetails=()=>{
         Axios.post(`http://139.59.88.177:8006/v1/login/`,{
            "email":credentials.email,
             "password":credentials.password
        }).then((response)=>{
            // console.log('response in login',response);
            if(response.status==200){
                localStorage.setItem('login-token',response.data.token);
                // localStorage.setItem('access-granted',true);
            }
            else{
                alert('came here');
                setErrMsg('You Are Not Authorized');
            }
        }).then(()=>history.push("/bugs"))
        
    }

    return    <div className='login-form App-header'>
         <div className="form-group">
            <h4><label for="email">{errMsg}</label></h4>
            <label for="email">Email address:</label>
            <input type="email" className="form-control" placeholder="Enter email" id="email" name='email' value={credentials.email} onChange={onInptChng}/>
        </div>
        <div className="form-group">
            <label for="pwd">Password:</label>
            <input type="password" className="form-control" placeholder="Enter password" id="pwd" name='password' value={credentials.password} onChange={onInptChng}/>
        </div>
            {/* <a href='/bugs'> */}
            <button type="submit" className="btn btn-primary" onClick={submitDetails}>
            Submit
            </button>
                
            {/* </a> */}
        
    </div>
}
export default Login;