import 'dotenv/config'
import express from "express";
import { createServer } from "http";
import cors from "cors";
import axios from "axios";
import morgan from "morgan";
import { connectDB } from "./config/db.js";
import { createSocket } from "./socket/socketIo.js";
import { verifyJwt } from "./middlewares/verifyJwt.js";
// import multer from "multer";

connectDB();

const app = express();
const httpServer = createServer(app);
// const upload = multer()

app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ limit: "500mb", extended: true }));
app.use(cors({ origin: "*" }));
app.use(morgan("dev"));

// app.use(verifyJwt)

createSocket(httpServer);

import AUTH_ROUTES from "./routes/userRoutes.js";
import CATEGORY_ROUTES from "./routes/categoryRoutes.js";
import COMPANY_ROUTES from "./routes/companyRoutes.js";
import ORDER_ROUTES from './routes/orderRoutes.js';
import CONVERSATION_ROUTES from './routes/conversationRoutes.js';
import MESSAGES_ROUTES from './routes/messageRoutes.js'
import parser from "./utils/cloudinary.js";

app.use("/user", AUTH_ROUTES);
app.use("/category", CATEGORY_ROUTES);
app.use("/company", COMPANY_ROUTES);
app.use("/order", ORDER_ROUTES);
app.use("/conversation",CONVERSATION_ROUTES)
app.use("/messages", MESSAGES_ROUTES);

app.post("/upload",parser.single('file'),   async (req, res) => {
  try {

    const {originalname} = req.file
    console.log(req.file)
    const uploadedResponse = await cloudinary.uploader.upload(req.file.buffer, {upload_preset: "ml_default"}, (error, result)=>{
        console.log(result, error);
      });
    // console.log(uploadedResponse);
    res.json({uploadedResponse});
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: JSON.stringify(error)});
  }
});


app.get("/protected", async (req, res) => {
  try {
    const accessToken = req.headers.authorization.split(" ")[1];
    const response = await axios.get(
      "https://virtual-company.us.auth0.com/userinfo",
      {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const userInfo = response.data;
    res.send("helo");
  } catch (error) {
    res.send(error.message);
  }
});

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Internal server error";
  res.status(status).send(message);
});

httpServer.listen(4000, () => console.log("server on port 4000"));
