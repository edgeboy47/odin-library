class Book {
  constructor(title, author, numPages, isRead) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.isRead = isRead;
    this.id = `${title}-${author}`;
  }

  toggleRead() {
    this.isRead = !this.isRead;
  }
}

// CRUD Functions
let library = [];
library.push(new Book("The Hobbit", "J.R.R. Tolkien", 295, true));
library.push(new Book("The Other Hobbit", "Tolkien", 290, false));

function addBook(title, author, numPages, isRead) {
  const book = new Book(title, author, numPages, isRead);
  library.push(book);
  loadBooks();
}

function getBooks() {
  return Array.from(library);
}

function updateBook(id, newBook) {
  let index = library.findIndex((book) => book.id === id);
  library[index] = newBook;
  loadBooks();
}

function deleteBook(id) {
  library = library.filter((book) => book.id !== id);
  loadBooks();
}

// DOM Functions

function mapBookToCard(book) {
  return `
    <div class="card grid" data-id="${book.id}">
      <div class="card-body">
        <div class="card-title">${book.title}</div>
        <div class="card-author">${book.author}</div>
        <div class="card-pages">${book.numPages}</div>
        <div class="card-read">${book.isRead ? "Read" : "Not Read"}</div>
      </div>
      <div class="card-controls flex">
        <button type="button" class="delete-button">Delete</button>
        <button type="button" class="toggle-read-button">Mark ${
          book.isRead ? "Not Read" : "Read"
        }</button>
      </div>
    </div>
  `;
}

function loadBooks() {
  const books = getBooks().map(mapBookToCard);
  document.querySelector(".books").innerHTML = books.join("");
  attachEventHandlers();
}

document.addEventListener("onload", loadBooks());

document.querySelector(".overlay").addEventListener("click", hideForm);

document.querySelector(".add-book").addEventListener("click", () => {
  document.querySelector(".add-book-form").classList.add("active");
  document.querySelector(".overlay").classList.add("active");
});

document.querySelector(".add-book-form > form").addEventListener("submit", (e) => { 
  e.preventDefault();
  const title = document.querySelector(".add-book-form > form > input[name=title]").value;
  const author = document.querySelector(".add-book-form > form > input[name=author]").value;
  const numPages = document.querySelector(".add-book-form > form > input[name=numPages]").value;
  const isRead = document.querySelector(".add-book-form > form > input[name=isRead]").checked;
  addBook(title, author, numPages, isRead);
  hideForm();
});

function hideForm() {
  document.querySelector(".add-book-form").classList.remove("active");
  document.querySelector(".overlay").classList.remove("active");
  document.querySelector(".add-book-form > form > input[name=title]").value = "";
  document.querySelector(".add-book-form > form > input[name=author]").value = "";
  document.querySelector(".add-book-form > form > input[name=numPages]").value = "";
  document.querySelector(".add-book-form > form > input[name=isRead]").checked = false;
}

function attachEventHandlers() {
  document.querySelectorAll(".delete-button").forEach((button) => {
    button.addEventListener("click", (e) => {
      const id = e.target.parentNode.parentNode.dataset.id;
      deleteBook(id);
    });
  });

  document.querySelectorAll(".toggle-read-button").forEach((button) => {
    button.addEventListener("click", (e) => {
      const id = e.target.parentNode.parentNode.dataset.id;
      const book = getBooks().find((book) => book.id === id);
      book.toggleRead();
      updateBook(id, book);
    });
  });
}
