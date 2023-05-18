import { Table } from "sst/node/table";
import handler from "../../core/src/handler";
import dynamoDB, { DeleteItemInput } from "../../core/src/dynamodb";

export const main = handler(async (event: any) => {
  const params: DeleteItemInput = {
    TableName: Table.Notes.tableName,
    Key: {
      userId: event.requestContext.authorizer.iam.cognitoIdentity.identityId,
      noteId: event.pathParameters.id,
    },
  };

  await dynamoDB.delete(params);
  return { status: true };
});
