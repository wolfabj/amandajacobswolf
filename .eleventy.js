const eleventyNavigationPlugin = require('@11ty/eleventy-navigation')
const pluginRss = require('@11ty/eleventy-plugin-rss')
const { parse: parseCsv } = require("csv-parse/sync");

const { 
  getAllPosts, 
  getCategoryList,
  getCategorisedPosts 
} = require('./config/collections')

const { 
  readableDate 
} = require('./config/filters')

const { 
  imageShortcode 
} = require('./config/shortcodes')


module.exports = function(eleventyConfig) {
  
  /*================================*/
  /*   plugins and configurations   */
  /*================================*/
  eleventyConfig.addPlugin(eleventyNavigationPlugin)
  eleventyConfig.addPlugin(pluginRss)

  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
    excerpt_separator: "<!-- excerpt -->",
    excerpt_alias: 'excerpt'
  })

  /*===================================================*/
  /* files that need to be copied to the build folder  */
  /*===================================================*/
  // used as social image
  eleventyConfig.addPassthroughCopy('./src/assets/morning.jpg')
  eleventyConfig.addPassthroughCopy('./src/assets/icons')
  eleventyConfig.addPassthroughCopy('./src/assets/sprite.svg')
  eleventyConfig.addPassthroughCopy({
      'node_modules/svg-icon-sprite/dist/svg-icon-sprite.js': 'assets/svg-icon-sprite.js'
  })


  /*=================*/
  /*     Layouts     */
  /*=================*/
  eleventyConfig.addLayoutAlias('default', 'layouts/default')
  eleventyConfig.addLayoutAlias('article', 'layouts/article')


  /*=================*/
  /*   Collections   */
  /*=================*/
  // eleventyConfig.addCollection('works', getAllPosts)
  eleventyConfig.addCollection('categoryList', getCategoryList)
  eleventyConfig.addCollection('categorisedPosts', getCategorisedPosts)
  eleventyConfig.addFilter("find", function find(collection = [], name = "") {
    console.log("finding " + name);
    return collection.find(work => work.name === name);
  });


  /*=================*/
  /*  Csv Extension  */
  /*=================*/
  /* Source: https://www.maxkohler.com/posts/eleventy-csv/ */
  eleventyConfig.addDataExtension("csv", (contents, filepath) => {
    const records = parseCsv(contents, {
      columns: true,
      skip_empty_lines: true,
    });
    return records;
  });

  
  /*=================*/
  /*     Filters     */
  /*=================*/
  eleventyConfig.addFilter('readableDate', readableDate)


  /*=================*/
  /*    shortcodes   */
  /*=================*/
  eleventyConfig.addNunjucksAsyncShortcode('image', imageShortcode)


  return {
    dir: {
      input: 'src',
      output: '_site',
      includes: '_includes',
      data: '_data'
    },
    markdownTemplateEngine: 'njk'
  }
}