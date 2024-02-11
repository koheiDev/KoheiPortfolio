import schema from './schema';
// import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `src/functions/hello/handler.hello`,
  events: [
    {
      httpApi: {
        method: 'get',
        path: '/hello',
        request: {
          schemas: {
            'application/json': schema,
          },
        },
      },
    },
  ],
};
