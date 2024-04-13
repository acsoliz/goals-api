/*
TODO Implementar
*/
import { NextFunction, Request, Response } from 'express';



export class CorsMiddleware {

  static cors = (req: Request, res: Response, next: NextFunction) => {

    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
  }


}

