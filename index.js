import express from "express";
import yargs from "yargs";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { Sequelize } from "sequelize";

/*MIDDLEWARES*/
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

/*ROUTES*/
import authRoutes from "./src/routes/auth.route.js";
import userRoutes from "./src/routes/user.route.js";
import quizRoutes from "./src/routes/quiz.route.js";
import questionRoutes from "./src/routes/question.route.js";

/**DATABASE */
import db, { initializeDB } from "./src/models/index.js";

/**utils */
import {
  createAdmin,
  createChoice,
  createQuestion,
  createQuiz,
  createUser,
  createUserAnswer,
} from "./src/utils/seedDB.js";

/**ARGUMENTS */
if (process.argv.length < 6) {
  process.exit(1);
}

const app = express();
const { port, username, password, dbname, dev } = yargs(
  process.argv.splice(2) //first attribute is node and second is index.js file
).argv;

/**CONNECT AND INITIALIZE DB */
export let sequelize;
function connectDB() {
  sequelize = new Sequelize(dbname, username, password, {
    host: "127.0.0.1",
    dialect: "mysql",
  });

  sequelize
    .authenticate()
    .then(() => {
      console.log("Connected to database");
    })
    .catch((err) => {
      console.log("Unable to connect to Database", err);
    });

  initializeDB();

  /*****************DEVELOPMENT *********/
  if (dev) {
    db.sequelize
      .sync({ force: true })
      .then(() => {
        console.log("Drop and Resync Db");
      })
      .then(async () => {
        await createAdmin();
        await createUser();
        await createQuiz();
        await createQuestion();
        await createChoice();
        await createUserAnswer();
      });
  }

  /********************** **************/
}

/**INBUILT MIDDLEWARE**/
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

/** Swagger Initialization - START */
const swaggerOption = {
  swaggerDefinition: (swaggerJsdoc.Options = {
    info: {
      version: "1.0.0",
      title: "Quiz",
      description: "API documentation",
      contact: {
        name: "MPXFACTOR",
      },
      servers: [`http://localhost:${port}`],
    },
  }),
  apis: ["index.js", "./src/routes/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOption);
app.use("/rest-api", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**EXTERNAL MIDDLEWARE */
dotenv.config();
let corsOptions = {
  origin: [
    "http://127.0.0.1:5500",
    "http://localhost:5500",
    "http://localhost:3000",
  ],
  credentials: true,
};

app.use(cors(corsOptions));

/**ROUTES */
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/question", questionRoutes);

/**SERVER */
app.listen(port, () => {
  console.log(`SERVER => http://localhost:${port}`);
  connectDB();
  console.log(`SWAGGER => http://localhost:${port}/rest-api/`);
});
