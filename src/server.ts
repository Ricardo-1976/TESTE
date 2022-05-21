
import "reflect-metadata";
import express from 'express';
import "express-async-errors";

import "./database";

const app = express();

app.use(express.json());

app.listen(3333, () => console.log("Server is running!"));
