import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const configureMiddleware = (app) => {
  app.use(express.json());
  app.use(
    cors({
      origin: ["https://ichika354.github.io", "http://localhost:5173", "http://127.0.0.1:5500", "http://localhost:8000", "https://sadnuja.sga.dom.my.id"],
      methods: ["GET", "POST", "PUT", "OPTIONS", "DELETE"],
      credentials: true,
      optionsSuccessStatus: 200,
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );
  app.use(bodyParser.urlencoded({ extended: true }));
};

export default configureMiddleware;