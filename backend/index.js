import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import chalk from 'chalk';
import morgan from 'morgan';
import moment from 'moment';

import login from './handlers/users/login.js';
import signup from "./handlers/users/signup.js";
import getOperations from "./handlers/operation/getOperations.js";
import postOperations from "./handlers/operation/postOperations.js";
import putOperations from "./handlers/operation/putOperations.js";
import patchOperations from "./handlers/operation/patchOperations.js";
import deleteOperations from "./handlers/operation/deleteOperations.js";
import users from "./handlers/users/models/users.js";
import initialDataStart from "./initial-data/initial-data.service.js";
import logout from "./handlers/users/logout.js";
import LoggersErrors from './loggers/loggersError.js';
import loggersOperations from './loggers/loggersOperation.js';




// Connect to MongoDB //
  async function main() {
    await mongoose.connect(process.env.REMOTE_URL);
    console.log(chalk.bgYellowBright("MongoDB Connected on port 27017"));
  }

main().catch(err => console.log(err));

const app = express();

app.use(express.json());

app.use(cors({
    origin: true,
    credentials: true,
    methods: 'GET,PUT,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization',
}));

// Log the requests //
app.use(LoggersErrors);

// Start the server //
app.listen(4000, () => {
  console.log(chalk.italic.bgCyan("Server is running on port 4000"));
});
// Serve the static files //
app.use(express.static("public"));

// Log the requests to the terminal //
morgan.token("time", () => moment().format("YYYY-MM-DD HH:mm:ss"));
const morganFormat = ":time :method :url :status :response-time ms";
app.use(morgan(chalk.bgMagenta(morganFormat)));


login(app);
signup(app);
getOperations(app);
postOperations(app);
putOperations(app);
patchOperations(app);
deleteOperations(app);

users(app);
initialDataStart(app);
logout(app);

//log the operations //
app.use(loggersOperations);


app.use((req, res) => {
  res.status(404).json({ message: "Sorry, page not found 404" });
});














