export default function handler(
  lambda: (event: unknown, context: unknown) => Promise<unknown>
) {
  return async function (event: unknown, context: unknown): Promise<unknown> {
    let body, statusCode;

    try {
      body = await lambda(event, context);
      statusCode = 200;
    } catch (e) {
      console.error(e);
      body = { error: (e as Error).message };
      statusCode = 500;
    }
    return {
      statusCode,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify(body),
    };
  };
}
