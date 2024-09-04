// takes a div that contains all the images you want to turn into a slider

export default function imageSliderCreator(imageDiv, imgSize) {
  const pictureFrame = document.createElement("div");
  const imageNodeList = imageDiv.querySelectorAll("img");

  const imageArray = Array.from(imageNodeList);

  let i = 1;
  imageArray.forEach((img) => {
    img.style.height = `${imgSize}px`;
    img.style.width = `${imgSize}px`;
    img.dataset.imageNumber = `${i}`;
    i++;
  });

  imageDiv.style.width = `${imgSize * 1.1 * imageArray.length}px`;
  imageDiv.dataset.imageDiv = "true";
  pictureFrame.style.width = `${imgSize}px`;
  pictureFrame.style.overflow = "hidden";

  makeArrowButtons(pictureFrame, imageArray, imageDiv);
  makeBubbles(pictureFrame, imageArray);

  document.body.append(pictureFrame);
  pictureFrame.append(imageDiv);

  const nextArrowElement = document.querySelector('[data-next-arrow="true"]');
  setInterval(() => nextArrowElement.click(), 5000);
}

const nextFrame = function moveImageSliderToTheNextImage(
  pictureFrame,
  imageArray,
  imageDiv,
) {
  const nextFrameArray = imageArray.shift();
  imageArray.push(nextFrameArray);

  imageDiv.innerHTML = "";

  imageArray.forEach((img) => {
    imageDiv.appendChild(img);
  });
  makeBubbles(pictureFrame, imageArray);
};

const previousFrame = function moveImageSliderToThePreviousImage(
  pictureFrame,
  imageArray,
  imageDiv,
) {
  const previousFrameArray = imageArray.pop();
  imageArray.unshift(previousFrameArray);

  imageDiv.innerHTML = "";

  imageArray.forEach((img) => {
    imageDiv.appendChild(img);
  });
  makeBubbles(pictureFrame, imageArray);
};

const advanceToFrame = function moveImageSliderToASpecificImage(imageNumber) {
  let done = false;
  const imageDiv = document.querySelector('[data-image-div="true"]');
  const nextArrowElement = document.querySelector('[data-next-arrow="true"]');

  while (done === false) {
    nextArrowElement.click();
    const imageArray = Array.from(imageDiv.querySelectorAll("img"));
    if (imageArray[0].dataset.imageNumber == imageNumber) {
      done = true;
    }
  }
};

const makeArrowButtons =
  function addArrowButtonsToTheLeftAndRightOfPictureFrame(
    pictureFrame,
    imageArray,
    imageDiv,
  ) {
    pictureFrame.style.position = "relative";

    const previousArrow = document.createElement("div");
    previousArrow.textContent = "◀️";
    previousArrow.style.position = "absolute";
    previousArrow.style.top = "50%";
    previousArrow.style.left = "0";

    const nextArrow = document.createElement("div");
    nextArrow.textContent = "▶️";
    nextArrow.style.position = "absolute";
    nextArrow.style.top = "50%";
    nextArrow.style.right = "0";
    nextArrow.dataset.nextArrow = "true";

    pictureFrame.append(previousArrow, nextArrow);

    // add event listeners

    const previousFrameClick = function () {
      previousFrame(pictureFrame, imageArray, imageDiv);
    };
    const nextFrameClick = function () {
      nextFrame(pictureFrame, imageArray, imageDiv);
    };

    previousArrow.addEventListener("click", previousFrameClick);
    nextArrow.addEventListener("click", nextFrameClick);
  };

const makeBubbles =
  function makeABubbleBelowTheSliderForEachImageAndClickOnTheBubbleToTakeUserToThatImage(
    pictureFrame,
    imageArray,
  ) {
    pictureFrame.querySelectorAll("span").forEach((span) => {
      if (span.dataset.bubble === "yes") {
        pictureFrame.removeChild(span);
      }
    });
    const currentImageNumber = imageArray[0].dataset.imageNumber;
    imageArray.forEach((img, index) => {
      const bubble = document.createElement("span");
      if (index + 1 == currentImageNumber) {
        bubble.textContent = "🔴";
      } else {
        bubble.textContent = "⭕";
      }
      bubble.style.backgroundColor = "rgb(255,255,255,0.6)";
      bubble.style.borderRadius = "100px";
      bubble.style.position = "absolute";
      bubble.style.bottom = "5px";
      bubble.style.left = `${((index + 1) * 100) / (imageArray.length + 1)}%`;
      bubble.dataset.bubble = "yes";

      bubble.addEventListener("click", () => {
        advanceToFrame(index);
      });
      pictureFrame.append(bubble);
      index++;
    });
  };
