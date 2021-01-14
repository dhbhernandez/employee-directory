import React, { Component } from "react";
import Container from "./Container";
import Row from "./Row";
import Col from "./Col";
import Card from "./Card";
import SearchForm from "./SearchForm";
import MovieDetail from "./MovieDetail";
import API from "../utils/API";

class OmdbContainer extends Component {
  state = {
    result: [],
    search: "",
    sort: true
  };

  // When this component mounts, search for the movie "The Matrix"
  componentDidMount() {
    this.searchContacts();
  }

  searchContacts = () => {
    API.search()
      .then(res => this.setState({ result: res.data.results }))
      .catch(err => console.log(err));
  };



  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  };

  // When the form is submitted, search the OMDB API for the value of `this.state.search`
  handleFormSubmit = event => {
    event.preventDefault();
    this.searchContacts(this.state.search);
  };

  handleLastName = () => {
    console.log('result', this.state.result)


    let newList;

    if (this.state.sort) {
      //  block of code to be executed if the condition is true
      newList = this.state.result.sort(this.compareAZ)
    } else {
      //  block of code to be executed if the condition is false
      newList = this.state.result.sort(this.compareZA)
    }

    console.log('newList', newList);

    this.setState({ result: newList, sort: !this.state.sort });

  }

  //sort a-z
  compareAZ = (a, b) => {

    // console.log('a', a)
    // console.log('b', b)
    if (a.name.last < b.name.last) {
      return -1;
    }
    if (a.name.last > b.name.last) {
      return 1;
    }
    return 0;
  }

  compareZA = (a, b) => {
    if (a.name.last > b.name.last) {
      return -1;
    }
    if (a.name.last < b.name.last) {
      return 1;
    }
    return 0;
  }



  // objs.sort( compare );


  render() {

    console.log('state', this.state.result)
    return (

      <>
        <div class="jumbotron jumbotron-fluid">
          <div class="container">
            <h1 class="display-4">Employee Directory</h1>
            <p class="lead">Search or sort employee by last name.
            .</p>
          </div>
        </div>
        <input className="form-control mr-sm-2" onChange={this.handleLastName} placeholder="search"></input>
        
        <Container>
          <table class="table">
            <thead class="thead-dark">
              <tr>
                <th scope="col">Photo</th>
                <th scope="col">First Name</th>
                <th scope="col" onClick={this.handleLastName}>Last Name</th>
                <th scope="col">Age</th>
              </tr>



            </thead>
            <tbody>
              {this.state.result.map(contact => (

                <tr>
                  {/* <th scope="row">1</th> */}
                  <td><img src={contact.picture.thumbnail} /></td>
                  <td>{contact.name.first}</td>
                  <td>{contact.name.last}</td>
                  <td>{contact.dob.age}</td>
                </tr>
              ))}
            </tbody>
          </table>

         
         


          {/* <table>
          <tr>
            <th>Photo</th>
            <th>First Name</th>
            <th onClick={this.handleLastName}>Last Name</th>
            <th>Age</th>
          </tr>

          {this.state.result.map(contact => (
            <tr>
              <td> <img src={contact.picture.thumbnail}/></td>
              <td>{contact.name.first}</td>
              <td>{contact.name.last}</td>
              <td>{contact.dob.age}</td>
            </tr>

          ))}
        </table> */}




          {/* <Row>
          <Col size="md-8">
            <Card
              heading={this.state.result.Title || "Search for a Movie to Begin"}
            >
              {this.state.result.Title ? (
                <MovieDetail
                  title={this.state.result.Title}
                  src={this.state.result.Poster}
                  director={this.state.result.Director}
                  genre={this.state.result.Genre}
                  released={this.state.result.Released}
                />
              ) : (
                <h3>No Results to Display</h3>
              )}
            </Card>
          </Col>
          <Col size="md-4">
            <Card heading="Search">
              <SearchForm
                value={this.state.search}
                handleInputChange={this.handleInputChange}
                handleFormSubmit={this.handleFormSubmit}
              />
            </Card>
          </Col>
        </Row> */}
        </Container>
      </>
    );
  }
}

export default OmdbContainer;
