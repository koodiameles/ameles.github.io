// CONSTANTS AND VARIABLES
// ------------------
const sectionList = ["general", "programming", "dogs"]
const images = [
  {
    imgName: 'feku_jump-min.jpg',
    dogName: "Feku",
    imgDescription: 'Feku jumping'
  },
  {
    imgName: 'lulu-min.jpg',
    dogName: "Rudi",
    imgDescription: 'Rudi sleeping'
  },
  {
    imgName: 'feku_ja_luu-min.jpg',
    dogName: "Feku",
    imgDescription: 'Feku eating a big bone'
  },
  {
    imgName: 'feku_pentu-min.jpg',
    dogName: "Feku",
    imgDescription: 'Feku as a puppy'
  },
  {
    imgName: 'lulu3-min.jpg',
    dogName: "Rudi",
    imgDescription: 'Rudi guarding the Christmas presents'
  },
  {
    imgName: 'feku_pentu2-min.jpg',
    dogName: "Feku",
    imgDescription: 'Feku as a puppy'
  },
  {
    imgName: 'feku_pentu3-min.jpg',
    dogName: "Feku",
    imgDescription: 'Feku as a puppy'
  },
  {
    imgName: 'feku_pentu4-min.jpg',
    dogName: "Feku",
    imgDescription: 'Feku in a winter forest'
  },
  {
    imgName: 'feku_ja_rudi-min.jpg',
    dogName: "Feku",
    imgDescription: 'Feku and Rudi'
  },
  {
    imgName: 'feku_pentu5-min.jpg',
    dogName: "Feku",
    imgDescription: 'Feku is sleepy'
  },
  {
    imgName: 'Jussi-min.jpg',
    dogName: "Rudi",
    imgDescription: 'Me and Rudi <3'
  },
];

const textElements = {
  programmingBlockOne: [
    "I've worked on a complex industrial application for over a year.",
    "My Front End development responsibilities encompass coding, visual design, documentation and more.",
    "I've delved deep into existing codebases, understanding and enhancing complex components.",
  ],
  programmingBlockTwo: [
    "I use React and Redux on a daily basis and apply responsive design in my work.",
    "This website was crafted using vanilla JS, HTML, and CSS but I'm able to use frameworks and libraries as well."
  ]
}

let currentSection = "general"
let currentDogImage = 0;
let text1Counter = 0;
let text2Counter = 0;


// ONLOAD EFFECTS
// ------------------
window.onload = function initializeDogImages () {
  displayDogImage();
};

 
// FUNCTIONS 
// ------------------
const displayDogImage = () => {

  const dogHeaderText = document.getElementById('dog-header-id');
  dogHeaderText.innerHTML = images[currentDogImage].imgDescription;

  const dogImageContainer = document.getElementById('dog-image-id');
  
  // Create the new image element
  const newImage = document.createElement('img');
  newImage.src = './images/dogs/' + images[currentDogImage].imgName;
  newImage.setAttribute("id", images[currentDogImage].imgName);
  newImage.classList.add("slide", "moving-in");
  
  // Append the new image to the container
  dogImageContainer.appendChild(newImage);

  // After the animation finishes, remove the "moving-in" class so it doesn't slide again on the next change
  setTimeout(() => {
      newImage.classList.remove("moving-in");
      newImage.style.transform = "scale(1)";
  }, 200);
}

const nextDogImage = () => {

  // remove clickabilityIndicator after user has changed image once
  const indicator = document.getElementById('clickability-indicator-id');
  if (!indicator.classList.contains('hide')) {
    indicator.classList.add('hide');
  }

  // Get the next button and disable it
  const nextBtn = document.getElementById('nextButton');
  nextBtn.disabled = true;
  // Get container
  const dogImageContainer = document.getElementById('dog-image-id');
  // Get old image and move it out
  const oldImage = document.getElementById(images[currentDogImage].imgName);
  oldImage.classList.add("moving-out")

  // Increment the current image index
  currentDogImage = (currentDogImage + 1);
  if (currentDogImage >= images.length) {currentDogImage  = 0}
  // Display the new image
  displayDogImage();

  // After the transition is done, remove the old image from the DOM, enable next-button 
  setTimeout(() => {
    if (oldImage) {
        dogImageContainer.removeChild(oldImage);
        nextBtn.disabled = false;
    }
  }, 1000);
}

const nextTextBlock = (elementID, blockNumber) => {
  const elementToChange = document.getElementById(elementID);
  if (!elementToChange) {
    console.error("Element with given ID not found:", elementID);
    return;
  }
  let counter;
  if (blockNumber === 1) {
    text1Counter++;
    if(text1Counter >= textElements[elementID].length) {text1Counter = 0}
    counter = text1Counter;
  } else {
    text2Counter++;
    if(text2Counter >= textElements[elementID].length) {text2Counter = 0}
    counter = text2Counter
  };
  elementToChange.innerHTML = textElements[elementID][counter];
  // Remove animation class from the element
  elementToChange.classList.remove(...elementToChange.classList);
  // Force a reflow (otherwise browser automatic performance optimization prevents css animation)
  void elementToChange.offsetWidth;
  // Add the animation class back
  elementToChange.classList.add("text-animation-delay0");
}

const toggleContent = (selectedSection) => {
  currentSection = selectedSection;
  // hide all sections
  sectionList.forEach(section => {
    let sectionToHide = document.getElementById(section);
    sectionToHide.style.display = "none"
  });
  // show selected section
  var sectionToShow = document.getElementById(selectedSection);
  sectionToShow.style.display = "block"

  // When navigating to progamming section, reset textBlock animations 
  // (as they might have wrong class active if user has clicked trough the text blocks)
  if (selectedSection === "programming") {
    const textBlock1 = document.getElementById("programmingBlockOne");
    textBlock1.classList.remove(...textBlock1.classList);
    textBlock1.classList.add("text-animation-delay1");
    const textBlock2 = document.getElementById("programmingBlockTwo");
    textBlock2.classList.remove(...textBlock1.classList);
    textBlock2.classList.add("text-animation-delay1");
  }
  // When navigating to dogs, remove "hide" from clickability-indicator
  if (selectedSection === "dogs") {
    const indicator = document.getElementById('clickability-indicator-id');
    if (indicator.classList.contains('hide')) {
      indicator.classList.remove('hide');
    }
  }
}

const copyToClipboard = () => {
  navigator.clipboard.writeText("jussujunnilaprof@gmail.com")
  let popup = document.getElementById('popup');
  popup.classList.remove('hide');
  setTimeout(function(){
    popup.classList.add('hide');
  }, 3000);
}
