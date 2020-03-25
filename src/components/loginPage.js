import React, {useState} from 'react';
import {Formik,Field,Form,ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {useHistory} from 'react-router-dom';
// interface 
const LoginPage=()=>{
    const history=useHistory();
    const authCredentials={email:'vaishu@wsa.com',password:'wsa'};
    return(
        // <div className='row'>

            <div className=''  style={{width: '20%',margin: '0 auto',marginTop: '12%'}}>
                <h3 style={{textAlign:'center'}}>LOGIN</h3>
                <Formik
                initialValues={{email:'',password:''}}
                validationSchema={Yup.object().shape({
                    email:Yup.string()
                    .required('Required Email'),
                    password:Yup.string()
                    .min(3,'Password must be at least 6 characters')
                    .required('Password Required'),

                    })}
                onSubmit={values=>{
                    console.log('onSubmit',values);
                    localStorage.setItem('email',values.email);
                    // localStorage.setItem('password',values.password);
                    if(values.email===authCredentials.email&&values.password===authCredentials.password){
                        history.push('/books')

                    }
                    else{
                        alert('worng credentials');
                    }
                }}
            >
                {({errors, status, touched, values,handleChange})=>
                     (

                    <Form   >
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <Field className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} type='email' name='email' placeholder='Email' value={values.email}/>
                            <ErrorMessage name="email" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Field className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} type='password' name='password' placeholder='Password' value={values.password}/>
                            <ErrorMessage name="email" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group" style={{float:'right'}}>
                            <button type="submit" className="btn btn-primary mr-2 text-right">Login</button>
                        </div>
                        
                    </Form>
                    )
                }
            </Formik>

            </div>
        // </div>

    )
}
export default LoginPage;
