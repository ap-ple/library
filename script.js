
const capitalize = phrase => phrase[0].toUpperCase() + phrase.slice(1);

const readText = read => read ? "read" : "not read"

class Book {
   constructor(title, author, pages, read) {
      this.title = title;
      this.author = author;
      this.pages = pages;
      this.read = read;

      this.element = document.createElement("li");

      this.infoElement = document.createElement("div");
      this.element.appendChild(this.infoElement);

      this.readButton = document.createElement("button");
      this.readButton.classList.add("read");
      this.readButton.addEventListener("click", () => this.toggleRead());
      this.element.appendChild(this.readButton);

      this.updateDisplay();
   }

   info() {
      return `${this.title} by ${this.author}, ${this.pages} pages, ${readText(this.read)}`;
   }

   updateDisplay() {
      this.infoElement.innerText = this.info();
      this.readButton.innerText = capitalize(readText(!this.read));
   }

   toggleRead() {
      this.read = !this.read;
      this.updateDisplay();
   }
}

class BookForm {
   constructor(library) {
      this.library = library;

      this.element = document.createElement("li");
      this.element.classList.add("new-book");

      let form = document.createElement("form");
      form.addEventListener("submit", event => {
         event.preventDefault();
         let bookIndex = Number(this.element["data-index"]);
         this.library.removeBook(bookIndex);
         let values = [];
         
         const formData = new FormData(event.target);

         for (const pair of formData) {
            const key = pair[0];
            const value = pair[1];

            if (key.match("read")) {
               values.push(value.match("true"));
            }
            else if (key.match("pages")) {
               values.push(Number(value));
            }
            else {
               values.push(value);
            }
         }

         this.library.insertBook(bookIndex, new Book(...values));
         this.library.render()
      });

      let elementNames = ["title", "author", "pages", "read"];
      let elements = [];

      for (const elementName of elementNames) {
         let element;

         if (elementName === "read") {
            element = document.createElement("select");

            let placeholder = document.createElement("option");
            placeholder.value = "";
            placeholder.innerText = "Read?"
            placeholder.disabled = true;
            placeholder.selected = true;
            element.appendChild(placeholder);

            let optionNames = [capitalize(readText(true)), capitalize(readText(false))];
            for (const optionName of optionNames) {
               let option = document.createElement("option");
               option.innerText = optionName;
               option.value = optionName === capitalize(readText(true));
               element.appendChild(option);
            };
         }
         else {
            element = document.createElement("input");
            if (elementName === "pages") {
               element.type = "number";
               element.min = 1;
            }
            else {
               element.type = "text";
            }
            element.placeholder = capitalize(elementName);
         }

         element.name = elementName;
         elements.push(element);
      };
      
      for (const element of elements) {
         element.required = true;
         form.appendChild(element);
      };

      let addButton = document.createElement("button");
      addButton.innerText = "Add";

      form.appendChild(addButton);

      this.element.appendChild(form);
   }
}

class Library {
   constructor(element) {
      this.element = element;
      this.books = [];
   }

   addBook(book) {
      this.books.push(book);
   }

   insertBook(index, book) {
      this.books.splice(index, 0, book);
   }

   removeBook(index) {
      this.books.splice(index, 1);
   }

   render() {
      while (this.element.firstChild) {
         this.element.removeChild(this.element.lastChild);
      }
      
      for (let i = 0; i < this.books.length; i++) {
         let book = this.books[i];
         book.element["data-index"] = i;

         let removeButton = book.element.querySelector("button.remove");
         
         if (removeButton !== null) {
            book.element.removeChild(removeButton);
         }
         
         removeButton = document.createElement("button");

         removeButton.classList.add("remove");
         removeButton.innerText = "Remove";

         removeButton.addEventListener("click", () => {
            this.removeBook(i);
            this.render();
         });

         book.element.prepend(removeButton);

         this.element.appendChild(book.element);
      };
   }
}

const booksElement = document.querySelector("body>main>.library>ul");
const myLibrary = new Library(booksElement);

const addBookButton = document.querySelector("body>main>.library>button.add-book");
addBookButton.addEventListener("click", () => {
   myLibrary.addBook(new BookForm(myLibrary));
   myLibrary.render();
});