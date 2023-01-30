import { LambdaIntegration, LambdaRestApi } from "aws-cdk-lib/aws-apigateway";
import { Duration, Stack } from "aws-cdk-lib";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Architecture, Runtime } from "aws-cdk-lib/aws-lambda";
import path = require("path");

export const addUserGateway = (stack: Stack, rootApiGateway: LambdaRestApi) => {
    const userGateway = rootApiGateway.root.addResource('user');
    const userIdPath = userGateway.addResource('{userId}');

    // GET /user/{userId}
    userIdPath.addMethod('GET', getUserLambdaIntegration(stack));

    // POST /user
    userGateway.addMethod('POST', createUserLambdaIntegration(stack));

    // PUT /user/{userId}
    userIdPath.addMethod('PUT', updateUserLambdaIntegration(stack))

    // DELETE /user/{userId}
    userIdPath.addMethod('DELETE', deleteUserLambdaIntegration(stack));
}

const getUserLambdaIntegration = (stack: Stack): LambdaIntegration => {
    const getUserHandler = lambdaHandlerFactory(stack, 'getUserHandler', path.join(__dirname, `../../src/lambda/user/getUser.ts`));
    return new LambdaIntegration(getUserHandler);
}

const createUserLambdaIntegration = (stack: Stack): LambdaIntegration => {
    const createUserHandler = lambdaHandlerFactory(stack, 'createUserHandler', path.join(__dirname, `../../src/lambda/user/createUser.ts`));
    return new LambdaIntegration(createUserHandler);
}

const updateUserLambdaIntegration = (stack: Stack): LambdaIntegration => {
    const updateUserHandler = lambdaHandlerFactory(stack, 'updateUserHandler', path.join(__dirname, `../../src/lambda/user/updateUser.ts`));
    return new LambdaIntegration(updateUserHandler);
}

const deleteUserLambdaIntegration = (stack: Stack): LambdaIntegration => {
    const deleteUserHandler = lambdaHandlerFactory(stack, 'deleteUserHandler', path.join(__dirname, `../../src/lambda/user/deleteUser.ts`));
    return new LambdaIntegration(deleteUserHandler);
}

const lambdaHandlerFactory = (stack: Stack, awsId: string, sourceFile: string) => {
    return new NodejsFunction(stack, awsId, {
        runtime: Runtime.NODEJS_16_X,
        entry: sourceFile,
        handler: 'lambdaHandler',
        timeout: Duration.seconds(30),
        architecture: Architecture.ARM_64,  // CHANGE THIS DEPENDING ON LOCAL MACHINE,
        bundling: {
            externalModules: ['pg-native']
        }
    });
}