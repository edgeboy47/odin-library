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

const library = [];
library.push(new Book("The Hobbit", "J.R.R. Tolkien", 295, true));

function addBook(title, author, numPages, isRead) {
  const book = new Book(title, author, numPages, isRead);
  library.push(book);
}

function getBooks() {
  return Array.from(library);
}

function updateBook(id, newBook) {
  let index = library.findIndex((book) => book.id === id);
  library[index] = newBook;
}

function deleteBook(id) {
  library = library.filter((book) => book.id !== id);
}
