import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const configureMiddleware = (app) => {
  app.use(express.json());
  app.use(
    cors({
      origin: ["http://localhost:5173"],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
      optionsSuccessStatus: 200,
    })
  );
  app.use(bodyParser.urlencoded({ extended: true }));
};



export default configureMiddleware;