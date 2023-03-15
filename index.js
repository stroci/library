// Container for the book divs
const displayDiv = document.querySelector(".book-list");

// On screen button for adding a new book
const addButton = document.querySelector("#add-book");

// Container for input form
const formContainer = document.querySelector(".form-container");

// Form elements
const cancelButton = document.querySelector("#cancel-button");
const confirmButton = document.querySelector("#confirm-button");
const inputTitle = document.querySelector("#book-title");
const inputAuthor = document.querySelector("#book-author");
const inputPages = document.querySelector("#book-pages");

// Placeholder for currently selected book
let currentBook = null;

let myLibrary = [];

function init() {
    let book1 = new Book("Sedam duhovnih zakona uspjeha","Deepak Chopra","222", false);
    addBookToLibrary(book1);
    let book2 = new Book("Probudite diva u sebi","Anthony Robbins","122", false);
    addBookToLibrary(book2);
    let book3 = new Book("Uradi sam","John doe","422", true);
    addBookToLibrary(book3);
}

init();

// function BookItem() {
//   // Create new book div for book-list div
//   let bookItem = document.createElement("div")
//   let bookTitle = document.createElement("h3");
//   let bookAuthor = document.createElement("p");
//   let bookPages = document.createElement("p");
//   let bookRead = document.createElement("p");
//   bookItem.classList.add("book");
//   bookTitle.classList.add("book-title");
//   bookAuthor.classList.add("book-author");
//   bookPages.classList.add("book-pages");
//   bookItem.appendChild(bookTitle);
//   bookItem.appendChild(bookAuthor);
//   bookItem.appendChild(bookPages);
//   bookItem.appendChild(bookRead);
//   return bookItem;
// }

function createNewBookDiv(book) {
    // Create new book div for book-list div
    let bookItem = document.createElement("div")
    let bookTitle = document.createElement("h3");
    let bookAuthor = document.createElement("p");
    let bookPages = document.createElement("p");


    let bookRead = document.createElement("input");
    
    let bookEdit = document.createElement("div");
    bookRead.type = "checkbox";
    let bookDelete = document.createElement("div");
    bookDelete.title = "Delete book"
    let bookModify = document.createElement("div");
    bookModify.title = "Change book details"
    let bookDetails = document.createElement("div");
    let bookStatus = document.createElement("div");
    bookStatus.innerText="Completed"

    bookModify.classList.add("book-modify");
    bookDetails.classList.add("book-details");
    bookItem.classList.add("book");
    bookTitle.classList.add("book-title");
    bookAuthor.classList.add("book-author");
    bookPages.classList.add("book-pages");
    bookRead.classList.add("book-read");
    bookDelete.classList.add("book-delete");
    bookEdit.classList.add("book-edit");
    bookStatus.classList.add("book-status");

    bookStatus.appendChild(bookRead);
    bookModify.appendChild(bookStatus);
    bookModify.appendChild(bookEdit);
    bookModify.appendChild(bookDelete);
    bookDetails.appendChild(bookTitle);
    bookDetails.appendChild(bookAuthor);
    bookDetails.appendChild(bookPages);
    bookItem.appendChild(bookDetails);
    bookItem.appendChild(bookModify);
    /* bookItem.appendChild(bookDelete);*/
    
    // Apply book attributes to HTML elements
    bookTitle.textContent=`${book.title}`;
    bookAuthor.textContent=`${book.author}`;
    bookPages.textContent=`${book.pages}`
    bookRead.checked= `${book.read}`==="true" ? true : false;
    bookDelete.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    bookEdit.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>';

    // Click on trash icon deletes parent element
    bookDelete.addEventListener("click", function(e) {
        this.parentElement.parentElement.remove();
        let index = findBookIndexByTitle(this.parentElement.parentElement);
        // let result2 = myLibrary.findIndex(book => book.title === this.parentElement.childNodes[0].textContent);
        myLibrary.splice(index,1);
    })

    bookRead.addEventListener("change", function(e) {
        index = findBookIndexByTitle(this.parentElement);
        myLibrary[index].read = e.target.checked;
        console.log(myLibrary[index].read);
    })

    bookEdit.addEventListener("click", function(e) {
        let bookElement = this.parentElement.parentElement;
        openDialogBox(e.target);
        inputTitle.value = bookElement.querySelector(".book-title").textContent;
        inputAuthor.value = bookElement.querySelector(".book-author").textContent;
        inputPages.value = bookElement.querySelector(".book-pages").textContent;
    });

    return bookItem;
}

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

function addBookToLibrary(book) {
    myLibrary.push(book);
    displayDiv.appendChild(createNewBookDiv(book));
}

function findBookIndexByTitle(bookDiv) {
    return myLibrary.findIndex(book => book.title === bookDiv.childNodes[0].textContent);
}

function openDialogBox(target) {
    console.log(target);
    if (target.id !== 'add-book') {
        currentBook = target.parentElement.parentElement.previousSibling;
        confirmButton.innerText = "Update";
    } else {
        confirmButton.innerText = "Add";
    }
    formContainer.style.display = "flex";
}

function closeDialogBox() {
    formContainer.style.display = "none";
}

addButton.addEventListener("click", (e) => {
    openDialogBox(e.target);
})

cancelButton.addEventListener("click", (e) => {
    closeDialogBox();
})

window.onclick = function(event) {
    if (event.target == formContainer) {
        formContainer.style.display = "none";
    }
}

confirmButton.addEventListener(("click"), (e) =>
    {
        e.preventDefault();
        let title = inputTitle.value;
        let author = inputAuthor.value;
        let pages = inputPages.value;
        const newBook = new Book(title,author,pages,false);
        if (confirmButton.innerText === "Update") {
            updatebookinLibrary(currentBook, newBook);
        } else {
            addBookToLibrary(newBook);
        }
        formContainer.children[0].reset();
        formContainer.style.display = "none";
    }
)

function updatebookinLibrary(currentBook, newBook) {
    let index = findBookIndexByTitle(currentBook);
    myLibrary[index] = newBook;
    currentBook.querySelector(".book-title").textContent = newBook.title;
    currentBook.querySelector(".book-author").textContent = newBook.author;
    currentBook.querySelector(".book-pages").textContent = newBook.pages;
}