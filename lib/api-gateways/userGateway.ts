import { LambdaIntegration, LambdaRestApi } from "aws-cdk-lib/aws-apigateway";
import { Stack } from "aws-cdk-lib";
import path = require("path");
import { lambdaHandlerFactory } from "../../src/utils/lambdaHandlerFactory";

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
    const getUserHandler = lambdaHandlerFactory(
        stack,
        'getUserHandler',
        path.join(__dirname, `../../src/lambda/user/getUser.ts`),
        'lambdaHandler'
    );
    return new LambdaIntegration(getUserHandler);
}

const createUserLambdaIntegration = (stack: Stack): LambdaIntegration => {
    const createUserHandler = lambdaHandlerFactory(
        stack,
        'createUserHandler',
        path.join(__dirname, `../../src/lambda/user/createUser.ts`),
        'lambdaHandler'
    );
    return new LambdaIntegration(createUserHandler);
}

const updateUserLambdaIntegration = (stack: Stack): LambdaIntegration => {
    const updateUserHandler = lambdaHandlerFactory(
        stack,
        'updateUserHandler',
        path.join(__dirname, `../../src/lambda/user/updateUser.ts`),
        'lambdaHandler'
    );
    return new LambdaIntegration(updateUserHandler);
}

const deleteUserLambdaIntegration = (stack: Stack): LambdaIntegration => {
    const deleteUserHandler = lambdaHandlerFactory(
        stack,
        'deleteUserHandler',
        path.join(__dirname, `../../src/lambda/user/deleteUser.ts`),
        'lambdaHandler'
    );
    return new LambdaIntegration(deleteUserHandler);
}

