let myLibrary = [];

const container = document.getElementById('bookShelf');

//constructor
function Book(title, author, pages, read) {
        this.title = title,
        this.author = author,
        this.pages = pages,
        this.read = read
};

//add new book
function addBookToLibrary(title, author, pages, read) {
        let newBook = new Book(title, author, pages, read);
        myLibrary.push(newBook);
};

//template for new div for new book
function displayBook() {
        for(i = 0; i < myLibrary.length; i++) {
                const newDiv = document.createElement('div');
                const newTitle = document.createElement('p');
                const newAuthLabel = document.createElement('span');
                const newAuth = document.createElement('p');
                const newPagesLabel = document.createElement('span');
                const newPages = document.createElement('p');
                const newStatus = document.createElement('button');
                const newButton = document.createElement('button');
                const newBreak = document.createElement('br');
                
                container.appendChild(newDiv);

                newDiv.setAttribute('class', 'book');
                newDiv.setAttribute('id', 'book' + i)

                newTitle.textContent = myLibrary[i].title;
                newTitle.setAttribute('class', 'bookTitle');
                newDiv.appendChild(newTitle);

                newAuthLabel.textContent = 'Author:';
                newDiv.appendChild(newAuthLabel);

                newAuth.textContent = myLibrary[i].author;
                newAuth.setAttribute('class', 'bookAuthor');
                newDiv.appendChild(newAuth);

                newPagesLabel.textContent = 'Pages:';
                newDiv.appendChild(newPagesLabel);

                newPages.textContent = myLibrary[i].pages;
                newPages.setAttribute('class', 'bookPages');
                newDiv.appendChild(newPages);

                newStatus.textContent = myLibrary[i].read;
                newStatus.setAttribute('class', 'bookStatus');
                newStatus.setAttribute('id', 'status' + i);
                newDiv.appendChild(newStatus);

                newDiv.appendChild(newBreak);

                newButton.textContent = 'Delete';
                newButton.setAttribute('class', 'delete');
                newButton.setAttribute('id', i);
                newDiv.appendChild(newButton);
        }
}


//Placeholder books
addBookToLibrary('The Lost Symbol', 'Dan Brown', '528', 'Read');
addBookToLibrary('Brisingr', 'Christopher Paolini', '831', 'Read');
addBookToLibrary('The Way of Kings', 'Brandon Sanderson', '1007', 'Not Read');
displayBook();

//delete existing divs to avoid duplicating books
function wipe() {
        while (container.firstChild) {
                container.removeChild(container.firstChild);
        }
}

//delete button for removing book from object and div from page
const buttons = document.querySelectorAll('.delete');
for (const button of buttons) {
        button.addEventListener('click', function() {
                if (confirm("Are you sure you want to delete?")) {
                        myLibrary.splice(button.id, 1);
                        wipe()
                        displayBook();
                }
        });
}

//create new book div from form entry
document.getElementById('createBook').addEventListener('click', function() {
        let bTitle = document.querySelector('#bookTitle').value;
        let bAuthor = document.querySelector('#bookAuthor').value;
        let bPages = document.querySelector('#bookPages').value;
        let bStatus = function() {
                let radio = document.getElementsByName('bookStatus');
                for(i = 0; i < radio.length; i++) {
                        if(radio[i].checked)
                                return radio[i].value;
                }
        }

        addBookToLibrary(bTitle, bAuthor, bPages, bStatus());

        document.querySelector('#bookTitle').value = '';
        document.querySelector('#bookAuthor').value = '';
        document.querySelector('#bookPages').value = '';
        let radioClear = function() {
                let radio = document.getElementsByName('bookStatus');
                for(i = 0; i < radio.length; i++) {
                        if(radio[i].checked)
                                radio[i].checked = false;
                }
        }
        
        radioClear();        
        
        wipe()

        displayBook();
})

//Test connection.

/*
idea to have authors name link to google search
https://www.google.com/search?q=
after the equals sign each word is seperated by a + sign, ie. Dan+Brown
*/
