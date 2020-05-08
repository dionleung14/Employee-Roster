import React, { Component } from "react";
import Header from "./Header";
import Employee from "./EmployeeEntry";
import API from "../utils/API";

class EmployeeTable extends Component {
  state = {
    employees: [],
    searchName: "",
    displayMethod: "default",
    sortCategory: "",
    sortCount: 0,
  };

  componentDidMount() {
    API.search()
      .then((res) => {
        console.log(res.data.results[0]);
        this.setState({ employees: res.data.results });
        console.log(this.state.employees);
      })
      .catch((err) => console.log(err));
    console.log("loaded");
  }

  handleInputChange = (event) => {
    this.setState({
      searchName: event.target.value,
      displayMethod: event.target.value.length ? "search" : "default",
      sortCategory: ""
    });
  };

  sortPrep = (event) => {
    this.setState({
      searchName: "",
      displayMethod: "sort",
      sortCategory: event.target.id,
      sortCount: this.state.sortCount + 1,
    });
  };

  sortFirst = () => {
    if (this.state.sortCount % 2 === 0) {
      return this.state.employees.sort(function (a, b) {
        if (a.name.first < b.name.first) {
          return -1;
        }
        if (b.name.first < a.name.first) {
          return 1;
        }
      });
    } else {
      return this.state.employees.sort(function (a, b) {
        if (a.name.first < b.name.first) {
          return 1;
        }
        if (b.name.first < a.name.first) {
          return -1;
        }
      });
    }
  };

  sortLast = () => {
    if (this.state.sortCount % 2 === 0) {
      return this.state.employees.sort(function (a, b) {
        if (a.name.last < b.name.last) {
          return -1;
        }
        if (b.name.last < a.name.last) {
          return 1;
        }
      });
    } else {
      return this.state.employees.sort(function (a, b) {
        if (a.name.last < b.name.last) {
          return 1;
        }
        if (b.name.last < a.name.last) {
          return -1;
        }
      });
    }
  };

  sortEmail = () => {
    if (this.state.sortCount % 2 === 0) {
      return this.state.employees.sort(function (a, b) {
        if (a.email < b.email) {
          return -1;
        }
        if (b.email < a.email) {
          return 1;
        }
      });
    } else {
      return this.state.employees.sort(function (a, b) {
        if (a.email < b.email) {
          return 1;
        }
        if (b.email < a.email) {
          return -1;
        }
      });
    }
  };
  sortUser = () => {
    if (this.state.sortCount % 2 === 0) {
      return this.state.employees.sort(function (a, b) {
        if (a.login.username < b.login.username) {
          return -1;
        }
        if (b.login.username < a.login.username) {
          return 1;
        }
      });
    } else {
      return this.state.employees.sort(function (a, b) {
        if (a.login.username < b.login.username) {
          return 1;
        }
        if (b.login.username < a.login.username) {
          return -1;
        }
      });
    }
  };

  activeSearch = () => {
    const { employees, searchName } = this.state;
    const casedName = searchName.toLowerCase();
    const searchResults = employees.filter((person) => {
      return person.name.first.toLowerCase().includes(casedName);
    });
    return searchResults;
  };

  render() {
    let workingArr = this.state.employees;
    if (this.state.displayMethod === "search") {
      workingArr = this.activeSearch();
    } else if (this.state.displayMethod === "sort") {
      switch (this.state.sortCategory) {
        case "first":
          workingArr = this.sortFirst();
          break;
        case "last":
          workingArr = this.sortLast();
          break;
        case "email":
          workingArr = this.sortEmail();
          break;
        case "username":
          workingArr = this.sortUser();
          break;
        default:
          break;
      }
      // workingArr = this.sortFunction(this.state.sortCategory)
      // this.state.employees.sort(function(a, b){
      //   if (a.name.first < b.name.first) {return -1;}
      //   if (b.name.first < a.name.first) {return 1;}
      // });
    } else {
      workingArr = this.state.employees;
    }
    return (
      <div>
        <Header />
        {/* <Search /> */}
        <form className="search-bar">
          <input
            value={this.state.searchName}
            name="firstName"
            onChange={this.handleInputChange}
            type="text"
            placeholder="Search by first name"
          />
        </form>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Photo</th>
              <th
                className="clickableHeader"
                scope="col"
                id="first"
                onClick={this.sortPrep}
              >
                First Name
              </th>
              <th
                className="clickableHeader"
                scope="col"
                id="last"
                onClick={this.sortPrep}
              >
                Last Name
              </th>
              <th scope="col">Phone Number</th>
              <th
                className="clickableHeader"
                scope="col"
                id="email"
                onClick={this.sortPrep}
              >
                Email
              </th>
              <th
                className="clickableHeader"
                scope="col"
                id="username"
                onClick={this.sortPrep}
              >
                Screen name
              </th>
            </tr>
          </thead>
          <tbody>
            {workingArr.map((person) => (
              <Employee
                image={person.picture.thumbnail}
                firstName={person.name.first}
                lastName={person.name.last}
                phone={person.phone}
                email={person.email}
                screenName={person.login.username}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default EmployeeTable;
