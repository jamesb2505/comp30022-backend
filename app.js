"use strict";
const logger = require("./utils/logger");
const db = require("./models/db");
const routes = require("./routes");
const express = require("express");
const cookieParser = require("cookie-parser");
const httpLogger = require("morgan");
const app = express();
const cors = require("cors");
const Sentry = require("@sentry/node");

Sentry.init({ dsn: process.env.SENTRY_DSN });

app.locals.logger = logger;
app.locals.db = db;
app.use(Sentry.Handlers.requestHandler());
app.use(cors());
app.use(httpLogger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/", routes);
app.use(Sentry.Handlers.errorHandler());
module.exports = app;
