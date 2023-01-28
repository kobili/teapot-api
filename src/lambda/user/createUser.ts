import { APIGatewayEvent, APIGatewayProxyHandler, Context } from "aws-lambda";
import { getDataSource } from "../../db/data-source";
import { AppUser } from "../../db/entity/AppUser";
import { v4 as uuid } from 'uuid';
import { emptyRequestBodyResult, internalServerErrorResult } from "../../utils/errorResponses";

interface CreateUserRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

interface CreateUserResponse {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
}

export const lambdaHandler: APIGatewayProxyHandler = async (event: APIGatewayEvent, context: Context) => {
    console.log(`Received event: ${JSON.stringify(event)}`);
    if (event.body === null) {
        return emptyRequestBodyResult();
    }

    const requestBody = JSON.parse(event.body) as CreateUserRequest;

    const dataSource = getDataSource();

    try {
        await dataSource.initialize();

        const userRepo = dataSource.getRepository(AppUser);
    
        const newUser = newUserFactory(requestBody.firstName, requestBody.lastName, requestBody.email);
        await userRepo.save(newUser);
        console.log(`Created new user: ${JSON.stringify(newUser)}`);
    
        await dataSource.destroy();
    
        return {
            statusCode: 201,
            body: JSON.stringify({
                userId: newUser.userId,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email
            } as CreateUserResponse)
        };
    } catch (error) {
        return internalServerErrorResult(error);
    }
}

const newUserFactory = (firstName: string, lastName: string, email: string): AppUser => {
    const newUser = new AppUser();

    newUser.userId = uuid();
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.email = email;

    return newUser;
}