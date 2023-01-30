import { Duration, Stack } from "aws-cdk-lib";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Architecture, Runtime } from "aws-cdk-lib/aws-lambda";

export const lambdaHandlerFactory = (stack: Stack, awsId: string, sourceFile: string) => {
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