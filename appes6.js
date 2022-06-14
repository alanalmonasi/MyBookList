class Book {
   constructor(title, author, isbn){
      this.title = title;
      this.author = author;
      this.isbn = isbn;
   }
}

class UI {
   addBook(book){
      const list = document.getElementById('book-list');
      // Create element tr
      const row = document.createElement('tr');
      //Insert cols
      row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="delete">X<a></td>
      `;

      list.appendChild(row);
   }

   showAlert(message, className){
      const div = document.createElement('div');
      //Add classname
      div.className = `alert ${className}`;
      //Add text
      div.appendChild(document.createTextNode(message));
      //Get parent and insert the div
      const container = document.querySelector('.container');
      const form = document.querySelector('#book-form');
      container.insertBefore(div, form);
      //Time out
      setTimeout(function(){
      document.querySelector('.alert').remove();
      }, 2800);
   }

   deleteBook(target){
      if (target.className === 'delete') {
         target.parentElement.parentElement.remove();
      }
   }

   clearFields(){
      document.getElementById('title').value = '';
      document.getElementById('author').value = '';
      document.getElementById('isbn').value = '';
   }
}

//Local storage class
class Store{
   static getBooks(){
      let books;
      if(localStorage.getItem('books') === null){
         books = [];
      } else {
         books = JSON.parse(localStorage.getItem('books'));
      }
      return books;
   }

   static displayBooks(){
      const books = Store.getBooks();
      books.forEach(function(book){ 
         const ui = new UI;
         ui.addBook(book);
      });
   }

   static addBook(book){
      const books = Store.getBooks();
      books.push(book);
      localStorage.setItem('books', JSON.stringify(books));
   }

   static removeBook(isbn){
      const books = Store.getBooks();

      books.forEach(function(book, index){
         if(book.isbn === isbn){
            books.splice(index, 1);
         }
      });

      localStorage.setItem('books', JSON.stringify(books));
   }
}

//DOM Load event
document.addEventListener('DOMContentLoaded', Store.displayBooks);

//Event listeners for add book
document.getElementById('book-form').addEventListener('submit', function(e){
   // Get form values
   const title = document.getElementById('title').value
   const author = document.getElementById('author').value
   const isbn = document.getElementById('isbn').value
   
   //Instantiate book
   const book = new Book(title, author, isbn);

   //Instantiate UI
   const ui = new UI();

   //Validate data
   if(title === '' || author === '' || isbn === ''){
      //Error alert
      ui.showAlert('Fill in all fields', 'error');
   } else {
      //Add book to list
      ui.addBook(book);

      //Add to local storage
      Store.addBook(book);

      //Show succes
      ui.showAlert('Book added!', 'success');

      //Clear fields
      ui.clearFields();
   }

   e.preventDefault();
});

//Event listener for delete
document.getElementById('book-list').addEventListener('click', function(e){

   //Instantiate UI
   const ui = new UI();

   ui.deleteBook(e.target);

   //Remove from LS
   Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

   //Show message
   ui.showAlert('Book deleted', 'success');

   e.preventDefault();
})