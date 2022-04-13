import { Request, Response } from "express";

export const user = function (req: Request, res: Response) {
  res.set({
    "content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
  });

  res.send(req.body);
};
