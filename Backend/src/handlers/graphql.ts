// import {
//   startServerAndCreateLambdaHandler,
//   middleware,
//   handlers,
// } from '@as-integrations/aws-lambda';
//  import { ApolloServer, HeaderMap } from '@apollo/server'
  import resolvers from './resolvers';
  import typeDefs from './typedefs';

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
// });


// type CustomInvokeEvent = {
//   httpMethod: string;
//   queryParams: string;
//   headers: Record<string, string>;
//   body: string;
// };

// type CustomInvokeResult =
//   | {
//       success: true;
//       body: string;
//     }
//   | {
//       success: false;
//       error: string;
//     };

// const requestHandler = handlers.createRequestHandler<CustomInvokeEvent, CustomInvokeResult>(
//   {
//     parseHttpMethod(event) {
//       return event.httpMethod;
//     },
//     parseHeaders(event) {
//       const headerMap = new HeaderMap();
//       for (const [key, value] of Object.entries(event.headers)) {
//         headerMap.set(key, value);
//       }
//       return headerMap;
//     },
//     parseQueryParams(event) {
//       return event.queryParams;
//     },
//     parseBody(event) {
//       return event.body;
//     },
//   },
//   {
//     success({ body }) {
//       return {
//         success: true,
//         body: body.toString(),
//       };
//     },
//     error(e) {
//       if (e instanceof Error) {
//         return {
//           success: false,
//           error: e.toString(),
//         };
//       }
//       console.error('Unknown error type encountered!', e);
//       throw e;
//     },
//   },
// );

// const cookieMiddleware: middleware.MiddlewareFn<typeof requestHandler> = async (
// ) => {
//   return async (result) => {
//     // Ensure proper initialization of the cookies property on the result
//     console.log("test", result)
//     // Result is mutable so it can be updated here
//   };
// };

// export const graphqlHandler = startServerAndCreateLambdaHandler(server, requestHandler, {
//   middleware: [
//     cookieMiddleware,
//   ],
//   context: async ({ event, context }) => {
//     console.log("context", context)
//     return {
//       lambdaEvent: event,
//       lambdaContext: context,
//     };
//   },
// });


// export const graphqlHandlerSandbox = startServerAndCreateLambdaHandler(
//   server,
//   // We will be using the Proxy V2 handler
//   handlers.createAPIGatewayProxyEventV2RequestHandler(),
// );

import { ApolloServer } from '@apollo/server';
import { startServerAndCreateLambdaHandler, handlers } from '@as-integrations/aws-lambda';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export const graphqlHandler = startServerAndCreateLambdaHandler(
  server,
  handlers.createAPIGatewayProxyEventV2RequestHandler(),
);