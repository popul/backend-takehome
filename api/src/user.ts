import { Request, Response } from "express";
import { writeToFile } from "./api/writeToFile";
import { getScheduleList, Schedule, SCHEDULE_FILE_PATH } from "./store";

const appendToList = (schedule: Schedule) => {
  const list = getScheduleList();
  list.push(schedule);
  return list;
}

export const createUserLogic =
  (
    writeToFile: (path: string, json: any) => Promise<void>
  ) =>
  async (body: any) => {
    const now = new Date();
    // const t2min = new Date(now.getTime() + 2 * 60 * 1000).getTime();
    const t2min = new Date(now.getTime() + 1000).getTime();

    const list = appendToList({
      ...body,
      time: t2min,
    });

    writeToFile(SCHEDULE_FILE_PATH ,list);
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
