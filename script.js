/* Book constructor */

const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = `By ${author}`;
    this.pages = `${pages} pages`;
    this.read = `Status: ${read}`;
    this.id = crypto.randomUUID();
}

/* Add new books to the library array */

function addBookToLibrary(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", "295", "Not read yet");
addBookToLibrary("1984", "George Orwell", "182", "Read");

/* Display books */

const cardContainer = document.querySelector(".card-container");

function getBook(array) {
    for (let i = 0; i < myLibrary.length; i++) {

        const newCard = document.createElement("div");
        newCard.classList.add("card");
        cardContainer.appendChild(newCard);

        const textGroup = document.createElement("div");
        textGroup.classList.add("card-text");
        newCard.appendChild(textGroup);

        const titleText = document.createElement("h2");
        const authorText = document.createElement("p");
        const pagesText = document.createElement("p");
        const readText = document.createElement("p");
        titleText.textContent = array[i].title;
        authorText.textContent = array[i].author;
        pagesText.textContent = array[i].pages;
        readText.textContent = array[i].read;
        textGroup.appendChild(titleText);
        textGroup.appendChild(authorText);
        textGroup.appendChild(pagesText);
        textGroup.appendChild(readText);
        

        const buttonsGroup = document.createElement("div");
        buttonsGroup.classList.add("card-buttons");
        newCard.appendChild(buttonsGroup);

        const statusButton = document.createElement("button");
        const removeButton = document.createElement("button");
        statusButton.textContent = "Change Read Status";
        removeButton.textContent = "Remove Book";
        buttonsGroup.appendChild(statusButton);
        buttonsGroup.appendChild(removeButton);
    }
}

getBook(myLibrary);

/* Create and display new books */
