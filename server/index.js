import express from "express";
import configureMiddleware from "./config/middleware.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import auth from "./controller/auth.js";
import adminCategory from "./controller/category_admin.js";
import category from "./controller/category.js";
import product from "./controller/product.js";
import user from "./controller/user.js";
import address from "./controller/address.js";
import order from "./controller/order.js";

import swaggerDocs from "./config/swagger.js";

dotenv.config();

const port = 3000;
const app = express();
configureMiddleware(app);

app.use(cookieParser());

app.use(auth);
app.use(adminCategory);
app.use(category);
app.use(product);
app.use(user);
app.use(address);
app.use(order);
swaggerDocs(app, port);

app.listen(port, () => {
    console.log(`running server on port ${port}`);
});
