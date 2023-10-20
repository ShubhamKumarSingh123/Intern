const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const app = express();
const port = process.env.PORT || 2000;
const url = "https://en.wikipedia.org/wiki/U.S._state";

let states = [];
let i;

const fetchData = async () => {
  try {
    let res = await axios.get(url);
    let $ = cheerio.load(res.data);
    // $(
    //   "#mw-content-text > div.mw-parser-output > div.div-col > div > ul > li > a"
    // ).each((i, e) => {
    //   states.push($(e).text());
    // });
    let t = $("html *")
      .contents()
      .map(function () {
        return this.type === "text" ? $(this).text() : "";
      })
      .get()
      .join(" ");

    console.log(t);
  } catch (e) {
    console.log(e);
  }
};
fetchData();
app.get("/states", (req, res) => {
  res.send(i);
});

app.listen(port, () => {
  console.log("server running");
});

// const cheerio = require("cheerio");
// const axios = require("axios");

// // Replace 'YOUR_URL_HERE' with the actual URL you want to scrape
// const url = "YOUR_URL_HERE";

// axios
//   .get(url)
//   .then((response) => {
//     const html = response.data;
//     const $ = cheerio.load(html);

//     // Function to recursively extract text from a node and its children
//     const extractText = (node) => {
//       let text = "";

//       // Extract text from the current node
//       if (node.type === "text") {
//         text += node.data.trim() + " ";
//       }

//       // Recursively process child nodes
//       if (node.children) {
//         node.children.each((_, child) => {
//           text += extractText(child);
//         });
//       }

//       return text;
//     };

//     // Start extraction from the root node (usually 'body')
//     const allText = extractText($("body")[0]);

//     // Print or do something with the extracted text
//     console.log(allText);
//   })
//   .catch((error) => {
//     console.error("Error fetching the page:", error);
//   });
