const libraryApp = (() => {

    /* ==== Variables ==== */

    let myLibrary = [];

    const cardContainer = document.querySelector(".card-container");
    const dialog = document.querySelector("dialog");
    const form = document.querySelector(".form-container");
    const createBookButton = document.querySelector("#new-book-button");
    const closeDialogButton = document.querySelector("#close-dialog-button");

    const titleInput = form.elements["title"];
    const authorInput = form.elements["author"];
    const pagesInput = form.elements["pages"];
    const readInput = form.elements["read-status"];

    /* ==== Book Class ==== */

    class Book {
        constructor(title, author, pages, read) {
            this.title = title;
            this.author = `By ${author}`;
            this.pages = `${pages} pages`;
            this.read = `Status: ${read}`;
            this.id = crypto.randomUUID();
        };
        toggleReadStatus() {
            this.read = this.read === "Status: Completed" ? "Status: In Progress" : "Status: Completed";
        };
    }

    /* ==== Add Books to Library Array ==== */

    function addBookToLibrary(title, author, pages, read) {
        let newBook = new Book(title, author, pages, read);
        myLibrary.push(newBook);
    }

    /* ==== Display Books ==== */

    function displayBook(array) {
        for (let i = 0; i < array.length; i++) {

            // create and append card elements 
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

            // change read status 
            statusButton.addEventListener("click", () => {
                const currentBook = myLibrary.find(book => book.id === statusButton.dataset.id);
                currentBook.toggleReadStatus();
                readText.textContent = currentBook.read;
            });

            // remove book 
            removeButton.addEventListener("click", () => {
                myLibrary = myLibrary.filter(book => book.id !== removeButton.dataset.id);
                cardContainer.innerHTML = "";
                displayBook(myLibrary);
            });
        };
    }

    /* ==== Event Listeners ==== */

    function initEventListeners() {
        createBookButton.addEventListener("click", () => {
            dialog.showModal();
        });

        closeDialogButton.addEventListener("click", () => {
            dialog.close();
            form.reset();
        });

        form.addEventListener("submit", (event) => {
            event.preventDefault();
            
            // add new book to array 
            addBookToLibrary(titleInput.value, authorInput.value, pagesInput.value, readInput.value);

            // display the new book 
            cardContainer.innerHTML = "";
            displayBook(myLibrary);

            // close and reset form 
            dialog.close();
            form.reset();
        });
    }

    /* ==== Inititalise App ==== */

    function init() {
        addBookToLibrary("The Hobbit", "J.R.R. Tolkien", "310", "In Progress");
        addBookToLibrary("1984", "George Orwell", "336", "Completed");
        addBookToLibrary("The Alchemist", "Paulo Coelho", "208", "Completed");
        addBookToLibrary("War and Peace", "Leo Tolstoy", "1225", "In Progress");

        displayBook(myLibrary);
        initEventListeners();
    }

    return {init};

})()

libraryApp.init();







