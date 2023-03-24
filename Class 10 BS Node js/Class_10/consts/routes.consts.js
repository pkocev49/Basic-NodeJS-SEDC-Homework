import { Router } from "express";
import authRouter from "../routes/auth.router.js";
import productsRouter from "../routes/products.router.js";
import { authentication } from "../middleware/token_validate.js";
const router = Router();

router.use(authRouter);
router.use("/products", authentication, productsRouter);

export default router;
