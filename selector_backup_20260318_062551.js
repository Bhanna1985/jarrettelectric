document.addEventListener("DOMContentLoaded", function() {

  const container = document.querySelector(".container");
  if (!container) return;

  container.innerHTML = "";

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

  const slots = [
    { top: 12, left: 12 },
    { top: 12, left: 126 },
    { top: 88, left: 12 },
    { top: 88, left: 126 },
    { top: 164, left: 12 },
    { top: 164, left: 126 }
  ];

  const SLOT_WIDTH = 102;
  const SLOT_HEIGHT = 64;

  function loadImage(src) {
    return new Promise(resolve => {
      const img = new Image();
      img.onload = () => resolve({ ok: true, img });
      img.onerror = () => resolve({ ok: false });
      img.src = src;
    });
  }

  const fragment = document.createDocumentFragment();

  for (let i = 1; i <= positions.length; i++) {

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
    preview.style.backgroundImage = "url('/jarrettelectric/assets/tile_template.png')";
    preview.style.backgroundSize = "100% 100%";

    for (let s = 1; s <= 6; s++) {

      const slot = document.createElement("div");
      slot.style.position = "absolute";
      slot.style.top = slots[s - 1].top + "px";
      slot.style.left = slots[s - 1].left + "px";
      slot.style.width = SLOT_WIDTH + "px";
      slot.style.height = SLOT_HEIGHT + "px";

      // 🔒 HARD LOCK CENTERING
      slot.style.display = "flex";
      slot.style.alignItems = "center";
      slot.style.justifyContent = "center";

      slot.style.overflow = "hidden";

      const num = String(s).padStart(2, "0");
      const src = "Concepts/Concept_" + conceptNum + "/images/Concept_" + conceptNum + "_" + num + ".png";

      loadImage(src).then(result => {
        slot.innerHTML = "";

        if (result.ok) {
          const img = result.img;
          img.style.width = "100%";
          img.style.height = "100%";
          img.style.objectFit = "cover";
          slot.appendChild(img);
        } else {
          const text = document.createElement("div");

          text.textContent = "Coming\nSoon";

          text.style.display = "flex";
          text.style.flexDirection = "column";
          text.style.alignItems = "center";
          text.style.justifyContent = "center";

          text.style.width = "100%";
          text.style.height = "100%";

          text.style.color = "gold";
          text.style.fontSize = "10px";
          text.style.textAlign = "center";
          text.style.lineHeight = "1.1";
          text.style.whiteSpace = "pre-line";

          slot.appendChild(text);
        }
      });

      preview.appendChild(slot);
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

    fragment.appendChild(tile);
  }

  container.appendChild(fragment);

});
