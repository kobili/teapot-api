import { LambdaIntegration, LambdaRestApi } from "aws-cdk-lib/aws-apigateway";
import { Duration, Stack } from "aws-cdk-lib";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import path = require("path");

export const addUserGateway = (stack: Stack, rootApiGateway: LambdaRestApi) => {
    const userGateway = rootApiGateway.root.addResource('user');

    // POST /user
    userGateway.addMethod('POST', createUserLambdaIntegration(stack));
}

const createUserLambdaIntegration = (stack: Stack): LambdaIntegration => {
    const createUserHandler = new NodejsFunction(stack, 'createUserHandler', {
        runtime: Runtime.NODEJS_16_X,
        entry: path.join(__dirname, `../../src/lambda/user/createUser.ts`),
        handler: 'lambdaHandler',
        timeout: Duration.seconds(30)
    });

    return new LambdaIntegration(createUserHandler);
}