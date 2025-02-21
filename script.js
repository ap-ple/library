
const myLibrary = [];

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

const addBookToLibrary = (book, library) => {
   library.push(book);
}

const renderLibrary = (library, libraryElement) => {
   while (libraryElement.firstChild) {
      libraryElement.removeChild(libraryElement.lastChild);
   }
   
   library.forEach(book => {
      let bookElement = document.createElement("li");
      bookElement.innerText = book.info();
      libraryElement.appendChild(bookElement);
   });
}

const libraryElement = document.querySelector(".library");

for (let i = 1; i <= 5; i++) {
   addBookToLibrary(new Book(`Book ${i}`, `Author ${i}`, i * 100, false), myLibrary);
   renderLibrary(myLibrary, libraryElement);
}