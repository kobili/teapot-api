import { APIGatewayEvent, APIGatewayProxyHandler, Context } from "aws-lambda";
import { getDataSource } from "../../db/data-source";
import { AppUser } from "../../db/entity/AppUser";

interface UpdateUserRequest {
    firstName: string;
    lastName: string;
    email: string;
}

interface UpdateUserResponse {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
}

export const lambdaHandler: APIGatewayProxyHandler = async (event: APIGatewayEvent, context: Context) => {
    console.log(`Received event: ${JSON.stringify(event)}`);
    if (event.body === null) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: "Request cannot have empty body"
            })
        };
    }

    const userId = event.pathParameters!['userId']!;

    const requestBody = JSON.parse(event.body) as UpdateUserRequest;

    const dataSource = getDataSource();

    try {
        await dataSource.initialize();

        const userRepo = dataSource.getRepository(AppUser);
    
        const user = await userRepo.findOneBy({ userId: userId });

        if (user === null) {
            return {
                statusCode: 404,
                body: JSON.stringify({
                    message: `Could not find user with id ${userId}`
                })
            };
        }

        user.firstName = requestBody.firstName;
        user.lastName = requestBody.lastName;
        user.email = requestBody.email;
        await userRepo.save(user);
    
        await dataSource.destroy();
    
        return {
            statusCode: 201,
            body: JSON.stringify({
                userId: user.userId,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            } as UpdateUserResponse)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: "Something went wrong",
                error: error
            })
        };
    }
}