import * as cdk from 'aws-cdk-lib';
import { RestApi } from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';
import { addUserGateway } from './api-gateways/userGateway';

export class TeapotApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const rootApiGateway = new RestApi(this, 'teapot-api-gateway', {
      restApiName: 'teapot-api',
      deploy: true
    });

    addUserGateway(this, rootApiGateway);
  }
}
