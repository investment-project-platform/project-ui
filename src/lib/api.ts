import { InvestmentPlatformSDK } from "@projectua/project-backend-client";

export const api = new InvestmentPlatformSDK({
    baseURL: process.env.NEXT_PUBLIC_API_URL!,
});
