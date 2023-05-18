import { Table } from "sst/node/table";
import handler from "../../core/src/handler";
import dynamoDB, { QueryInput } from "../../core/src/dynamodb";

export const main = handler(async (event: any) => {
  const params: QueryInput = {
    TableName: Table.Notes.tableName,
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": event.requestContext.authorizer.iam.cognitoIdentity.identityId,
    },
  };

  const result = await dynamoDB.query(params);
  if (!result.Items) {
    throw new Error("No items found for user");
  }
  return result.Items;
});
