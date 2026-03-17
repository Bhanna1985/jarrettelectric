const concepts = [
"Concept_001",
"Concept_002",
"Concept_003",
"Concept_004",
"Concept_005",
"Concept_006"
];

const tiles = document.querySelectorAll(".tile");

tiles.forEach((tile, index) => {
if(concepts[index]){
let num = concepts[index].split("_")[1];
num = parseInt(num, 10);

let label = document.createElement("div");
label.style.position = "absolute";
label.style.top = "-30px";
label.style.width = "100%";
label.style.textAlign = "center";
label.style.color = "gold";
label.style.fontSize = "18px";
label.innerText = "Concept " + num;

tile.appendChild(label);
}
});
