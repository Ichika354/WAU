import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const configureMiddleware = (app) => {
  app.use(express.json());
  app.use(
    cors({
      origin: ["http://127.0.0.1:5500","http://localhost:5173","https://ichika354.github.io/"],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
      optionsSuccessStatus: 200,
    })
  );
  app.use(bodyParser.urlencoded({ extended: true }));
};



export default configureMiddleware;