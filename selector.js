const tiles = document.querySelectorAll(".tile");

tiles.forEach((tile, index) => {

const num = index + 1;

const xOverlay = document.createElement("div");

xOverlay.style.position = "absolute";

/* POSITION THIS EXACTLY OVER THE "X" IN YOUR TEMPLATE */
xOverlay.style.top = "170px";
xOverlay.style.left = "140px";

xOverlay.style.color = "gold";
xOverlay.style.fontSize = "22px";
xOverlay.style.fontWeight = "bold";

xOverlay.innerText = num;

tile.appendChild(xOverlay);

});
