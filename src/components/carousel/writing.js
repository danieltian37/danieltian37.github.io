const image1 = "/photos/op1.png"
const image2 = "/photos/ed1.jpeg"
const image3 = "/photos/ed2.png"

export const images = [image1, image2, image3]

const writingByIndex = (index) => images[index % images.length]

export default writingByIndex
