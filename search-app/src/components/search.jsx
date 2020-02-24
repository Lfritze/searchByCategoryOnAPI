import React from "react";

export default class Searcher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      data: [],
      searchString: "",
      roleFilter: null
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  handleChange = e => {
    this.setState({ searchString: e.target.value.trim().toLowerCase() });
  };

  fetchData() {
    fetch("https://api.myjson.com/bins/kr5kk")
      .then(response => response.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          data: json
        });
      })
      .catch(error => console.log("parsing failed", error));
  }

  changedRole = ev => {
    this.setState({ roleFilter: ev.target.value });
  };

  render() {
    var { isLoaded, data, roleFilter, searchString } = this.state;
    let text = data;
    if (searchString) {
      text = text.filter(info => info.role.toLowerCase().match(searchString));
    }
    return (
      <div>
        <input
          type="text"
          id="searchbar"
          value={searchString}
          onChange={this.handleChange}
          placeholder="Search by Role"
          name="device"
        ></input>

        <select
          className="category-select"
          name="categories"
          onChange={this.changedRole}
        >
          <option value={""}></option>
          {text.map(info => (
            <option value={info.role}>{info.role}</option>
          ))}
        </select>
        {text
          .filter(info => (roleFilter ? info.role.includes(roleFilter) : true))
          .map(info => (
            <div className="display">
              <span className="role">Role: {info.role}</span>
              <span>, Salary: {info.salary}</span>
            </div>
          ))}
      </div>
    );
  }
}

// export default Searcher;

// ReactDOM.render(
//   <Searcher name="World" />,
//   document.getElementById("container")
// );
