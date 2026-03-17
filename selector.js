document.addEventListener("DOMContentLoaded", function() {

  const container = document.querySelector(".container");
  if (!container) return;

  const positions = [
    { top: 300, left: 80 },
    { top: 300, left: 360 },
    { top: 300, left: 640 },
    { top: 300, left: 920 },
    { top: 620, left: 80 },
    { top: 620, left: 360 },
    { top: 620, left: 640 },
    { top: 620, left: 920 }
  ];

  const MAX_CONCEPTS = 50;

  function loadImage(src) {
    return new Promise(resolve => {
      const img = new Image();
      img.onload = () => resolve({ ok: true, img });
      img.onerror = () => resolve({ ok: false });
      img.src = src;
    });
  }

  async function buildGrid(preview, conceptNum) {

    preview.innerHTML = "";

    preview.style.display = "grid";
    preview.style.gridTemplateColumns = "1fr 1fr";
    preview.style.gridTemplateRows = "1fr 1fr 1fr";

    for (let i = 1; i <= 6; i++) {

      const cell = document.createElement("div");
      cell.style.border = "1px solid gold";
      cell.style.display = "flex";
      cell.style.alignItems = "center";
      cell.style.justifyContent = "center";
      cell.style.background = "#111";
      cell.style.overflow = "hidden";

      const num = String(i).padStart(2, "0");
      const src = "Concepts/Concept_" + conceptNum + "/images/Concept_" + conceptNum + "_" + num + ".png";

      const result = await loadImage(src);

      if (result.ok) {
        const img = result.img;
        img.style.width = "100%";
        img.style.height = "100%";
        img.style.objectFit = "cover";
        cell.appendChild(img);
      } else {
        const text = document.createElement("div");
        text.textContent = "Coming Soon";
        text.style.color = "gold";
        text.style.fontSize = "12px";
        cell.appendChild(text);
      }

      preview.appendChild(cell);
    }
  }

  const fragment = document.createDocumentFragment();

  for (let i = 1; i <= MAX_CONCEPTS; i++) {

    if (!positions[i - 1]) break;

    const conceptNum = String(i).padStart(3, "0");

    const tile = document.createElement("div");
    tile.style.position = "absolute";
    tile.style.top = positions[i - 1].top + "px";
    tile.style.left = positions[i - 1].left + "px";
    tile.style.width = "240px";
    tile.style.height = "260px";
    tile.style.display = "flex";
    tile.style.flexDirection = "column";
    tile.style.alignItems = "center";

    const preview = document.createElement("div");
    preview.style.width = "240px";
    preview.style.height = "240px";
    preview.style.border = "2px solid gold";
    preview.style.background = "#1b1b1b";
    preview.style.display = "flex";
    preview.style.alignItems = "center";
    preview.style.justifyContent = "center";
    preview.style.overflow = "hidden";

    const firstImageSrc = "Concepts/Concept_" + conceptNum + "/images/Concept_" + conceptNum + "_01.png";

    loadImage(firstImageSrc).then(result => {

      if (result.ok) {
        buildGrid(preview, conceptNum);
      } else {
        preview.innerHTML = "<div style='color:gold;'>Coming Soon</div>";
      }

    });

    const label = document.createElement("div");
    label.textContent = "Concept " + i;
    label.style.marginTop = "10px";
    label.style.fontSize = "18px";

    tile.onclick = function() {
      window.location.href = "preview.html?concept=" + i;
    };

    tile.appendChild(preview);
    tile.appendChild(label);

    fragment.appendChild(tile);
  }

  container.appendChild(fragment);

});
