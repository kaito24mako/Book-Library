/* Book constructor */

const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = `By ${author}`;
    this.pages = `${pages} pages`;
    this.read = `Finished reading: ${read}`;
    this.id = crypto.randomUUID();
}

/* Add new books to the library array */

function addBookToLibrary(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", "295", "No");
addBookToLibrary("1984", "George Orwell", "182", "Yes");

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
        textGroup.append(titleText, authorText, pagesText, readText);
        
        const buttonsGroup = document.createElement("div");
        buttonsGroup.classList.add("card-buttons");
        newCard.appendChild(buttonsGroup);

        const statusButton = document.createElement("button");
        const removeButton = document.createElement("button");
        statusButton.textContent = "Change Read Status";
        removeButton.textContent = "Remove Book";
        buttonsGroup.append(statusButton, removeButton);
    }
}

getBook(myLibrary);

/* Display the new book form */

const dialog = document.querySelector("dialog");
const createBookButton = document.querySelector("#new-book-button");
const closeDialogButton = document.querySelector("#close-dialog-button");

createBookButton.addEventListener("click", () => {
    /* shows the dialog */
    dialog.showModal();
});

closeDialogButton.addEventListener("click", () => {
    dialog.close();
});

/* Display the new book onto the webpage */

const form = document.querySelector(".form-container");
const titleInput = form.elements["title"];
const authorInput = form.elements["author"];
const pagesInput = form.elements["pages"];
const readInput = form.elements["read-status"];

form.addEventListener("submit", (event) => {
    event.preventDefault();
    
    /* add new book to array */
    addBookToLibrary(titleInput.value, authorInput.value, pagesInput.value, readInput.value);

    /* display the new book */
    cardContainer.innerHTML = "";
    getBook(myLibrary);

    /* close form */
    dialog.close();
});
