const express = require('express');

const fs = require('fs');

const dotenv = require('dotenv');

dotenv.config();

// web server
const app = express();

const port = process.env.PORT || 3001;

app.use(express.json());

// homepage
app.get('/', (req, res) => {
  res.send("Append URL with '/getfile' to get response");
});

// create the text file with timestamp-------------post rquest---------------------
function postReq() {
  app.post('/createfile', (req, res) => {
    // current date with time

    let timestamp = Date.now();

    const dateObject = new Date();
    var date = `0${dateObject.getDate()}`.slice(-2);
    var month = `0${dateObject.getMonth() + 1}`.slice(-2);
    var year = dateObject.getFullYear();
    var hours = dateObject.getHours();
    var minutes = dateObject.getMinutes();
    var seconds = dateObject.getSeconds();
    var dateTime = `${date}.${month}.${year}--${hours}.${minutes}.${seconds}`;

    fs.writeFile(`${dateTime}.txt`, `${timestamp}`, (err) => {
      if (err) throw err;
      console.log('File has been created');
    });
    res.send(`Your text file ${dateTime}.txt is created`);
  });
}

// retrieves all text files--------------get request--------------------
var path = require('path');

function getReq() {
  app.get('/getfile', (req, res) => {
    fs.readdir('../nodejs_filesystem', (err, files) => {
      if (err) throw err;

      files.forEach((file) => {
        if (path.extname(file) === '.txt') {
          console.log(`The text file is:${file}`);

          fs.readFile(file, 'utf-8', (err, data) => {
            console.log(`${file} content is: ${data}`);
          });
        }
      });
    });

    res.send(`We have retrived all the text files.`);
  });
}

app.listen(port, () => {
  console.log(`web server started in the port ${process.env.PORT}.`);
  postReq();
  getReq();
});

// outputs for get method

// The text file is:13.06.2022--19.29.30.txt
// The text file is:13.06.2022--20.7.22.txt
// The text file is:13.06.2022--20.7.46.txt
// The text file is:13.06.2022--21.56.43.txt
// The text file is:13.06.2022and19.30.51.txt
// The text file is:13062022--192820.txt
// 13.06.2022--20.7.22.txt content is: 1655131042776
// 13.06.2022--20.7.46.txt content is: 1655131066706
// 13.06.2022--19.29.30.txt content is: 1655128770581
// 13.06.2022and19.30.51.txt content is: 1655128851963
// 13.06.2022--21.56.43.txt content is: 1655137603902
// 13062022--192820.txt content is: 1655128700433
// Export the Express API