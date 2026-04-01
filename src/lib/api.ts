import { ProjectBackendClient } from "@projectua/project-backend-client";

export const api = new ProjectBackendClient({
    baseURL: process.env.NEXT_PUBLIC_API_URL!,
});
