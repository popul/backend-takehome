import fastify from 'fastify';
import { UserTaskData } from '../../share';

const server = fastify();

server.post<{
  Body: UserTaskData,
  Reply: {
    success: boolean
  }
}>('/', async (request, reply) => {
  const { uid, scheduledDate, timeZone } = request.body;
  console.log(
    `Task for user ${uid} scheduled for ${
      new Date(scheduledDate).toLocaleString("en-US", { timeZone })
    }, ${timeZone} time, received at ${
      new Date().toLocaleString("en-US")
    }`);
  reply.send({
    success: true
  })
});

(async () => {
  try {
    await server.listen(8080, "0.0.0.0")
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
})();