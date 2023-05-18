import { Table } from "sst/node/table";
import * as uuid from "uuid";
import handler from "@notes/core/handler";
import dynamoDB, { PutItemInput } from "@notes/core/dynamodb";

export const main = handler(async (event: any) => {
  const data = JSON.parse(event.body);

  const params: PutItemInput = {
    TableName: Table.Notes.tableName,
    Item: {
      userId: event.requestContext.authorizer.iam.cognitoIdentity.identityId,
      noteId: uuid.v1(),
      content: data.content,
      attachment: data.attachment,
      createdAt: Date.now(),
    },
  };
  await dynamoDB.put(params);
  return params.Item;
});
