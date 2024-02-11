import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

export default function handler(lambda: (event: APIGatewayProxyEvent) => Promise<any>) {
  return async function (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    let body: any
    let statusCode: number
    try {
      // Run the Lambda
      body = await lambda(event)
      statusCode = 200
    } catch (e: any) {
      body = { error: e.message }
      statusCode = 500
    }
    // Return HTTP response
    return {
      statusCode,
      body: JSON.stringify(body),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
    }
  }
}