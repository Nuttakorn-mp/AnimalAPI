// import + setting part
const Express = require('express');
const Morgan = require('morgan');

const Port = process.env.Port || 4000;
const connectDB = require('./connection/db');

const app = Express();

// work part
connectDB();
app.use(Express.json());
app.use(Morgan('dev'));

const routes = require('./routes/todo');
// routes(app);
// app.use('/', (req ,res)=>{
//     res.status(200).json({
//         message:"hello world"
//     });
// })

// Error part when no answer
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin,X-Requested-With,Content-Type,Accept,Authorization',
  );
  if (req.method == 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    // res.header('Accept-Control-Methods','PUT,POST,GET,OPTIONS');
    return res.status(200).json({

    });
  }
  next();
});

routes(app);

app.use((req, res, next) => {
  const error = new Error('Not Found');
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: { message: error.message },
  });
});

app.listen(Port, () => {
  console.log(`connect at port ${Port}`);
});
