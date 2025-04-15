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

  automaticSlide: (function () {
    setInterval(function () {
      carousel.slideMoveRight();
      carouselProgressBar.moveRight();
    }, 5000);
  })(),
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
  changeImageToClickedPoint: function (clickedDot) {
    let indexOfProgressDot = arrayOperation.progressDotArr.indexOf(
      clickedDot[0],
    );
    let progressDotArrLength = arrayOperation.progressDotArr.length;
    document
      .querySelector(".carousel-focus>img")
      .setAttribute(
        "src",
        arrayOperation.imageObjArr[indexOfProgressDot].imgLink,
      );
    document
      .querySelector(".carousel-left-wrapper>img")
      .setAttribute(
        "src",
        arrayOperation.imageObjArr[
          (indexOfProgressDot - 1 + progressDotArrLength) % progressDotArrLength
        ].imgLink,
      );
    document
      .querySelector(".carousel-right-wrapper>img")
      .setAttribute(
        "src",
        arrayOperation.imageObjArr[
          (indexOfProgressDot + 1) % progressDotArrLength
        ].imgLink,
      );
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
  updatePlacement: function (classArray) {
    if (classArray.find((element) => element === "left-circle")) {
      carouselProgressBar.progressLastLocation = 2;
      carouselProgressBar.progressCurrentLocation = 0;
      carouselProgressBar.progressNextLocation = 1;
    }
    if (classArray.find((element) => element === "middle-circle")) {
      carouselProgressBar.progressLastLocation = 0;
      carouselProgressBar.progressCurrentLocation = 1;
      carouselProgressBar.progressNextLocation = 2;
    }
    if (classArray.find((element) => element === "right-circle")) {
      carouselProgressBar.progressLastLocation = 1;
      carouselProgressBar.progressCurrentLocation = 2;
      carouselProgressBar.progressNextLocation = 0;
    }
  },
  clickEventListener: (function () {
    document.querySelectorAll(".progress-circle").forEach(function (circleDiv) {
      circleDiv.addEventListener("click", function () {
        document
          .querySelector(".focus-circle")
          .classList.remove("focus-circle");
        circleDiv.classList.add("focus-circle");
        let classArray = Array.from(circleDiv.classList); //transform the clasList into an array to access find method
        classArray = classArray.splice(1, 1); //get the second class name in the list (I.E right-circle)
        carouselProgressBar.updatePlacement(classArray);
        carousel.changeImageToClickedPoint(classArray);
      });
    });
  })(),
};

const arrayOperation = {
  progressDotArr: ["left-circle", "middle-circle", "right-circle"],
  imageObjArr: [
    {
      imgPosition: "left-image",
      imgLink: "img/carousel-img-1.jpg",
      indexPosition: 0,
    },
    {
      imgPosition: "middle-image",
      imgLink: "img/carousel-img-2.jpg",
      indexPosition: 1,
    },
    {
      imgPosition: "right-image",
      imgLink: "img/carousel-img-3.jpg",
      indexPosition: 2,
    },
  ],
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
