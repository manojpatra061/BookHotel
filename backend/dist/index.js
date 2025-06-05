"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./db"));
const routes_1 = require("./routes");
require("dotenv/config");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const cloudinary_1 = require("cloudinary");
// cloudinary configuration
cloudinary_1.v2.config({
    cloud_name: process.env.COULDINARY_CLOUD_NAME,
    api_key: process.env.COULDINARY_API_KEY,
    api_secret: process.env.COULDINARY_API_SECRET,
});
const app = (0, express_1.default)();
app.use(express_1.default.static(path_1.default.join(__dirname, "../../frontend/dist"))); //serving the frontend dist as static files
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: [process.env.FRONTEND_URL1],
    credentials: true,
})); //enable CORS for fronend url only
// api endpoints
app.use("/api/test", routes_1.testRoute);
app.use("/api/user", routes_1.userRoute);
app.use("/api/auth", routes_1.authRoute);
app.use("/api/my-hotels", routes_1.myHotelRoute);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
    yield (0, db_1.default)(process.env.MONGODB_CONNECTION_STRING);
    app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
        console.log(`server is running at port ${PORT}`);
    }));
});
start();
