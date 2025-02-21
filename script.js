
const capitalize = phrase => phrase[0].toUpperCase() + phrase.slice(1);

class Book {
   constructor(title, author, pages, read) {
      this.title = title;
      this.author = author;
      this.pages = pages;
      this.read = read;

      this.element = document.createElement("li");
      this.element.innerText = this.info();
   }
   
   info() {
      return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? "read" : "not read yet"}`;
   }
}

class NewBook {
   constructor(library, creatorButton) {
      this.library = library;
      this.creatorButton = creatorButton;

      this.creatorButton.disabled = true;

      this.element = document.createElement("li");
      this.element.classList.add("new-book");

      let form = document.createElement("form");
      form.addEventListener("submit", event => {
         event.preventDefault();
         this.library.popBook();
         let values = [];
         Array.from(event.target.children).forEach(element => {
            if (element.name === "read") {
               values.push(element.value === "true");
            }
            else if (element.tagName !== "button") {
               values.push(element.value);
            }
         });

         this.library.addBook(new Book(...values));
         this.library.render()
         this.creatorButton.disabled = false;
      });

      let elementNames = ["title", "author", "pages", "read"];
      let elements = [];

      elementNames.forEach(elementName => {
         let element;

         if (elementName === "read") {
            element = document.createElement("select");

            let placeholder = document.createElement("option");
            placeholder.value = "";
            placeholder.innerText = "Read?"
            placeholder.disabled = true;
            placeholder.selected = true;
            element.appendChild(placeholder);

            let optionNames = ["Read", "Not read yet"];
            optionNames.forEach(optionName => {
               let option = document.createElement("option");
               option.innerText = optionName;
               option.value = optionName === "Read";
               element.appendChild(option);
            });
         }
         else {
            element = document.createElement("input");
            element.placeholder = capitalize(elementName);
         }

         element.name = elementName;
         elements.push(element);
      });
      
      elements.forEach(element => {
         element.required = true;
         form.appendChild(element);
      });

      let addButton = document.createElement("button");
      addButton.innerText = "Add";
      form.appendChild(addButton);

      this.element.appendChild(form);
   }
}

class Library {
   constructor(libraryElement) {
      this.libraryElement = libraryElement;
      this.books = [];
   }

   addBook(book) {
      this.books.push(book);
   }

   removeBook(index) {

   }

   popBook() {
      this.books.pop();
   }

   render() {
      while (this.libraryElement.firstChild) {
         this.libraryElement.removeChild(this.libraryElement.lastChild);
      }
      
      this.books.forEach(book => {
         this.libraryElement.appendChild(book.element);
      });
   }
}

const libraryElement = document.querySelector(".library");
const myLibrary = new Library(libraryElement);

for (let i = 1; i <= 5; i++) {
   myLibrary.addBook(new Book(`Book ${i}`, `Author ${i}`, i * 100, false));
   myLibrary.render();
}

const addBookButton = document.querySelector("button.add-book");

addBookButton.addEventListener("click", event => {
   if (!("new-book" in myLibrary.libraryElement.lastChild.classList)) {
      myLibrary.addBook(new NewBook(myLibrary, event.target));
      myLibrary.render();
   }
});