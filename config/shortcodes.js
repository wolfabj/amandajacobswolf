const Image = require('@11ty/eleventy-img')

const localImgPath = "src/assets/images/"

const imageShortcode = async (imageObj = {}) => {
  if (!imageObj.src.startsWith("http")) {
    imageObj.src = localImgPath + imageObj.src;
  }

  const widths = imageObj.widths || [300, 600, 900, 1200]
  const className = imageObj.className || "image"

  const sizes = "(min-width: 100px) 50vw, 100vw"
  const metadata =  await Image(imageObj.src, {
      formats: ["jpeg", "webp"],
      outputDir: "./_site/assets/images/generated/",
      urlPath: "/assets/images/generated/",
      widths: widths
  })
  const alt = imageObj.alt;

  const imageAttributes = {
      class: className,
      alt,
      sizes,
      loading: "lazy",
      decoding: "async",
  }

  return Image.generateHTML(metadata, imageAttributes)
}


module.exports = {
  imageShortcode
}
