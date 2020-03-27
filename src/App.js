import React, {useEffect,useState} from 'react';
import './App.css';
import Login from './components/login';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,useHistory
} from "react-router-dom";
import BugsData from './components/bugsData';
import FormikLogin from './components/formikLogin';
import LoginPage from './components/loginPage';
import ActionPage from './components/actionPage';
import Home from './components/home';
import AddBook from './components/addBook';
import EditBook from './components/editBook';
import {createStore} from 'redux';
import {Provider} from 'react-redux'; 
import rootReducer from './reducers';

function App() {
  const store=createStore(rootReducer);
  const [showData,setShowData]=useState(false)
  const [books,setBooks]=useState([{
    id:234,
    title:"The Hunger Games",
    author:'Suzanne Collins',
    // releasedOn:'September 14th 2008',
    language:'English',
    rating:4.3,
    publisher :'xxxx'
    },
    {
    id:346,
    title:"To Kill a Mockingbird",
    author:' Harper Lee',
    // releasedOn:'May 23rd 2006',
    language:'English',
    rating:4.2,
    publisher :'yyyy'
    },
    {
    id:897,
    title:"Twilight",
    author:'Stephenie Meyer',
    // releasedOn:'September 6th 2006',
    language:'English',
    rating:3.5,
    publisher :'zzzz666666666'
    }]);
    const [editBook,setEdtBk]=useState({});
    const addBook=(newBook)=>{
        // console.log('values',newBook);
        let boksLst=[...books];
        boksLst.push({...newBook,id:Math.round(Math.random()*100)});
        console.log('boksLst',boksLst);
        setBooks(boksLst)
        return true;
    }
    const onClickEdit=(e,bk)=>{

      // console.log('editing',bk);
      if(editBook.id){
        alert('something in editing,please cancel or save changes');
        return false;
      }
      // setEdtBk({});
      else{

        setEdtBk(bk);
      }
    }
    const onInptChng=(e)=>{
      e.preventDefault();
      let newBooks=books.map(bk=>{
        if(editBook.id===bk.id){
          bk.title=e.target.value;
          return bk;
        }
        else return bk;
      })
      // console.log('newBooks',newBooks);
      setBooks(newBooks);
    }
    const doneWthEdit=(e)=>{
      setEdtBk({});
    }
    const deleteBook=(e,bk)=>{
      let newBooks=books.filter(bok=>bok.id!=bk.id);
      // console.log('newBooks',newBooks);
      setBooks(newBooks);
    }
    const onEditBook=(book)=>{
      let newBooks=books.map(bk=>{
        if(editBook.id===bk.id){
          // bk.title=e.target.value;
          return book;
        }
        else return bk;
      })
      setBooks(newBooks);
      // alert('Saved Changes Successfully');
      setEdtBk({});
    }
  return (
    <Router>
      <div >
        
        <Switch>
          <Route exact path="/">
            <Provider store={store} >
                <LoginPage/>
            </Provider>
          </Route>
          <Route path="/bugs">
            <BugsData />
          </Route>
          <Route path="/actionPage">
            <Provider store={store} >
                <ActionPage/>
            </Provider>
          </Route>
          <Route path="/books">
            <Provider store={store} >
              <Home />
              {/* <Home
                books={books}
                editBook={editBook}
                onClickEdit={onClickEdit}
                onInptChng={onInptChng}
                doneWthEdit={doneWthEdit}
                deleteBook={deleteBook}
              /> */}
            </Provider>
          </Route>
          <Route path="/addBook">
              <Provider store={store} >
                <AddBook/>   
                {/* <AddBook
                  books={books}
                  addBook={addBook}
                /> */}
              </Provider>
          </Route>
          <Route path="/editBook">
              <Provider store={store} >
                <EditBook/>
              </Provider>
            {/* <EditBook
              books={books}
              editBook={editBook}
              onClickEdit={onClickEdit}
              onEditBook={onEditBook}
            /> */}
          </Route>
          
        </Switch>
        
      </div>
    </Router>
  );
}

export default App;
