import { Bucket, Table } from "sst/constructs";
import { Construct } from "constructs";
import { App } from "sst/constructs";

export function StorageStack(config: { stack: Construct; app: App }) {
  const { stack, app } = config;
  const bucket = new Bucket(stack, "Uploads");
  const table = new Table(stack, "Notes", {
    fields: {
      userId: "string",
      noteId: "string",
    },
    primaryIndex: { partitionKey: "userId", sortKey: "noteId" },
  });

  return { table, bucket };
}
