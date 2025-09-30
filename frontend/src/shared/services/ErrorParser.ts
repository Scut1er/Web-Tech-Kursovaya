import { AxiosError, AxiosResponse } from "axios";

const DEFAULT_ERROR_MESSAGE: string = "Unexpected Error";

export const enum SpecialErrorMessages {
    USER_ALREADY_EXIST = "Username already exists",
}

class ErrorParser {
    public static parseAxiosError = (error: unknown): string => {
        const axiosError: AxiosError = error as AxiosError;

        if (!axiosError.response || !axiosError.response.data) {
            return DEFAULT_ERROR_MESSAGE;
        }

        const errorData: AxiosResponse["data"] = axiosError.response.data;

        if (!("detail" in errorData) || typeof errorData.detail !== "string") {
            return DEFAULT_ERROR_MESSAGE;
        }

        return errorData.detail;
    };
}

export default ErrorParser;
