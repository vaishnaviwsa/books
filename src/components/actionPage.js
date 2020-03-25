import React, {useState} from 'react';
import {Link,useHistory} from 'react-router-dom';
import Home from './home';
import AddBook from './addBook';
import { localeData } from 'moment';
import Logout from './logout';

const ActionPage=({children})=>{
    const history=useHistory();
    const [showComp,setComp]=useState('');
    const [books,setBooks]=useState([{
        title:"The Hunger Games",
        author:'Suzanne Collins',
        // releasedOn:'September 14th 2008',
        language:'English',
        rating:4.3,
        publisher :'xxxx'
        },
        {
        title:"To Kill a Mockingbird",
        author:' Harper Lee',
        // releasedOn:'May 23rd 2006',
        language:'English',
        rating:4.2,
        publisher :'yyyy'
        },
        {
        title:"Twilight",
        author:'Stephenie Meyer',
        // releasedOn:'September 6th 2006',
        language:'English',
        rating:3.5,
        publisher :'zzzz666666666'
        }]);
        
   
    const addBook=(newBook)=>{
        alert('tiggered');
        console.log('values',newBook);
        let boksLst=[...books];
        boksLst.push(newBook);
        console.log('boksLst',boksLst);
        setBooks(boksLst)
        history.push('/home',newBook);
    }
    // localStorage.setItem('books',books);
    return(
        <>
       
        <div className="col-md-3">
        {/* {children(books,addBook)} */}
            <ul className="nav flex-column nav-tabs ">
                <li className="nav-item ">
                    <Link className="nav-link " to="/books">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link " to="/addBook">Add Book</Link>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/editBook">Edit Books</a>
                </li>
                {/* <li className="nav-item">
                    <a className="nav-link disabled" href="#">Disabled</a>
                </li> */}
            </ul>
        
       </div>
        </>
    )
}
export default ActionPage;