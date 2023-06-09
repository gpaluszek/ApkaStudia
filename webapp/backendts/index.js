import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "../backend/config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import UserRoute from "./routes/UserRoute.js";
import AuthRoute from "./routes/AuthRote.js";
import ContractRoute from "./routes/ContractRoute.js";

dotenv.config();



const app = express();

const sessionStore = SequelizeStore(session.Store)

const store = new sessionStore({
    db: db
});

// // tworzenie tabel
// // (async()=>{
// //     await db.sync();
// // })();

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }

 }));

app.use(cors({
   
   origin: 'http://localhost:3000',
   credentials: true
}));
app.use(express.json());
app.use(UserRoute);
app.use(AuthRoute);
app.use(ContractRoute);

// // store.sync();


app.listen(process.env.APP_PORT, ()=> {
   console.log('Server up and running...');
 });