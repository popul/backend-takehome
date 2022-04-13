import { Request, Response } from "express";
import { nodeRequest } from "./nodeRequest";

export const sendClientRequest = async (json: any) => {
  await nodeRequest({
    host: "localhost",
    port: 8080,
    path: "",
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(json),
  });
  return;
};

export const createUserLogic =
  (send: (json: any) => Promise<void>) => async (body: any) => {
    const nowISO = new Date().toISOString();
    await send({
      ...body,
      scheduledDate: nowISO 
    });
  };

export const userRoute = async (req: Request, res: Response) => {
  res.set({
    "content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
  });

  const userLogic = createUserLogic(sendClientRequest);
  await userLogic(req.body);

  res.send(req.body);
};
