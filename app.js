require('dotenv').config({ path: `${process.cwd()}/.env` });

// CronJobs
require("./cronjobs/metricSummary.cron");
require("./cronjobs/propertyDailyStat.cron");

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const catchAsync = require('./utils/catchAsync');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorControler');

// 👇 Importar el router general
const appRouter = require('./routes/appRouter');

const app = express();

// CORS
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3002",
  "https://smart-prop.vercel.app"
];

app.use(morgan('dev'));

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(express.json());

// Ruta base
app.get('/', (req, res) => {
  res.status(200).json({
    status: "success",
    message: 'Works'
  });
});

app.use('/api', appRouter);

app.all('*', (req, res, next) => {
  next(new AppError('Ruta no encontrada', 404));
});


// Manejador de errores
app.use(globalErrorHandler);

// Iniciar servidor
const PORT = process.env.APP_PORT || 5001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
