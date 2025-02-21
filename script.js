
class Book {
   constructor(title, author, pages, read) {
      this.title = title;
      this.author = author;
      this.pages = pages;
      this.read = read;
   }
   
   info() {
      return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? "read" : "not read yet"}`;
   }
}

class Library {
   constructor() {
      this.books = [];
   }

   addBook(book) {
      this.books.push(book);
   }

   render(libraryElement) {
      while (libraryElement.firstChild) {
         libraryElement.removeChild(libraryElement.lastChild);
      }
      
      this.books.forEach(book => {
         let bookElement = document.createElement("li");
         bookElement.innerText = book.info();
         libraryElement.appendChild(bookElement);
      });
   }
}

const myLibrary = new Library();
const libraryElement = document.querySelector(".library");

for (let i = 1; i <= 5; i++) {
   myLibrary.addBook(new Book(`Book ${i}`, `Author ${i}`, i * 100, false));
   myLibrary.render(libraryElement);
}