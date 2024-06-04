const express = require('express');
const app = express();
app.use(express.json())
app.use(logger);
//creates the router
const dogRouter = require('./routes/dogs')
app.use('/dogs', dogRouter)


function logger(req, res, next){
console.log(req.method, req.path)
// console.log(res.statusCode)
res.on('finish', () => {
  console.log(res.statusCode) 
});
next();
}

// For testing purposes, GET /
app.get('/', (req, res) => {
  res.json("Express server running. No content provided at root level. Please use another route.");
});

// For testing express.json middleware
app.post('/test-json', (req, res, next) => {
  // send the body as JSON with a Content-Type header of "application/json"
  // finishes the response, res.end()
  res.json(req.body);
  next();
});

// For testing express-async-errors
app.get('/test-error', async (req, res) => {
  throw new Error("Hello World!")
});


app.use((req, rec, next) => {
const error = new Error("The requested resource couldn't be found.")
error.statusCode = 404;
next(error);
});


app.use((err, req, rec, next) => {
console.log(err)
err.statusCode = err.statusCode || 500
console.log(`Something went wrong, ${err.statusCode}, ${err.stack}`)
});








// app.get((err, req, rec, next) => {
// const error = new Error("The requested resource couldn't be found.")
// err.statusCode = 404;
// next(error);
// })


const port = 5000;
app.listen(port, () => console.log('Server is listening on port', port));
