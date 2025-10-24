/* Variables */

let myLibrary = [];

const cardContainer = document.querySelector(".card-container");

const dialog = document.querySelector("dialog");
const createBookButton = document.querySelector("#new-book-button");
const closeDialogButton = document.querySelector("#close-dialog-button");

const form = document.querySelector(".form-container");
const titleInput = form.elements["title"];
const authorInput = form.elements["author"];
const pagesInput = form.elements["pages"];
const readInput = form.elements["read-status"];

/* Book constructor */

function Book(title, author, pages, read) {
    this.title = title;
    this.author = `By ${author}`;
    this.pages = `${pages} pages`;
    this.read = `Status: ${read}`;
    this.id = crypto.randomUUID();
};

Book.prototype.toggleReadStatus = function() {
    if (this.read === "Status: Completed") {
        this.read = "Status: In Progress";
    } else {
        this.read = "Status: Completed";
    };
};

/* Add new books to the library array */

function addBookToLibrary(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", "310", "In Progress");
addBookToLibrary("1984", "George Orwell", "336", "Completed");
addBookToLibrary("The Alchemist", "Paulo Coelho", "208", "Completed");
addBookToLibrary("War and Peace", "Leo Tolstoy", "1225", "In Progress");

/* Display books */

function getBook(array) {
    for (let i = 0; i < myLibrary.length; i++) {

        /* create and append card elements */
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
        statusButton.dataset.id = array[i].id;
        removeButton.dataset.id = array[i].id;
        statusButton.textContent = "Change Read Status";
        removeButton.textContent = "Remove Book";
        buttonsGroup.append(statusButton, removeButton);

        /* change read status */
        statusButton.addEventListener("click", () => {
            const currentBook = myLibrary.find(book => book.id === statusButton.dataset.id);
            currentBook.toggleReadStatus();
            readText.textContent = currentBook.read;
        });

        /* remove book */
        removeButton.addEventListener("click", () => {
            myLibrary = myLibrary.filter(book => book.id !== removeButton.dataset.id);
            cardContainer.innerHTML = "";
            getBook(myLibrary);
        });
    };
};

getBook(myLibrary);

/* Display the new book form */

createBookButton.addEventListener("click", () => {
    dialog.showModal();
});

closeDialogButton.addEventListener("click", () => {
    dialog.close();
    form.reset();
});

/* Values of the form create and display a new book */

form.addEventListener("submit", (event) => {
    event.preventDefault();
    
    /* add new book (using the values of the form inputs) to array */
    addBookToLibrary(titleInput.value, authorInput.value, pagesInput.value, readInput.value);

    /* display the new book */
    cardContainer.innerHTML = "";
    getBook(myLibrary);

    /* close and reset form */
    dialog.close();
    form.reset();
});







