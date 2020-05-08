import React, { Component } from "react";

class Search extends Component {
  state = {
    firstName: "",
  };

  componentDidMount() {
    console.log("loaded");
  }

  // handlePageChange = (page) => {
  //   this.setState({ currentPage: page });
  // };

  handleInputChange = (event) => {
    this.setState({ firstName: event.target.value });
  };

  render() {
    return (
      <div>
        <p>
          Hello {this.state.firstName}
        </p>
        <form className="search-bar">
          <input
            value={this.state.firstName}
            name="firstName"
            onChange={this.handleInputChange}
            type="text"
            placeholder="Search by first name"
          />
        </form>
      </div>
    );
  }
}

export default Search;
