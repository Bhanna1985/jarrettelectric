const BASE = "/jarrettelectric"

const slots = [
  { top: 14, left: 14, width: 96, height: 60 },
  { top: 14, left: 130, width: 96, height: 60 },
  { top: 92, left: 14, width: 96, height: 60 },
  { top: 92, left: 130, width: 96, height: 60 },
  { top: 170, left: 14, width: 96, height: 60 },
  { top: 170, left: 130, width: 96, height: 60 }
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
  template.src = BASE + "/assets/tile_template.png"
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
    cell.style.overflow = "hidden"

    const img = document.createElement("img")
    img.src = BASE + "/Concepts/Concept_" + concept + "/images/Concept_" + concept + "_0" + (index + 1) + ".png"
    img.style.width = "100%"
    img.style.height = "100%"
    img.style.objectFit = "cover"

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
