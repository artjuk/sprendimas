import express, { json } from "express";
import Routes from "./cake.router";

const app = express();

app.use(json());

require("./mongoose.config")(app);

app.use("/cakes", Routes);

app.listen(3000);
