import http from 'http';

export const nodeRequest = async (
  options: http.RequestOptions & {
    body?: any
  },
) => {
  return new Promise<(string | Buffer)[]>((resolve, reject) => {
    const req = http.request(options, (res) => {
      const data: (string | Buffer)[] = [];

      res.on('data', (chunk) => {
        data.push(chunk);
      });

      res.on('error', (err) => {
        reject(err);
      });

      res.on('end', () => {
        resolve(data);
      });
    });

    if (options.body) {
      req.write(options.body);
    }

    req.on('error', (e) => {
      reject(e);
    });
    req.end();
  });
};
