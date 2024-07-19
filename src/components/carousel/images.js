const image1 = "/photos/1.jpg"
const image2 = "/photos/7.JPG"
const image3 = "/photos/8.jpg"
const image4 = "/photos/2.PNG"
const image5 = "/photos/3.jpg"
const image6 = "/photos/4.jpg"

export const images = [image1, image2, image3, image4, image5, image6]

const imageByIndex = (index) => images[index % images.length]

export default imageByIndex
