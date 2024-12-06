import express from 'express';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import cors from 'cors';
import schema  from "./schema.js";

const PORT = 4000;

const app = express();

const server = createServer(app);

app.use('/graphql',cors())


const wsServer = new WebSocketServer({
  server,
  path: '/graphql',
});

useServer({ 
  schema ,
  context: async (ctx, msg, args) => {
    const {username, recipient} = ctx.connectionParams
    return {username, recipient}
  },
  onConnect: (ctx) => {
    console.log('Client connected:', ctx.connectionParams.username);
  }
}, wsServer);

server.listen(PORT, () => {
  console.log(`Subscriptions ready at ws://localhost:${PORT}/graphql`);
});