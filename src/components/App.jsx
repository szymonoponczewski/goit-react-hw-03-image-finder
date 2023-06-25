import React, { Component } from "react";
import { fetchPictures } from "./services/api";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { Loader } from "./Loader/Loader";
import { Modal } from "./Modal/Modal";

class App extends Component {
  state = {
    photos: [],
    searchValue: "",
    page: 1,
    error: null,
    isLoading: false,
    modal: "",
  };

  async componentDidUpdate(prevProps) {
    if (
      this.state.searchValue !== prevProps.searchValue ||
      this.state.page !== prevProps.page
    ) {
      try {
        this.setState({ isLoading: true, photos: [] });

        const photos = await fetchPictures(
          this.state.searchValue,
          this.state.page
        );

        this.setState((prevState) => ({
          photos: [...prevState.photos, ...photos],
        }));
      } catch (error) {
        this.setState({ error });
        console.log(this.state.error);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  searchValue = (event) => this.setState({ photos: [], searchValue: event });

  showPhotos = () => {
    const { photos } = this.state;
    return photos;
  };

  handleButtonVisibility = () => {
    if (this.state.photos.length < 12) return "none";
  };

  loadMore = (event) => {
    if (event) {
      this.setState({ page: this.state.page + 1 });

      setTimeout(() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      }, 700);
    }
  };

  handleModal = (imageAddress) => this.setState({ modal: imageAddress });

  modalClose = (event) => this.setState({ modal: event });

  passImgToModal = () => this.state.modal;

  render() {
    return (
      <>
        <Searchbar onSubmit={this.searchValue} />
        <ImageGallery
          photos={this.showPhotos()}
          imageAddress={this.handleModal}
        />
        {this.state.isLoading && <Loader />}
        <div
          className="ButtonContainer"
          style={{ display: this.handleButtonVisibility() }}
        >
          {!this.state.isLoading && <Button onClick={this.loadMore} />}
        </div>
        {this.state.modal !== "" && (
          <Modal
            imageAddress={this.passImgToModal()}
            onClick={this.modalClose}
          />
        )}
      </>
    );
  }
}

export default App;
