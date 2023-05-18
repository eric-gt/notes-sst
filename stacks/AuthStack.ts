import * as iam from "aws-cdk-lib/aws-iam";
import { Cognito, use, App } from "sst/constructs";
import { Construct } from "constructs";
import { StorageStack } from "./StorageStack";
import { ApiStack, StackConstruct } from "./ApiStack";

export function AuthStack(config: { stack: StackConstruct; app: App }): {
  auth: Cognito;
} {
  const { stack, app } = config;
  const { bucket } = use(StorageStack);
  const { api } = use(ApiStack);

  const auth = new Cognito(stack, "Auth", {
    login: ["email"],
  });

  auth.attachPermissionsForAuthUsers(stack, [
    api,
    new iam.PolicyStatement({
      actions: ["s3:*"],
      effect: iam.Effect.ALLOW,
      resources: [
        bucket.bucketArn + "/private/${cognito-identity.amazon.aws.com:sub}/*",
      ],
    }),
  ]);

  stack.addOutputs({
    Region: app.region,
    UserPoolId: auth.userPoolId,
    IdentityPoolId: auth.cognitoIdentityPoolId,
    UserPoolClientId: auth.userPoolClientId,
  });

  return { auth };
}
