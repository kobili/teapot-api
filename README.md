# Teapot API

This is a CDK project that synthesizes and deploys a serverless API using AWS Lambda functions.

## Local Development

### Requirements:
- AWS CLI
- AWS CDK
- AWS SAM CLI
- Node + NPM

The repo is set up so that the docker instances launched by SAM are connected to a PostgreSQL database hosted on `localhost:5432/teapot_db` (you can see the db connection config [here](https://github.com/kobili/teapot-api/blob/main/src/db/data-source.ts))

### Launching a local API instance
- run `npm install` or `yarn install` to download dependencies
- run `cdk synth` to generate a Cloudformation Template
- run `npm run sam-run-api` or `yarn sam-run-api` to launch a local instance of the API

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template
