import {RequestHandler} from "express";
import ErrorsList from "src/errors/errorsList/ErrorsList";

const routeNotFoundMiddleware: RequestHandler = (req, res) => {
    if (ErrorsList) {
        const errInfo = ErrorsList.httpErrors["404"];

        return res.status(errInfo.code).json(errInfo);
    }

    res.status(500).send("error occurred but not found in errors list");
};

export default routeNotFoundMiddleware;