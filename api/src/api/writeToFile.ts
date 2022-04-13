import fs from "fs";

export const writeToFile = (path: string, content: any): Promise<void> => {
  return new Promise((res, reject) => {
    fs.writeFile(path, JSON.stringify(content, null, 2), (err) => {
      if (err) {
        reject(err);
        return;
      }
      res(undefined);
    });
  });
};
