async function includeHTML() {
  let includeElements = document.querySelectorAll("[w3-include-html]");
  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    file = element.getAttribute("w3-include-html"); // "includes/header.html"
    let resp = await fetch(file);
    if (resp.ok) {
      element.innerHTML = await resp.text();
    } else {
      element.innerHTML = "Page not found";
    }
  }

  calcKaiser();
  calcCarbonara();
  calcPorkFilets();
}

function sendMail(event) {
  event.preventDefault();
  const data = new FormData(event.target);

  fetch("https://formspree.io/f/mvoevvdp", {
    method: "POST",
    body: new FormData(event.target),
    headers: {
      Accept: "application/json",
    },
  })
    .then(() => {
      window.location.href = "./danke.html";
    })
    .catch((error) => {
      console.log(error);
    });
}

/* Menu animation */
function showHideMenu() {
  document.getElementById("menu").classList.toggle("show-overlay-menu");
}

function closeMenu() {
  document.getElementById("menu").classList.remove("show-overlay-menu");
}

window.addEventListener("resize", function (event) {
  closeMenu();
});

/* Kaiserschmarnn */

let KaiserRecept = { eggs: 1, flour: 50, milk: 100, sugar: 1, salt: 1 };

function calcKaiser() {
  let arrayKayser = Object.values(KaiserRecept);
  calcRecept(arrayKayser);
}

/* Carbonara */

let CarbonaraRecept = {
  spaguetti: 125,
  salt: 1,
  bacon: 35,
  cheese: 25,
  eggs: 1,
  water: 3,
  pepper: 1,
  parsley: 1,
};

function calcCarbonara() {
  let arrayCarbonara = Object.values(CarbonaraRecept);
  calcRecept(arrayCarbonara);
}

/* Schweinefilet */

let porkFiletsRecept = {
  porkFilets: 1,
  salt: 1,
  chilli: 1,
  cheese: 25,
  flour: 1,
  onion: 0.5,
  broth: 0.5,
  yogurtCream: 0.5,
  parsley: 1,
};

function calcPorkFilets() {
  let arrayPorkFilets = Object.values(porkFiletsRecept);
  calcRecept(arrayPorkFilets);
}

/* calc Recepts */
function calcRecept(arrayRecept) {
  let quantityPortion = +document.getElementById("quantity-portion").value;

  if (quantityPortion < 1) {
    quantityPortion = 2;
    document.getElementById("quantity-portion").value = 2;
    alert("Bitte geben Sie eine Zahl größerer als 0");
  }

  let tableIngredients =
    document.getElementById("table-ingredients").firstElementChild.rows;

  for (let i = 0; i < tableIngredients.length; i++) {
    for (let i = 0; i < arrayRecept.length; i++) {
      tableIngredients[i].cells[0].innerHTML = arrayRecept[i] * quantityPortion;
    }
  }
}
