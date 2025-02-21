
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

for (let i = 1; i <= 5; i++) {
   addBookToLibrary(new Book(`Book ${i}`, `Author ${i}`, i * 100, false), myLibrary);
}

const bookList = document.querySelector(".books");

myLibrary.forEach(book => {
   let bookElement = document.createElement("li");
   bookElement.innerText = book.info();
   bookList.appendChild(bookElement);
});