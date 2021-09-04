let myLibrary = [];

function main() {
    const addbtn = document.getElementById("add-book");
    addbtn.addEventListener("click", addBook)

    const geb = new Book("Godel, Escher, Bach: an Eternal Golden Braid", "Douglas Hofstadter")
    addBookToLibrary(geb);

    const dune = new Book("Dune", "Frank Herbert");
    addBookToLibrary(dune);
}

function Book(name, author) {
    this.name = name;
    this.author = author;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
    const table = document.getElementById("table");
    const row = table.insertRow(1);
    const name = row.insertCell(0);
    const author = row.insertCell(1);
    const button = row.insertCell(2);
    const remove = document.createElement("button");
    name.textContent = book.name;
    author.textContent = book.author;
    button.style.textAlign = "center";
    remove.textContent = "Remove";
    remove.addEventListener("click", removeBook);
    button.appendChild(remove);
}

const removeBook = e => {
    // Remove book from library, delete row
    myLibrary = myLibrary.filter(book => book.name != e.target.parentNode.parentNode.firstChild.textContent);
    
    // Parent = <td>, grandparent = <tr>
    let row = e.target.parentNode.parentNode.rowIndex;
    document.getElementById("table").deleteRow(row);
}

const addBook = e => {
    const name = document.getElementById("name-form").value;
    const author = document.getElementById("author-form").value;
    const book = new Book(name, author);
    addBookToLibrary(book);
    document.getElementById("name-form").value = "";
    document.getElementById("author-form").value = "";
}

main();