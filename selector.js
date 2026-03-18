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

  function loadImage(src) {
    return new Promise(resolve => {
      const img = new Image();
      img.onload = () => resolve({ ok: true, img });
      img.onerror = () => resolve({ ok: false });
      img.src = src;
    });
  }

  function buildTile(i) {

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
    preview.style.position = "relative";
    preview.style.width = "240px";
    preview.style.height = "240px";
    preview.style.backgroundImage = "url('assets/tile_template.png')";
    preview.style.backgroundSize = "100% 100%";

    // 🔥 AUTO CALCULATED GRID
    const GRID_COLS = 2;
    const GRID_ROWS = 3;

    const TILE_SIZE = 240;

    // Estimate border + spacing automatically
    const OUTER_MARGIN = 10; // tweak if needed later
    const INNER_GAP = 10;    // tweak if needed later

    const usableWidth = TILE_SIZE - (OUTER_MARGIN * 2) - INNER_GAP;
    const usableHeight = TILE_SIZE - (OUTER_MARGIN * 2) - (INNER_GAP * 2);

    const slotWidth = usableWidth / GRID_COLS;
    const slotHeight = usableHeight / GRID_ROWS;

    for (let row = 0; row < GRID_ROWS; row++) {
      for (let col = 0; col < GRID_COLS; col++) {

        const index = row * GRID_COLS + col + 1;

        const slot = document.createElement("div");
        slot.style.position = "absolute";

        const top = OUTER_MARGIN + row * (slotHeight + INNER_GAP);
        const left = OUTER_MARGIN + col * (slotWidth + INNER_GAP);

        slot.style.top = top + "px";
        slot.style.left = left + "px";
        slot.style.width = slotWidth + "px";
        slot.style.height = slotHeight + "px";

        slot.style.display = "flex";
        slot.style.alignItems = "center";
        slot.style.justifyContent = "center";
        slot.style.overflow = "hidden";

        const num = String(index).padStart(2, "0");
        const src = "Concepts/Concept_" + conceptNum + "/images/Concept_" + conceptNum + "_" + num + ".png";

        loadImage(src).then(result => {
          if (result.ok) {
            const img = result.img;
            img.style.width = "100%";
            img.style.height = "100%";
            img.style.objectFit = "cover";
            slot.innerHTML = "";
            slot.appendChild(img);
          } else {
            slot.innerHTML = "<div style='color:gold;font-size:11px;'>Coming Soon</div>";
          }
        });

        preview.appendChild(slot);
      }
    }

    const label = document.createElement("div");
    label.textContent = "Concept " + i;
    label.style.marginTop = "10px";
    label.style.fontSize = "18px";

    tile.onclick = function() {
      window.location.href = "preview.html?concept=" + i;
    };

    tile.appendChild(preview);
    tile.appendChild(label);

    return tile;
  }

  const fragment = document.createDocumentFragment();

  for (let i = 1; i <= positions.length; i++) {
    fragment.appendChild(buildTile(i));
  }

  container.appendChild(fragment);

});
