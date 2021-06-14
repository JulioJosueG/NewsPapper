import "./App.css";
import NewsList from "./components/NewsList";
import SearchBox from "./components/SearchBox";
import React, { Component, Fragment } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import TopBar from "./components/topBar";
import Footer from "./components/Footer";

const options = [
  { value: "business", label: "Business" },
  { value: "entertainment", label: "Entertainment" },
  { value: "general", label: "General" },
  { value: "health", label: "Health" },
  { value: "science", label: "Science" },
  { value: "sports", label: "Sports" },
  { value: "technology", label: "Technology" },
];

const optionsb = [
  { value: "ae", label: "UAE" },
  { value: "ar", label: "Argentina" },
  { value: "at", label: "Austria" },
  { value: "au", label: "Australia" },
  { value: "be", label: "Belgica" },
  { value: "bg", label: "Bulgaria" },
  { value: "br", label: "Brazil" },
  { value: "ca", label: "Canada" },
  { value: "ch", label: "Suiza" },
  { value: "cn", label: "China" },
  { value: "co", label: "Colombia" },
  { value: "cu", label: "Cuba" },
  { value: "cz", label: "Republica Checa" },
  { value: "de", label: "Alemania" },
  { value: "eg", label: "Egipto" },
  { value: "fr", label: "Francia" },
  { value: "gb", label: "Reino Unido" },
  { value: "gr", label: "Grecia" },
  { value: "hk", label: "Hong Kong" },
  { value: "hu", label: "Hungria" },
  { value: "id", label: "Indonesia" },
  { value: "ie", label: "Irlanda" },
  { value: "il", label: "Israel" },
  { value: "in", label: "India" },
  { value: "it", label: "Italia" },
  { value: "jp", label: "Japon" },
  { value: "kr", label: "Sur Korea" },
  { value: "lt", label: "Lituania" },
  { value: "lv", label: "Latvia" },
  { value: "ma", label: "Marruecos" },
  { value: "mx", label: "Mexico" },
  { value: "my", label: "Malasia" },
  { value: "ng", label: "Nigeria" },
  { value: "nl", label: "Holanda" },
  { value: "no", label: "Nueruega" },
  { value: "nz", label: "Nueva Zelanda" },
  { value: "ph", label: "Philipinas" },
  { value: "pl", label: "Polonia" },
  { value: "pt", label: "Portugal" },
  { value: "ro", label: "Rumania" },
  { value: "rs", label: "Serbia" },
  { value: "ru", label: "Rusia" },
  { value: "sa", label: "Arabia Saudita" },
  { value: "se", label: "Sueciia" },
  { value: "sg", label: "Singapur" },
  { value: "si", label: "Slovenia" },
  { value: "sk", label: "Slovakia" },
  { value: "th", label: "Tailandia" },
  { value: "tr", label: "Turkia" },
  { value: "tw", label: "Taiwan" },
  { value: "ua", label: "Ukrania" },
  { value: "us", label: "Estados Unidos" },
  { value: "ve", label: "Venezuela" },
  { value: "za", label: "Sudafrica" },
];

const optionsSor = [
  { value: "publishedAt", label: "Fecha de Publicacion" },
  { value: "relevancy", label: "Relevancia" },
  { value: "popularity", label: "Pupularidad" },
];

class App extends Component {
  // Estado
  state = {
    isLoading: true,
    articles: [],
    errorMessage: "",
    searching: false,
    searchText: null,
    selectedOption: null,
    api: null,
    offset: 0,
    perPage: 4,
    currentPage: 0,
  };

  HandleBusqueda = (selectedOption) => {
    this.setState({ selectedOption: selectedOption });
    console.log(selectedOption);
    this.search(selectedOption, null, null, null);
  };

  handleCountry = (selectedOption) => {
    this.setState({ selectedOption: selectedOption.target.value });
    console.log(selectedOption.target.value);
    this.search(null, selectedOption.target.value, null, null);
  };
  handleCategory = (selectedOption) => {
    this.setState({ selectedOption: selectedOption.target.id });
    console.log(selectedOption.target.id);
    this.search(null, null, selectedOption.target.id, null);
  };
  handleSortBy = (selectedOption) => {
    this.setState({ selectedOption: selectedOption.target.value });
    console.log(selectedOption.target.value);
    this.search(null, null, null, selectedOption.target.value);
  };

  componentDidMount() {
    this.search(null);
  }

  //Handles
  handleSearchBox = (value) => {
    this.search(value, null, null, null);
  };

  handleSearchBoxClear = () => {
    this.search();
  };

  handlePageClick = (e) => {
    let selectedPage = e.selected;
    let offset = selectedPage * this.state.perPage;
    this.setState(
      {
        currentPage: selectedPage,
        offset: offset,
      },
      () => {
        this.search();
      }
    );
  };

