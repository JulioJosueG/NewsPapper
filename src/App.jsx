import "./App.css";
import NewsList from "./components/NewsList";
import SearchBox from "./components/SearchBox";
import Select from "react-select";
import React, { Component, Fragment } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";

const options = [
  { value: "business", label: "Business" },
  { value: "entertainment", label: "Entertainment" },
  { value: "general", label: "General" },
  { value: "health", label: "Health" },
  { value: "science", label: "Science" },
  { value: "sports", label: "Sports" },
  { value: "technology", label: "Technology" },
];
   //
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

  handleChange = (selectedOption) => {
    this.setState({ selectedOption: selectedOption.target.value });
    console.log(selectedOption.target.value);
    this.search(selectedOption.target.value);
  };

  componentDidMount() {
    this.search(null);
  }

  //Handles
  handleSearchBox = (value) => {
    this.search(value);
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
  search = (value) => {
    let apiURL =
      "https://newsapi.org/v2/top-headlines?country=be&apiKey=c90db1a67a924568a96493d498eeab6b&pageSize=100";
   

   for(var i = 0; i < options.length; i++) {
     if (options[i].value== value) {
         apiURL = "https://newsapi.org/v2/top-headlines?apiKey=c90db1a67a924568a96493d498eeab6b&pageSize=100&category=" + value
          break
     }
      else if (optionsb[i].value== value) {
         apiURL = "https://newsapi.org/v2/top-headlines?apiKey=c90db1a67a924568a96493d498eeab6b&pageSize=100&Country=" + value
          break;
      
     }
     else if (value != null ) {
      apiURL =
        "https://newsapi.org/v2/top-headlines?country=be&apiKey=c90db1a67a924568a96493d498eeab6b&pageSize=100&q=" +
        value;
    }
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
        })
        if(options.includes(value)){
          this.setState(
            {
              searching: value != null,
              searchText: value
            }
          )
        };
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
    const { selectedOption } = this.state;
    return (
      <div className="App container">
        <header>
          <h1>Newspaper React</h1>
        </header>
        <body>
          <SearchBox
            value={this.state.searchText}
            onClear={this.handleSearchBoxClear}
            onSearch={this.handleSearchBox}
            searching={this.state.searching}
          />
          {this.state.errorMessage ? (
            <div className="alert alert-danger">{this.state.errorMessage}</div>
          ) : null}

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
                pageRangeDisplayed={5}
                onPageChange={this.handlePageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
              />
            </div>

            <div className="col-sm-3 mt-3 filtro form-group">
              <p>Filtro por Categoria </p>
              <select name="categories" onChange={this.handleChange}>
                {options.map((elemento) => (
                  <option key={elemento.value} value={elemento.value}>
                    {elemento.label}
                  </option>
                ))}
              </select>

              <p>Filtro por Pais </p>
              <select name="countries" onChange={this.handleChange}>
                {optionsb.map((elemento) => (
                  <option key={elemento.value} value={elemento.value}>
                    {elemento.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </body>
      </div>
    );
  }
}

export default App;
