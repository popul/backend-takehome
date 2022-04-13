import { nodeRequest } from "./api/nodeRequest";
import { writeToFile } from "./api/writeToFile";
import { getScheduleList, SCHEDULE_FILE_PATH, setScheduleList } from "./store";

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

export const createTriggerSchedule =
  (send: (body: any) => Promise<void>) => async () => {
    const list = getScheduleList();

    const indexesToRemove: number[] = [];
    const passedScheduled = list.filter((schedule, index) => {
      if (schedule.time >= Date.now()) {
        indexesToRemove.push(index);
        return true;
      }
    });
    for (let i = 0; i < indexesToRemove.length; i++) {
        list.splice(indexesToRemove[i], 1);
    }

    await Promise.all(
      passedScheduled.map(async (schedule) => {
        return send({
          ...schedule,
        });
      })
    );

    setScheduleList(list);
    writeToFile(SCHEDULE_FILE_PATH, list);
  };

export const startScheduler = () => {
  setInterval(createTriggerSchedule(sendClientRequest), 1000);
};
