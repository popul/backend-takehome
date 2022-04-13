import { Request, Response } from "express";
import { writeToFile } from "./api/writeToFile";
import { SCHEDULE_FILE_PATH } from "./store";


export const createUserLogic =
  (
    writeToFile: (path: string, json: any) => Promise<void>
  ) =>
  async (body: any) => {
    const now = new Date();
    const t2min = new Date(now.getTime() + 2 * 60 * 1000).getTime();

    writeToFile(SCHEDULE_FILE_PATH, {
      ...body,
      time: t2min,
    });
  };

export const userRoute = async (req: Request, res: Response) => {
  res.set({
    "content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
  });

  const userLogic = createUserLogic(writeToFile);
  await userLogic(req.body);

  res.send(req.body);
};
