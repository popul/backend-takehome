export const SCHEDULE_FILE_PATH = "./schedule.json";

type Schedule = {
    uuid: string;
    timeZone: string;
    time: number;
  };
  
let scheduleList: Schedule[] = [];

export const getScheduleList = () => scheduleList;
export const setScheduleList = (list: Schedule[]) => {
    scheduleList = list;
}