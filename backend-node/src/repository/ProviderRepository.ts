import { injectable } from "tsyringe";
import { PossibleProviders } from "../@Types/Provider";
import prisma from "../config/prisma-client";
import { ThrowCriticalError } from "../exceptions/CriticalError";
import { CustomError } from "../exceptions/CustomError";
import HttpStatusCode from "../utils/HttpStatusCode";

@injectable()
export default class ProviderRepository {
    public getProvider = async (providerType: PossibleProviders, _provider_id: string)  => {
        try {
            // @ts-ignore
            const provider = await prisma[providerType].findUnique({
                where: {
                    [`${providerType}_id`]: _provider_id
                },
            });
            if (provider === null) {
                throw new CustomError(
                    "Provider Not Found",
                    HttpStatusCode.NOT_FOUND
                );
            }
            return provider;
        } catch (error: any) {
            throw new ThrowCriticalError(error);
        }
    }
}
