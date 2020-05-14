export default function changeBackgroundImage(src,canvas) {
    const ctx = canvas.getContext('2d');
    const background = new Image()
    background.src = src
    background.onload = () => ctx.drawImage(background,0,0,canvas.width,canvas.height)
}