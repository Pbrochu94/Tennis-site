console.log("hello world");

const hamburgerButton = {
  mouseOnListener: (function () {
    document
      .querySelector(".hamburger-button")
      .addEventListener("mouseover", function () {
        document.querySelector(".dropdown-div").classList.remove("invisible");
      });
  })(),
  mouseOffListener: (function () {
    document
      .querySelector(".dropdown-div")
      .addEventListener("mouseleave", function () {
        document.querySelector(".dropdown-div").classList.add("invisible");
      });
  })(),
};

const carousel = {
  focusedImageDiv: document.querySelector(".carousel-focus"),
  leftImageDiv: document.querySelector(".carousel-left-wrapper"),
  rightImageDiv: document.querySelector(".carousel-right-wrapper"),

  rightArrowClick: (function () {
    document
      .querySelector(".arrow-right")
      .addEventListener("click", function () {
        carousel.slideMoveLeft();
        carouselProgressBar.moveLeft();
      });
  })(),
  leftArrowClick: (function () {
    document
      .querySelector(".arrow-left")
      .addEventListener("click", function () {
        carousel.slideMoveRight();
        carouselProgressBar.moveRight();
      });
  })(),
  slideMoveRight: function () {
    let oldLeftImage = carousel.leftImageDiv //old the left img photo before it changes
      .querySelector(".carousel-images")
      .getAttribute("src");

    carousel.leftImageDiv
      .querySelector(".carousel-images")
      .setAttribute(
        "src",
        carousel.focusedImageDiv
          .querySelector(".carousel-images")
          .getAttribute("src"),
      );

    carousel.focusedImageDiv
      .querySelector(".carousel-images")
      .setAttribute(
        "src",
        carousel.rightImageDiv
          .querySelector(".carousel-images")
          .getAttribute("src"),
      );

    carousel.rightImageDiv
      .querySelector(".carousel-images")
      .setAttribute("src", oldLeftImage);
  },
  slideMoveLeft: function () {
    let oldLeftImage = carousel.leftImageDiv //Hold the right img photo before it changes
      .querySelector(".carousel-images")
      .getAttribute("src");

    carousel.leftImageDiv
      .querySelector(".carousel-images")
      .setAttribute(
        "src",
        carousel.rightImageDiv
          .querySelector(".carousel-images")
          .getAttribute("src"),
      );

    carousel.rightImageDiv
      .querySelector(".carousel-images")
      .setAttribute(
        "src",
        carousel.focusedImageDiv
          .querySelector(".carousel-images")
          .getAttribute("src"),
      );

    carousel.focusedImageDiv
      .querySelector(".carousel-images")
      .setAttribute("src", oldLeftImage);
  },
};

const carouselProgressBar = {
  leftProgressCircle: document.querySelector(".left-circle"),
  middleProgressCircle: document.querySelector(".middle-circle"),
  rightProgressCircle: document.querySelector(".right-circle"),
  progressLocations: ["left-circle", "middle-circle", "right-circle"],
  progressCurrentLocation: 1,
  progressNextLocation: 2,
  progressLastLocation: 0,

  moveRight: function () {
    document
      .querySelector(`.${this.progressLocations[this.progressCurrentLocation]}`)
      .classList.remove("focus-circle");
    document
      .querySelector(`.${this.progressLocations[this.progressNextLocation]}`)
      .classList.add("focus-circle");
    [
      this.progressNextLocation,
      this.progressCurrentLocation,
      this.progressLastLocation,
    ] = arrayOperation.rightArrayLoop(
      this.progressLocations,
      this.progressNextLocation,
      this.progressCurrentLocation,
      this.progressLastLocation,
    );
  },
  moveLeft: function () {
    document
      .querySelector(`.${this.progressLocations[this.progressCurrentLocation]}`)
      .classList.remove("focus-circle");
    document
      .querySelector(`.${this.progressLocations[this.progressLastLocation]}`)
      .classList.add("focus-circle");
    [
      this.progressLastLocation,
      this.progressCurrentLocation,
      this.progressNextLocation,
    ] = arrayOperation.leftArrayLoop(
      this.progressLocations,
      this.progressLastLocation,
      this.progressCurrentLocation,
      this.progressNextLocation,
    );
  },
};

const arrayOperation = {
  rightArrayLoop: function (array, nextIndex, currentIndex, lastIndex) {
    nextIndex = (nextIndex + 1) % array.length;
    currentIndex = (currentIndex + 1) % array.length;
    lastIndex = (lastIndex + 1) % array.length;
    return [nextIndex, currentIndex, lastIndex];
  },
  leftArrayLoop: function (array, lastIndex, currentIndex, nextIndex) {
    lastIndex = (lastIndex - 1 + array.length) % array.length;
    currentIndex = (currentIndex - 1 + array.length) % array.length;
    nextIndex = (nextIndex - 1 + array.length) % array.length;
    return [lastIndex, currentIndex, nextIndex];
  },
};
