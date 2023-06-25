import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import PropTypes from "prop-types";
import css from "./Searchbar.module.css";

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
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.SearchFormButton}>
            <span className={css.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={css.SearchFormInput}
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
