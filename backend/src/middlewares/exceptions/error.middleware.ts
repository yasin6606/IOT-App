import {ErrorRequestHandler} from "express";
import HTTPException from "src/errors/exceptions/HTTPException/HTTPException";
import ErrorsList from "src/errors/errorsList/ErrorsList";

const error: ErrorRequestHandler = (err: HTTPException, req, res, next) => {
    const errInfo = ErrorsList.httpErrors["500"];

    const status = err.status || errInfo.code;
    const message = err.message || errInfo.msg;

    return res.status(status).send(message);
};

export default error;