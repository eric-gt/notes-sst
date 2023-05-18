import { Table } from "sst/node/table";
import handler from "../../core/src/handler";
import dynamoDB, { UpdateItemInput } from "../../core/src/dynamodb";

export const main = handler(async (event: any) => {
  const data = JSON.parse(event.body);

  const params: UpdateItemInput = {
    TableName: Table.Notes.tableName,
    Key: {
      userId: event.requestContext.authorizer.iam.cognitoIdentity.identityId,
      noteId: event.pathParameters.id,
    },
    UpdateExpression: "SET content = :content, attachment = :attachment",
    ExpressionAttributeValues: {
      ":attachment": data.attachment || null,
      ":content": data.content || null,
    },

    ReturnValues: "ALL_NEW",
  };

  await dynamoDB.update(params);
  return { status: true };
});
