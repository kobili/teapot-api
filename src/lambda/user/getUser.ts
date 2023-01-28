import { APIGatewayEvent, APIGatewayProxyHandler, Context } from "aws-lambda";
import { getDataSource } from "../../db/data-source";
import { AppUser } from "../../db/entity/AppUser";

interface GetUserResponse {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
}

export const lambdaHandler: APIGatewayProxyHandler = async (event: APIGatewayEvent, context: Context) => {

    const userId = event.pathParameters!['userId']!;

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

        await dataSource.destroy();

        return {
            statusCode: 200,
            body: JSON.stringify({
                userId: user.userId,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            } as GetUserResponse)
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
