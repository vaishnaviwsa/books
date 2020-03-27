import React, {useState} from 'react';
import ActionPage from './actionPage';
import {Link,useLocation} from 'react-router-dom';
import Logout from './logout';
import {connect} from 'react-redux';
import { deleteBook,getEditBook,editField } from '../actions';


const Home=(props)=>{
    console.log('props',props);
       let location = useLocation();
       let [title,setTitle]=useState('');
       const onInptChng=(e)=>{
           e.preventDefault();
            setTitle(e.target.value);
       }
       const doneWthEdit=()=>{
           props.dispatch(editField(title));
       }
return(
        <>
         
            <div className="row p-2" style={{textAlign:'center'}}>
                <div className="col-md-8" style={{textAlign:'right'}}>
                    <h3 >YOUR BOOKS</h3>
                </div>
                <div className="col-md-4"  style={{textAlign:'right'}}>
                    <Logout/>
                </div>
            </div>
            <div className="row">
            
            {/* <div className="col-md-3"> */}
                <ActionPage>
                {/* {(xxx)=>(
                    <>
                    {setBooks(xxx)
                    }
                    </>
                )} */}
                </ActionPage>
               
        <div className="col-md-9">

                {props.books.map(bk=>(
                    <div key={bk.id} className='m-2'  style={{border:'2px #007bff solid',borderRadius: '1.25rem'}}>
                        {/* <div className='row'> Title : </div>
                        <div className='row'> Title : </div>
                        <div className='row'> Title : </div> */}

                        <div className='row p-2'>
                            <span className='col-sm-3 col-md-2' style={{width:'50px',textAlign:'right'}}>Title :</span>
                            {props.editBook.id!==bk.id?
                            <span className='col-sm-9 col-md-8'>{bk.title}</span>
                            :
                            <input type='text' className='col-sm-9 col-md-8'  value={title} name='title' onChange={(e)=>onInptChng(e)}/>
                             } 
                            {/* <span className='col-sm-3 col-md-1'><i clasName="fas fa-camera">EDIT</i></span> */}
                            <div className=' col-md-2'>
                            {props.editBook.id!==bk.id?
                            <span className='col-sm-3 col-md-6'><a href='#' onClick={()=>{props.dispatch(getEditBook(bk));setTitle(bk.title)}}>Edit</a></span>
                            :
                            <span className='col-sm-3 col-md-6'><a href='#' onClick={()=>doneWthEdit()}>Done</a></span>
                            }
                            <span className='col-sm-3 col-md-6'><a href='#' onClick={()=>props.dispatch(deleteBook(bk))}>Delete</a></span>

                            </div>

                        </div>
                        <div className='row p-2'>
                            <span className='col-sm-3 col-md-2'style={{width:'50px',textAlign:'right'}}>Author :</span>
                            <span className='col-sm-9 col-md-10'>{bk.author}</span>
                        </div>
                        <div className='row p-2'>
                            <span className='col-sm-3 col-md-2' style={{width:'50px',textAlign:'right'}}>Rating :</span>
                            <span className='col-sm-9 col-md-10'>{bk.rating}</span>
                        </div>
                        <div className='row p-2'>
                            <span className='col-sm-3 col-md-2' style={{width:'50px',textAlign:'right'}}>Publisher :</span>
                            <span className='col-sm-9 col-md-10'>{bk.publisher}</span>
                        </div>
                    </div>   
                )     
                )}
            </div>
        </div>
        
        </>
    )
}
// const mapStateToProps=state=>console.log('state',state);
const mapStateToProps=state=>({
    books:state.books.booksList,
    editBook:state.books.editBook,
})
export default connect(mapStateToProps)(Home);