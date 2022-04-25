import logo from '../../logo.svg'
import '../../App.css'
import React, {Component} from "react";
import LibraryService from "../../repository/libraryRepository";
import Books from '../Books/BookList/books'
import Categories from "../Categories/categories"
import BookEdit from '../Books/BookEdit/bookEdit'
import BookAdd from "../Books/BookAdd/bookAdd"
import Header from "../Header/header";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      categories: [],
        authors: [],
      selectedBook: {}
    }
  }

  // ne raboti so exact render, smeni go so element ={}
  render() {
    return (
        <BrowserRouter>
          <Header/>
          <main>
            <div className="container">
              <Routes>
                <Route path={"/categories"} element={
                  <Categories categories={this.state.categories}/>}/>
                <Route path={"/books/add"} element={
                    <BookAdd books={this.state.books}
                             categories={this.state.categories}
                             onAddBook={this.addBook}
                             authors={this.state.authors}/>}/>
                <Route path={"/books/edit/:id"} element={
                  <BookEdit books={this.state.books}
                            categories={this.state.categories}
                            onEditBook={this.editBook}
                            book={this.state.selectedBook}
                            authors={this.state.authors}/>}/>
                <Route path={"/books"} element={<Books books={this.state.books}
                                                       onDelete={this.deleteBook}
                                                       onEdit={this.getBook}
                                                        onMark={this.markAsTaken}/>}/>}
                <Route path={"/"} element={<Books books={this.state.books}
                                                  onDelete={this.deleteBook}
                                                  onEdit={this.getBook}
                                                  onMark={this.markAsTaken}/>}/>
              </Routes>
            </div>
          </main>
        </BrowserRouter>
    );
  }

  componentDidMount() {
    this.loadCategories();
    this.loadBooks();
    this.loadAuthors();
  }

  loadBooks = () => {
    LibraryService.fetchBooks()
        .then((data) => {
          this.setState({
            books: data.data
          })
        });
  }

  loadCategories = () => {
    LibraryService.fetchCategories()
        .then((data) => {
          this.setState({
            categories: data.data
          })
        });
  }
    loadAuthors = () => {
        LibraryService.fetchAuthors()
            .then((data) => {
                this.setState({
                    authors: data.data
                })
            });
    }
  markAsTaken = (id) => {
    LibraryService.markAsTaken(id)
        .then(() => {
          this.loadBooks();
        });
  }

  deleteBook = (id) => {
    LibraryService.deleteBook(id)
        .then(() => {
          this.loadBooks();
        });
  }

  addBook = (name, category, author, availableCopies) => {
    LibraryService.addBook(name, category, author, availableCopies)
        .then(() => {
          this.loadBooks();
        });
  }

  getBook = (id) => {
    LibraryService.getBook(id)
        .then((data) => {
          this.setState({
            selectedBook: data.data
          })
        })
  }

  editBook = (id, name, category, author, availableCopies) => {
    LibraryService.editBook(id, name, category, author, availableCopies)
        .then(() => {
          this.loadBooks();
        });
  }



}

export default App;
