import { Component } from "react";
import css from "./Searchbar/Searchbar.module.css";
import PropTypes from "prop-types";

export class Searchbar extends Component {
  state = {
    name: "",
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { name } = this.state;
    this.props.onSubmit(name);
  };

  handleChange = (event) => {
    const { query } = event.currentTarget;
    this.setState({ name: query });
  };

  render() {
    const { name } = this.state;
    return (
      <header className="searchbar">
        <form className="form" onSubmit={this.handleSubmit}>
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>

          <input
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={name}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
