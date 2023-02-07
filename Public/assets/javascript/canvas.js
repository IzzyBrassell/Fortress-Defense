const canvas = document.querySelector(`canvas`)
const context = canvas.getContext(`2d`)

// Indicates the dimensions of the play field
canvas.width = 1280
canvas.height = 768

// Applies the dimension
context.fillRect(0, 0, canvas.width, canvas.height)

const map1 = new Image()
// what to do when the image loads
map1.onload = () =>{
    context.drawImage(map1 , 0 , 0)
}
map1.src = `assets/Img/Gamemap.png`
