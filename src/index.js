let dogBar = document.querySelector("#dog-bar");
let dogImg = document.querySelector("#dog-image");
let dogNameH2 = document.querySelector("#dog-name");
let dogButton = document.querySelector("#dog-button");
let displayDog = {};

fetch("http://localhost:3000/pups")
  .then((res) => res.json())
  .then(function (dogArr) {
    dogArr.forEach(function (dogObj) {
      // console.log(dogObj);
      let dogSpan = document.createElement("span");
      dogSpan.innerText = `${dogObj.name}`;
      // console.log(dogSpan);
      dogBar.append(dogSpan);

      dogSpan.addEventListener("click", function () {
        dogImg.src = dogObj.image;
        dogNameH2.innerText = dogObj.name;

        if (dogObj.isGoodDog) {
          dogButton.innerText = "Good dog!";
        } else {
          dogButton.innerText = "Bad dog!";
        }
        displayDog = dogObj;
      });
    });
  });

dogButton.addEventListener("click", function () {
  fetch(`http://localhost:3000/pups/${displayDog.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      isGoodDog: !displayDog.isGoodDog,
    }),
  })
    .then((res) => res.json())
    .then(function (newDog) {
      console.log(displayDog);
      displayDog = newDog;
      if (displayDog.isGoodDog) {
        dogButton.innerText = "Bad dog!";
      } else {
        dogButton.innerText = "Good dog!";
      }
      // console.log(newDogStatus);
    });
});
