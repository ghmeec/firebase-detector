const axios = require("axios");
const cheerio = require("cheerio");

async function fetchData(url) {
  console.log("Crawling data...");
  // make http call to url
  let response = await axios(url).catch((err) => console.log(err));

  if (response.status !== 200) {
    console.log("Error occurred while fetching data");
    return;
  }
  return response;
}
function extractJS() {}

console.log("Extracting the js script for : ", process.argv[2]);
if (!process.argv[2]) {
  console.log("Please provide domain : ");
  return;
}
const url = process.argv[2];
fetchData(url).then(async (res) => {
  const html = res.data;
  const $ = cheerio.load(html);
  const scripts = $("script"); //selecting scripts only
  console.log("No of script files found  :  ", scripts.length);
  console.log("Searching for firebase info ...");

  const jsUrls = [];
  scripts.each((script, others) => {
    // let found=$(this)
    console.log("Whats found is here : ", script, others.attribs.src);
    if (others.attribs.src) {
      jsUrls.push(`${url}${others.attribs.src}`);
    }
  });

  console.log("All urls found : ", jsUrls);
  console.log("Extracting JS from the server ... ");

  // allString = "";
  // promises = [];
  // Promise.all(
  //   jsUrls.map(async (link) => {
  //     console.log("whats up : ", link);
  //     const data = fetchData(link);
  //   }),
  //   (values) => {
  //     console.log("All the values : ", values);
  //   }
  // );
  // console.log("All promises are : ", promises);
  // console.log("Here is the script you requested : ", allString);
});
