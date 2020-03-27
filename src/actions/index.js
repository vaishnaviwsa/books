let nextBook = 3 
export const addBook = book => ({  
  type: 'ADD_BOOK',  
//   id: nextBook++,  
  book :{...book,id:nextBook++} 
})  

export const editBook=book=>({
    type:'EDIT_BOOK',
    book
})

export const deleteBook=book=>({
    type:'DELETE_BOOK',
    book
})

export const editField=title=>({
    type:'EDIT_FEILD',
    title
})
export const getEditBook=book=>({
    type:'GET_EDIT_BOOK',
    book
})
// export const setVisibilityFilter = filter => ({  
//   type: 'SET_VISIBILITY_FILTER',  
//   filter  
// })  
  
// export const toggleTodo = id => ({  
//   type: 'TOGGLE_TODO',  
//   id  
// })  
// export const deleteTodo = id => ({  
//   type: 'DELETE_TODO',  
//   id
// })  
  
// export const VisibilityFilters = {  
//   SHOW_ALL: 'SHOW_ALL',  
//   SHOW_COMPLETED: 'SHOW_COMPLETED',  
//   SHOW_ACTIVE: 'SHOW_ACTIVE'  
// }  