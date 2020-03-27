import React, {useState} from 'react';
import ActionPage from './actionPage';
import * as Yup from 'yup';
import {Formik,Field,Form,ErrorMessage} from 'formik';
import {Link,useHistory} from 'react-router-dom';
import Logout from './logout';
import {connect} from 'react-redux'
import { addBook } from '../actions';
// const AddBook=(children)=>{
const AddBook=(props)=>{
    // const books=localStorage.getItem('books');
    // console.log('books',books);
    console.log('props',props);
    const history=useHistory();
    // const [newBook,setNewBook]=useState({});
    // const addBook=(values)=>{
    //     alert('addBook')
    //     console.log('values',values);
    // }
return(
    <>
    <div className="row p-2" style={{textAlign:'center'}}>
        <div className="col-md-8" style={{textAlign:'right'}}>
            <h3 >ADD A BOOK</h3>
        </div>
        <div className="col-md-4"  style={{textAlign:'right'}}>
            <Logout/>
        </div>
    </div>
    <div className='row'>
       {/* Add Book............. */}
       <ActionPage>
           {/* {(book,addBook)=>(
               <>
               {console.log('addBook',addBook)}
               </>
           )} */}
        </ActionPage>


        <div className="col-md-9">
            <Formik
                initialValues={{title:'',author:'',language:'english',rating:'',publisher:''}}
                validationSchema={
                    Yup.object().shape({
                        title:Yup.string()
                        .required('Required Title'),
                        author:Yup.string()
                        .required('Required Author'),
                        language:Yup.string()
                        .required('Required Language'),
                        rating:Yup.number()
                        .required('Required Rating')
                    })
                }
                onSubmit={values=>{
                    console.log('onSubmit',values);
                    // setNewBook(values);
                    // let res=props.addBook(values);
                    let res=props.dispatch(addBook(values)) ;
                    
                    console.log('res',res);
                    if(res.book.id){
                            history.push('/books');
                    }
                    else{
                        alert('something went wrong');
                    }
                    // if(res===true){
                    //     history.push('/books');
                    // }
                    // else{
                    //     alert('something went wrong');
                    // }
                    
                }}
            >
            {({errors,touched,values})=>(
                <Form className=''>
                    <div className="form-group">
                        <label className='' style={{textAlign:'right'}} htmlFor="title">Title</label>
                        <Field   className={'col-md-6 '+'form-control' + (errors.title && touched.title ? ' is-invalid' : '')} type="title" name="title" placeholder="Title"/>
                        <ErrorMessage name="title" component="div" className="invalid-feedback" />
                    </div>

                    <div className="form-group">
                        <label className='' style={{textAlign:'right'}} htmlFor="author">Author</label>
                        <Field  className={'col-md-6 '+'form-control' + (errors.author && touched.author ? ' is-invalid' : '')} type="author" name="author" placeholder="Author"/>
                        <ErrorMessage name="author" component="div" className="invalid-feedback" />
                   </div>

                    <div className="form-group ">
                        <label className='' style={{textAlign:'right'}} htmlFor="language">Language</label>
                        <Field  className={'col-md-6 '+'form-control' + (errors.language && touched.language ? ' is-invalid' : '')} as="select" name="language">
                            <option value="english">English</option>
                            <option value="telugu">Telugu</option>
                            <option value="hindi">Hindi</option>
                        </Field>
                        <ErrorMessage name="language" component="div" className="invalid-feedback" />
                    </div>

                    <div className="form-group">
                        <label className='' style={{textAlign:'right'}} htmlFor="rating">Rating</label>
                        <Field  className={'col-md-6 '+'form-control' + (errors.rating && touched.rating ? ' is-invalid' : '')} type="rating" name="rating" placeholder="Rating"/>
                        <ErrorMessage name="rating" component="div" className="invalid-feedback" />
                    </div>

                    <div className="form-group">
                        <label className='' style={{textAlign:'right'}} htmlFor="publisher">Publisher  </label>
                        <Field  className={'col-md-6 '+'form-control' + (errors.publisher && touched.publisher ? ' is-invalid' : '')} type="publisher" name="publisher" placeholder="Publisher"/>
                   </div>

                    <div className="form-group col-md-6" style={{textAlign:'right'}}>
                        <button type="submit"  className="btn btn-primary mr-2 text-right">Login</button>
                    </div>
                </Form>
            )}
            </Formik>
        </div>
       
    </div>
    </>
    )
}
export default connect()(AddBook);