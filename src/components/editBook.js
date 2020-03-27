import React, {useState} from 'react';
import ActionPage from './actionPage';
import * as Yup from 'yup';
import {Formik,Field,Form,ErrorMessage} from 'formik';
import {Link,useHistory} from 'react-router-dom';
import Logout from './logout';
import {connect} from 'react-redux';
import { getEditBook, editBook } from '../actions';


const EditBook=(props)=>{
    let history=useHistory();
    console.log('props',props);
    // let [editBook,setEditBook]=useState({});
   
return(
    <>
        <div className="row" style={{textAlign:'center'}}>
            <div className="col-md-8" style={{textAlign:'right'}}>
                <h3 >Edit Books</h3>
            </div>
            <div className="col-md-4"  style={{textAlign:'right'}}>
                <Logout/>
            </div>
        </div>
        <div className='row'>
            <ActionPage/>
            <div className="col-md-3">
                <h4>Books</h4>
                {props.books.map(bk=>(
                    <div>
                    <div className='row p-2'><a href='#' onClick={()=>props.dispatch(getEditBook(bk))}>{bk.title}</a>
                    </div>
                    <div className='row ' style={{paddingLeft: '30px'}}>
                        <span style={{fontWeight:'bold'}}>Author : </span>
                        <span> {bk.author}</span>
                        
                    </div>
                    <div className='row ' style={{paddingLeft: '30px'}}>
                        <span style={{fontWeight:'bold'}}>Language : </span>
                        <span> {bk.language}</span>
                        
                    </div>
                    <div className='row ' style={{paddingLeft: '30px'}}>
                        <span style={{fontWeight:'bold'}}>Rating :</span>
                        <span>{bk.rating}</span>
                    </div>
                    <div className='row ' style={{paddingLeft: '30px'}}>
                        <span style={{fontWeight:'bold'}}>Publisher :</span>
                        <span>{bk.publisher}</span>
                    </div>
                    </div>
                ))}
            </div>
            <div className="col-md-6">
            {props.editingBook?
            <Formik
                initialValues={props.editBook}
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
                    props.dispatch(editBook(values));
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
                        {/* <span>
                            <button onClick={()=>history.push('/editBook')}  className="btn btn-primary mr-2 text-right">Reset</button>
                            <button onReset={()=>history.push('/editBook')}  className="btn btn-primary mr-2 text-right">Reset</button>
                        </span> */}
                        <span>
                            <button type="submit"  className="btn btn-primary mr-2 text-right">Save</button>
                        </span>
                    </div>
                </Form>
            )}
            </Formik>
            :
            <p className='' style={{padding:'12rem 0rem',fontSize:'2rem',fontWeight: 'bold',color: 'cadetblue'}}>Please Select the book</p>
            }
            </div>
        </div>
    </>
)
}
const mapStateTOProps=(state)=>({
    books:state.books.booksList,
    editBook:state.books.editBook,
    editingBook:state.books.editingBook 
})
export default connect(mapStateTOProps)(EditBook);