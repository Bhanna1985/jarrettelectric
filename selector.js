const slots = [
  { top: 12, left: 12, width: 102, height: 64 },
  { top: 12, left: 126, width: 102, height: 64 },
  { top: 88, left: 12, width: 102, height: 64 },
  { top: 88, left: 126, width: 102, height: 64 },
  { top: 164, left: 12, width: 102, height: 64 },
  { top: 164, left: 126, width: 102, height: 64 }
]

const positions = [
  { top: 300, left: 80 },
  { top: 300, left: 360 },
  { top: 300, left: 640 },
  { top: 300, left: 920 },
  { top: 620, left: 80 },
  { top: 620, left: 360 },
  { top: 620, left: 640 },
  { top: 620, left: 920 }
]

const selector = document.getElementById("selector")

for (let i = 1; i <= 8; i++) {

  const concept = String(i).padStart(3, '0')

  const tile = document.createElement("div")
  tile.style.position = "absolute"
  tile.style.top = positions[i - 1].top + "px"
  tile.style.left = positions[i - 1].left + "px"
  tile.style.width = "240px"
  tile.style.height = "260px"

  const template = document.createElement("img")
  template.src = "./assets/tile_template.png"
  template.style.position = "absolute"
  template.style.top = "0"
  template.style.left = "0"
  template.style.width = "240px"
  template.style.height = "240px"
  tile.appendChild(template)

  const container = document.createElement("div")
  container.style.position = "absolute"
  container.style.top = "0"
  container.style.left = "0"
  container.style.width = "240px"
  container.style.height = "240px"

  slots.forEach((slot, index) => {

    const cell = document.createElement("div")
    cell.style.position = "absolute"
    cell.style.top = slot.top + "px"
    cell.style.left = slot.left + "px"
    cell.style.width = slot.width + "px"
    cell.style.height = slot.height + "px"
    cell.style.display = "flex"
    cell.style.alignItems = "center"
    cell.style.justifyContent = "center"
    cell.style.flexDirection = "column"
    cell.style.overflow = "hidden"

    const img = document.createElement("img")
    img.src = "./Concepts/Concept_" + concept + "/images/Concept_" + concept + "_0" + (index + 1) + ".png"
    img.style.width = "100%"
    img.style.height = "100%"
    img.style.objectFit = "cover"

    img.onerror = function () {
      this.remove()
      cell.innerHTML = "<div style='display:flex;align-items:center;justify-content:center;flex-direction:column;height:100%'>Coming<br>Soon</div>"
    }

    cell.appendChild(img)
    container.appendChild(cell)

  })

  tile.appendChild(container)

  const label = document.createElement("div")
  label.innerText = "Concept " + concept
  label.style.position = "absolute"
  label.style.top = "240px"
  label.style.width = "240px"
  label.style.textAlign = "center"

  tile.appendChild(label)

  selector.appendChild(tile)
}
