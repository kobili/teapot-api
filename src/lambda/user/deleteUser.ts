import { APIGatewayEvent, APIGatewayProxyHandler, APIGatewayProxyResult, Context } from "aws-lambda";
import { getDataSource } from "../../db/data-source";
import { AppUser } from "../../db/entity/AppUser";
import { internalServerErrorResult, userNotFoundResult } from "../../utils/errorResponses";

export const lambdaHandler: APIGatewayProxyHandler = async (event: APIGatewayEvent, context: Context) => {

    const userId = event.pathParameters!['userId']!;

    const dataSource = getDataSource();

    try {
        await dataSource.initialize();

        const userRepo = dataSource.getRepository(AppUser);

        const user = await userRepo.findOneBy({ userId: userId });

        if (user === null) {
            return userNotFoundResult(userId);
        }

        await userRepo.delete({ userId: userId });

        await dataSource.destroy();

        return {
            statusCode: 204
        } as APIGatewayProxyResult;
    } catch (error) {
        return internalServerErrorResult(error);
    }
}