  // GET
  search = (q, country, category, sortBy) => {
    let apiURL =
      "https://newsapi.org/v2/top-headlines?country=us&apiKey=c90db1a67a924568a96493d498eeab6b&pageSize=100";

    if (this.state.api != null) {
      apiURL = this.state.api;
    }
    if (category != null) {
      apiURL =
        "https://newsapi.org/v2/top-headlines?apiKey=89fad77ad3e94e68bca56a348a36f672&pageSize=100&Category=" +
        category;
    }
    if (sortBy != null) {
      apiURL =
        "https://newsapi.org/v2/everything?apiKey=89fad77ad3e94e68bca56a348a36f672&pageSize=100&q=" +
        this.state.searchText +
        "&sortBy=" +
        sortBy;
    }
    if (country != null) {
      apiURL =
        "https://newsapi.org/v2/top-headlines?apiKey=89fad77ad3e94e68bca56a348a36f672&pageSize=100&Country=" +
        country;
    }

    if (q != null) {
      apiURL =
        "https://newsapi.org/v2/everything?apiKey=89fad77ad3e94e68bca56a348a36f672&pageSize=100&q=" +
        q;
    }
    axios
      .get(apiURL)
      .then((res) => {
        this.setState({
          pageCount: Math.ceil(res.data.articles.length / this.state.perPage),
          articles: res.data.articles.slice(
            this.state.offset,
            this.state.offset + this.state.perPage
          ),
          isLoading: false,
          api: apiURL,
          searching: q != null,
          searchText: q,
        });
      })
      .catch((err) => {
        this.setState({
          isLoading: false,
          articles: [],
          errorMessage: err.response.data.message,
        });
      });
  };

  //Renderizado
  render() {
    return (
      <div>
        <TopBar />
        <div className="App container">
          <header>
            <h1>
              <img src="/newsIcon.png" width="80px" height="40px" />
              TimesNow{" "}
            </h1>
          </header>
          <body>
            <SearchBox
              value={this.state.searchText}
              onClear={this.handleSearchBoxClear}
              onSearch={this.HandleBusqueda}
              searching={this.state.searching}
            />
            {this.state.errorMessage ? (
              <div className="alert alert-danger">
                {this.state.errorMessage}
              </div>
            ) : null}

            <div className="nav-bar">
              <div className="container">
                <nav className="navbar navbar-expand-md bg-dark navbar-dark">
                  <a href="#" className="navbar-brand">
                    MENU
                  </a>
                  <button
                    type="button"
                    className="navbar-toggler"
                    data-toggle="collapse"
                    data-target="#navbarCollapse"
                  >
                    <span className="navbar-toggler-icon"></span>
                  </button>

                  <div
                    className="collapse navbar-collapse justify-content-between"
                    id="navbarCollapse"
                  >
                    <div className="navbar-nav mr-auto">
                      <a href="index.html" className="nav-item nav-link active">
                        Home
                      </a>

                      <li
                        id="business"
                        onClick={this.handleCategory}
                        className="nav-item nav-link"
                      >
                        Business
                      </li>
                      <li
                        id="entertainment"
                        onClick={this.handleCategory}
                        className="nav-item nav-link"
                      >
                        Entertainment
                      </li>

                      <li
                        id="general"
                        onClick={this.handleCategory}
                        className="nav-item nav-link"
                      >
                        General
                      </li>
                      <li
                        id="health"
                        onClick={this.handleCategory}
                        className="nav-item nav-link"
                      >
                        Health
                      </li>
                      <li
                        id="science"
                        onClick={this.handleCategory}
                        className="nav-item nav-link"
                      >
                        Science
                      </li>
                      <li
                        id="sports"
                        onClick={this.handleCategory}
                        className="nav-item nav-link"
                      >
                        Sports
                      </li>
                      <li
                        id="technology"
                        onClick={this.handleCategory}
                        className="nav-item nav-link"
                      >
                        Technology
                      </li>
                    </div>

                    <div className="social ml-auto">
                      <a href="https://twitter.com/JJ_0020">
                        <i className="fab fa-twitter"></i>
                      </a>
                      <a href="https://www.youtube.com/channel/UCgoaq4GhCiLjX9FLfx60kWQ">
                        <i className="fab fa-youtube"></i>
                      </a>
                      <a href="https://github.com/JulioJosueG/NewsPapper">
                        <i className="fab fa-git"></i>
                      </a>
                    </div>
                  </div>
                </nav>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-9">
                <NewsList
                  isLoading={this.state.isLoading}
                  articles={this.state.articles}
                />
                <ReactPaginate
                  previousLabel={"prev"}
                  nextLabel={"next"}
                  breakLabel={"..."}
                  breakClassName={"break-me"}
                  pageCount={this.state.pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={20}
                  onPageChange={this.handlePageClick}
                  containerClassName={"pagination"}
                  subContainerClassName={"pages pagination"}
                  activeClassName={"active"}
                />
              </div>

              <div className="col-sm-3 mt-3 filtro ">
                <p className="mt-3">Filtro por Pais </p>
                <select
                  placeholder="Selecione"
                  name="countries"
                  onChange={this.handleCountry}
                >
                  <option value="" disabled selected>
                    Selecciona el Pais
                  </option>
                  {optionsb.map((elemento) => (
                    <option key={elemento.value} value={elemento.value}>
                      {elemento.label}
                    </option>
                  ))}
                </select>

                <p className="mt-3">Organizar Por </p>
                <select
                  placeholder="Selecione"
                  name="sortBy"
                  onChange={this.handleSortBy}
                >
                  {optionsSor.map((elemento) => (
                    <option key={elemento.value} value={elemento.value}>
                      {elemento.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </body>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
