
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

const hobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
