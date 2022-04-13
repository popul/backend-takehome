import axios, { AxiosInstance } from "axios";
import { v4 as uuidv4 } from "uuid";
import { User } from "../share";

const MIN_NUMBER_OF_CALL: number = 100;
const MAX_NUMBER_OF_CALL: number = 1000;

const instance: AxiosInstance = axios.create({
  baseURL: "http://localhost:3001/",
  timeout: 3000,
  headers: { "content-type": "application/json" },
});

const timezones: string[] = ["Europe/Paris", "America/Chicago", "Europe/London"];

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

(async (): Promise<void> => {
  const users: User[] = [];
  const nbOfCalls: number = Math.floor(
    Math.random() * (MAX_NUMBER_OF_CALL - MIN_NUMBER_OF_CALL) + MIN_NUMBER_OF_CALL
  );

  for (let i = 0; i <= nbOfCalls; ++i) {
    users.push({
      uid: uuidv4(),
      timeZone: timezones[Math.floor(Math.random() * timezones.length)],
    });
  }

  let res = null;
  do {
    await sleep(Math.floor(Math.random() * 1000));
    try {
      res = await Promise.all(users.map((user: User) => instance.post("/user", user)));
      console.log(`Successfully sent ${res.length} tasks`);
    } catch (err) {
      console.error('error');
    }
  } while (!res);
})();
