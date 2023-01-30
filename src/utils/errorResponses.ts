import { APIGatewayProxyResult } from 'aws-lambda';

export const userNotFoundResult = (userId: string): APIGatewayProxyResult => {
    return {
        statusCode: 404,
        body: JSON.stringify({
            message: `Could not find user with id ${userId}`
        })
    };
};

export const internalServerErrorResult = (error: unknown): APIGatewayProxyResult => {
    return {
        statusCode: 500,
        body: JSON.stringify({
            message: "Something went wrong",
            error: `${error}`
        })
    };
}

export const emptyRequestBodyResult = (): APIGatewayProxyResult => {
    return {
        statusCode: 400,
        body: JSON.stringify({
            message: "Request cannot have empty body"
        })
    };
}