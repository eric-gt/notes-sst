import AWS from "aws-sdk";
export type GetItemInput = AWS.DynamoDB.DocumentClient.GetItemInput;
export type PutItemInput = AWS.DynamoDB.DocumentClient.PutItemInput;
export type QueryInput = AWS.DynamoDB.DocumentClient.QueryInput;
export type UpdateItemInput = AWS.DynamoDB.DocumentClient.UpdateItemInput;
export type DeleteItemInput = AWS.DynamoDB.DocumentClient.DeleteItemInput;

const {} = AWS.DynamoDB.DocumentClient;

const client = new AWS.DynamoDB.DocumentClient();
const dynamoDB = {
  get: (params: GetItemInput) => client.get(params).promise(),
  put: (params: PutItemInput) => client.put(params).promise(),
  query: (params: QueryInput) => client.query(params).promise(),
  update: (params: UpdateItemInput) => client.update(params).promise(),
  delete: (params: DeleteItemInput) => client.delete(params).promise(),
};

export default dynamoDB;
