// function pageLoad() {
//     console.log('Hey, what are you looking at?')
//     const colors = [
//         ['#001219ff','#005f73ff','#0a9396ff','#94d2bdff','#e9d8a6ff','#ee9b00ff','#ca6702ff','#bb3e03ff','#ae2012ff','#9b2226ff'],
//         ['#f94144ff','#f3722cff','#f8961eff','#f9844aff','#f9c74fff','#90be6dff','#43aa8bff','#4d908eff','#577590ff','#277da1ff'],
//         ['#ffd6ffff','#e7c6ffff','#c8b6ffff','#b8c0ffff','#bbd0ffff'],
//         ['#03045eff','#023e8aff','#0077b6ff','#0096c7ff','#00b4d8ff','#48cae4ff','#90e0efff','#ade8f4ff','#caf0f8ff'],
//         ['#ffadadff','#ffd6a5ff','#fdffb6ff','#caffbfff','#9bf6ffff','#a0c4ffff','#bdb2ffff','#ffc6ffff','#fffffcff']
//     ]
//     const fonts = ['Bungee', 'Bungee Inline', 'Gugi', 'Libre Barcode 39 Text', 'Monofett', 'Monoton', 'Shrikhand']

//     const selectedPalette = colors[getRandomInt(0, colors.length - 1)]
//     changeFont(fonts)
//     changeStyles(selectedPalette)
//     changeSpecks(selectedPalette)
//     changeSpecks(selectedPalette)

//     setInterval(() => {
//         const selectedPalette = colors[getRandomInt(0, colors.length - 1)]
//         changeFont(fonts)
//         changeStyles(selectedPalette)
//         changeSpecks(selectedPalette)
//     }, 2000)
// }

// function getRandomInt(min, max) {
//     return Math.floor(Math.random() * (max - min) + min)
// }

// function changeFont(fonts) {
//     const font = fonts[getRandomInt(0, fonts.length - 1)]
//     const body = document.querySelector('body')
//     body.style.fontFamily = `'${font}', cursive`
// }

// function changeSpecks(selectedPalette) {
//     const specks = document.querySelectorAll('.speck')
//     const pageWidth = getWidth()
//     specks.forEach(s => {
//         s.style.color = selectedPalette[getRandomInt(0, selectedPalette.length - 1)]
//         s.style.left = `${getRandomInt(0, pageWidth)}px`
//         s.style.fontSize = `${getRandomInt(10, 30)}px`
//     })
// }

// function changeStyles(selectedPalette) {
//     const topDiv = document.querySelector('#top')
//     const bottomDiv = document.querySelector('#bottom')
//     const topText = document.querySelector('#top h1')
//     const bottomText = document.querySelector('#bottom h1')

//     topDiv.style.backgroundColor = selectedPalette[getRandomInt(0, selectedPalette.length - 1)]
//     bottomDiv.style.backgroundColor = selectedPalette[getRandomInt(0, selectedPalette.length - 1)]
//     topText.style.color = selectedPalette[getRandomInt(0, selectedPalette.length - 1)]
//     bottomText.style.color = selectedPalette[getRandomInt(0, selectedPalette.length - 1)]
// }

// function getWidth() {
//     return Math.max(
//       document.body.scrollWidth,
//       document.documentElement.scrollWidth,
//       document.body.offsetWidth,
//       document.documentElement.offsetWidth,
//       document.documentElement.clientWidth
//     );
//   }

// pageLoad()
