import express, {Router} from "express";

const router: Router = express.Router();

router.get("/", (req, res) => {
    res.send("yes");
});

export default router;