let myLibrary = [];

function main() {
    const addbtn = document.getElementById("add-book");
    addbtn.addEventListener("click", addBook)

    if(!localStorage.getItem("library")) {
        localStorage.setItem("library", JSON.stringify(myLibrary));

        const geb = new Book("Godel, Escher, Bach: an Eternal Golden Braid", "Douglas Hofstadter", true)
        addBookToLibrary(geb);

        const dune = new Book("Dune", "Frank Herbert", true);
        addBookToLibrary(dune);
    } else {
        myLibrary = JSON.parse(localStorage.getItem("library"));
        populateLibrary();
    }
}

function Book(name, author, read) {
    this.name = name;
    this.author = author;
    this.read = read;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
    localStorage.setItem("library", JSON.stringify(myLibrary));
    addRow(book);
}

function addRow(book) {
    const table = document.getElementById("table");
    const row = table.insertRow(1);
    const name = row.insertCell(0);
    const author = row.insertCell(1);
    const checkbox = row.insertCell(2);
    const read = document.createElement("input");
    const button = row.insertCell(3);
    const remove = document.createElement("button");
    name.textContent = book.name;
    author.textContent = book.author;
    button.style.textAlign = "center";
    read.type = "checkbox";
    read.checked = book.read;
    checkbox.appendChild(read);
    remove.textContent = "Remove";
    remove.style.width = "60px";
    remove.addEventListener("click", removeBook);
    button.appendChild(remove);
}

function populateLibrary() {
    myLibrary.forEach(book => addRow(book));
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
    const read = document.getElementById("read-checkbox").checked;
    const book = new Book(name, author, read);
    addBookToLibrary(book);

    // Reset values to accept new input
    document.getElementById("name-form").value = "";
    document.getElementById("author-form").value = "";
    document.getElementById("read-checkbox").checked = false;
}

main();