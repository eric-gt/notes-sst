import { Table } from "sst/node/table";
import handler from "../../core/src/handler";
import dynamoDB, { GetItemInput } from "../../core/src/dynamodb";

export const main = handler(async (event: any) => {
  const params: GetItemInput = {
    TableName: Table.Notes.tableName,
    Key: {
      userId: event.requestContext.authorizer.iam.cognitoIdentity.identityId,
      noteId: event.pathParameters.id,
    },
  };

  const result = await dynamoDB.get(params);
  if (!result.Item) {
    throw new Error("Item not found.");
  }
  return result.Item;
});
