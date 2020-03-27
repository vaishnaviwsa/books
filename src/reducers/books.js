const initialState={
    editingBook:false,
    editBook:{},
    booksList:[
    {
        id:0,
        title:"The Hunger Games",
        author:'Suzanne Collins',
        // releasedOn:'September 14th 2008',
        language:'English',
        rating:4.3,
        publisher :'xxxx'
        },
        {
        id:1,
        title:"To Kill a Mockingbird",
        author:' Harper Lee',
        // releasedOn:'May 23rd 2006',
        language:'English',
        rating:4.2,
        publisher :'yyyy'
        },
        {
        id:2,
        title:"Twilight",
        author:'Stephenie Meyer',
        // releasedOn:'September 6th 2006',
        language:'English',
        rating:3.5,
        publisher :'zzzz666666666'
        }
    ]
}



const books=(state=initialState,action)=>{
    console.log('action',action);
    let book={...action.book};
    switch(action.type){
        case 'ADD_BOOK':
            return {
                booksList:[
                ...state.booksList,
                {
                    id: book.id,
                    title:book.title,
                    author:book.author,
                    language:book.language,
                    rating:book.rating,
                    publisher :book.publisher
                }
            ],
            editBook:state.editBook,
            editingBook:state.editingBook,
        }
            case 'EDIT_FEILD':return {
                booksList:state.booksList.map(book =>  
                    // console.log('book.id',book.id,'state.editBook.id',state.editBook.id)
                    (book.id === state.editBook.id)  
                    ?   {...book,
                        title:action.title,
                        }
                    : book  
                    ) , 
                editBook:{},
                editingBook:false
            }
            case 'GET_EDIT_BOOK': 
                return {
                    editBook:{...book},
                    booksList:state.booksList ,
                    editingBook:true,
                
                }
            
            case 'EDIT_BOOK':
                return {
                booksList:state.booksList.map(bk =>  
                    (bk.id === book.id)  
                    ?   
                    {...bk,
                        title:book.title,
                        author:book.author,
                        language:book.language,
                        rating:book.rating,
                        publisher :book.publisher
                    }
                    : bk  
                    ) , 
                editBook:{},
                editingBook:false
                    
                }
            case 'DELETE_BOOK':
                return {
                    booksList:state.booksList.filter(book=>book.id!==action.book.id),
                    editBook:{},
                    editBook:false
                }
            default : return state
            
    }
}
export default books;