import mongoose from "./config/mongoose";
import express from "./config/express";

let db = mongoose(),
    app = express();

export default app;
