//Book constructor
function Book(title, author, isbn){
   this.title = title;
   this.author = author;
   this.isbn = isbn;
}

//UI constructor
function UI(){
}

//Add book to list
UI.prototype.addBook = function(book){
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

//Show alert
UI.prototype.showAlert = function(message, className){
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

//Delete book
UI.prototype.deleteBook = function(target) {
   if (target.className === 'delete') {
      target.parentElement.parentElement.remove();
   }
}

//Clear fields
UI.prototype.clearFields = function(){
   document.getElementById('title').value = '';
   document.getElementById('author').value = '';
   document.getElementById('isbn').value = '';
}

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

   //Show message
   ui.showAlert('Book deleted', 'success');

   e.preventDefault();
})