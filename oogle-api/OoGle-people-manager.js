/**********************************************************************
 * This is the Javascript program that runs the back end of our 
 * project to manage the database of Oogle workers.
 *
 * All HTTP errors found at 
 * https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html
 *
 * @author Trung-Vuong Pham and Hai Duong
 * @date December 2, 2018
 *********************************************************************/

/** imports needed from our file **/
/** The API toolkit for making REST systems easily **/
const express = require('express');

/** A good solution for handling JSON data in routes **/
const bodyParser = require('body-parser');

/** Node JS modules for filesystem access **/
const fs = require('fs');

/** Our database connection
  * This will be a JSON object of our programmers
  * and can be accessed as if it was any other javascript
  * object **/
const database = require('./programmers.json');

/** array of database objects **/
const arrayDB = [database];

/** database keys **/
const databaseKey = Object.keys(database);

/** Make an instance of our express application **/
const app = express();

/** Specify our > 1024 port to run on **/
const port = 3000;

/** Apply our middleware so our code can natively handle JSON easily **/
app.use(bodyParser.json());

/** We must have our list of programmers to use **/
if (!fs.existsSync('./programmers.json')) {
  throw new Error('Could not find database of programmers!');
}

/** Build our routes **/

/** This sends the database **/
app.get('/', (req, res) => {
  res.send(arrayDB);
});

/** This sends users with SID **/
app.get('/:id', (req, res) => {
  const id = req.params.id;
  var l = [];   //l for list 
  arrayDB.forEach(s => {
      if(s.SID == id){
      l.push(e);
      }
  });
  /** find ID, if not then send error 404 **/
  if(l.length == 0){
      res.sendStatus(404);  // NOT FOUND 
  } 
  else {
      res.send(l);
  }
});

/** Updates the person in our database with ID found **/
app.put('/:id', (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const bodyKey = Object.keys(body);
  
  /** Removes object from database **/
  /* Splice found at https://www.w3schools.com/jsref/jsref_splice.asp */
  var index = arrayDB.length - 1; // our parameter for while loop
  while(index >= 0){
     if(arrayDB[index].SID == id){
	 arrayDB.splice(i,1);  // removes this portion of the array
     }
     index--;  // decrements
  }

  /* Places object in correct area */
  let data = {};
  databaseKey.forEach(k => {  //k for key
	if(body[k]){
      data[k] = body[k];
	} else {
	  data[k] = "";
	}
  }); 
  arrayDB.push(data);
  res.send(`Update values with ID: ${id}`);
});

/** This should create a new programmer into our database **/
app.post('/', (req, res) => {
  const body = req.body; // Hold your JSON in here!
  const bodyKey = Object.keys(body);
  
  /* Makes sure data goes to right spot */
  let data = {};
  databaseKey.forEach(k => {  //k for key
      if(body[k]}
	  data[k] = body[k];
      }
      else{
          data[k] = "";
      }
  });
  arrayDB.push(data;
  /** Found at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify **/
  res.send(`You sent: ${JSON.stringify(body)}`);
});

// IMPLEMENT A ROUTE TO HANDLE ALL OTHER ROUTES AND RETURN AN ERROR MESSAGE
app.all('*', (req, res) => {
  res.sendStatus(403); // HTTP 403 Forbids the request
});

app.listen(port, () => {
  console.log(`She's alive on port ${port}`);
});
