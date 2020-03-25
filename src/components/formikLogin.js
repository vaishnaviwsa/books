import React, {useState} from 'react';
import {Form,Formik,FormikProps,Field,ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory, useLocation,Redirect 
  } from "react-router-dom";

const MyInput = ({field, form, ...props}) => {
    return <input {...field} {...props} />;
};


const FormikLogin=()=>{
    const history = useHistory();
    const location = useLocation();
    return (
        <div>
            <h1>My Form</h1>
            <Formik
                initialValues={{email:'',password:''}}
            >
                {(props)=>(

                     <Form>
                         {console.log(props)}
                        <Field type='email' name='email' placeholder='Email' />
                        <input 
                            name="test"
                            onChange={props.handleChange}
                        />
                    </Form>
                )

                }
               
            </Formik>
            <InputFieldBox>
                {(value) => (
                    <>
                        <br />hello from parent - Here's your value = {value}
                    </>
                )}
            </InputFieldBox>>
        </div>



    //     <Formik
    //     initialValues={{
    //         firstName: '',
    //         lastName: '',
    //         email: '',
    //         password: '',
    //         confirmPassword: ''
    //     }}
    //     validationSchema={Yup.object().shape({
    //         firstName: Yup.string()
    //             .required('First Name is required'),
    //         lastName: Yup.string()
    //             .required('Last Name is required'),
    //         email: Yup.string()
    //             .email('Email is invalid')
    //             .required('Email is required'),
    //         password: Yup.string()
    //             .min(6, 'Password must be at least 6 characters')
    //             .required('Password is required'),
    //         confirmPassword: Yup.string()
    //             .oneOf([Yup.ref('password'), null], 'Passwords must match')
    //             .required('Confirm Password is required')
    //     })}
    //     onSubmit={fields => {
    //         console.log('location-state',location.state);
    //         // const { from } = location.state || { from: { pathname: '/bugs' } };
    //         // history.replace(from);
    //         history.push("/bugs")
    //         // return <Redirect to='/bugs' /> 
    //         // alert('SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 4));
    //         // <Link to="/bugs">About</Link>
    //     }}
    //     render={({ errors, status, touched }) => (
    //         <Form style={{margin:'20px'}}>
    //             <div className="form-group">
    //                 <label htmlFor="firstName">First Name</label>
    //                 <Field name="firstName" type="text" className={'form-control' + (errors.firstName && touched.firstName ? ' is-invalid' : '')} />
    //                 <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
    //             </div>
    //             <div className="form-group">
    //                 <label htmlFor="lastName">Last Name</label>
    //                 <Field name="lastName" type="text" className={'form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '')} />
    //                 <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
    //             </div>
    //             <div className="form-group">
    //                 <label htmlFor="email">Email</label>
    //                 <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
    //                 <ErrorMessage name="email" component="div" className="invalid-feedback" />
    //             </div>
    //             <div className="form-group">
    //                 <label htmlFor="password">Password</label>
    //                 <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
    //                 <ErrorMessage name="password" component="div" className="invalid-feedback" />
    //             </div>
    //             <div className="form-group">
    //                 <label htmlFor="confirmPassword">Confirm Password</label>
    //                 <Field name="confirmPassword" type="password" className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')} />
    //                 <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
    //             </div>
    //             <div className="form-group">
    //                 {/* <Link to="/bugs"> */}
    //                     <button type="submit" className="btn btn-primary mr-2">Register</button>
    //                 {/* </Link> */}
    //                 {/* <button type="reset" className="btn btn-secondary">Reset</button> */}
    //             </div>
    //         </Form>
    //     )}
    // />
    )
}
export default FormikLogin;


const InputFieldBox = ({ children }) => {
    const [value, setValue] = useState('')

    return(
        <div style={{ margin: 300}}>
            child 
            <input 
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            {children(value)}
            {/* {props.children(value)} */}
        </div>
    )
}