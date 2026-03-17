fetch('data/concepts.json')
.then(res => res.json())
.then(concepts => {

  const container = document.querySelector(".container");

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

  concepts.forEach((c, index) => {

    if (!positions[index]) return;

    const conceptNum = String(c.id).padStart(3, "0");

    const tile = document.createElement("div");
    tile.style.position = "absolute";
    tile.style.top = positions[index].top + "px";
    tile.style.left = positions[index].left + "px";
    tile.style.width = "240px";
    tile.style.height = "240px";

    const preview = document.createElement("div");
    preview.style.width = "100%";
    preview.style.height = "100%";
    preview.style.display = "flex";
    preview.style.alignItems = "center";
    preview.style.justifyContent = "center";
    preview.style.overflow = "hidden";

    const img = document.createElement("img");

    img.src = `Concepts/Concept_${conceptNum}/images/Concept_${conceptNum}_01.png`;

    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = "cover";

    img.onload = () => {
      preview.appendChild(img);
    };

    img.onerror = () => {
      preview.innerHTML = "<div style='color:gold;'>Coming Soon</div>";
    };

    tile.onclick = () => {
      window.location.href = `preview.html?concept=${c.id}`;
    };

    tile.appendChild(preview);
    container.appendChild(tile);

  });

});
