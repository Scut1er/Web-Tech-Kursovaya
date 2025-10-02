import {
    FormValidationsFieldsIds,
    IValidationConfig,
    IValidationErrors,
    IValidationValues,
} from "@shared/hooks/useFormValidation";

export interface IRouteData {
    id: string;
    path: string;
}

export const routesData = {
    AUTHORIZATION: {
        id: "authorization",
        path: "/authorization",
    },
    LOBBY: {
        id: "lobby",
        path: "/lobby",
    },
    ROOM: {
        id: "room",
        path: "/room",
    },
};

export type TApiMethods = "get" | "post" | "delete" | "put";

export const routesDataList: IRouteData[] = [
    {
        ...routesData.AUTHORIZATION,
    },
    {
        ...routesData.LOBBY,
    },
    {
        ...routesData.ROOM,
    },
];

export const enum ApiEndpoints {
    ITEMS = "items",
    ROOMS = "rooms",
    ROOM_CREATE = "rooms/create",
    ROOM_JOIN = "rooms/join",
    ROOMS_MY = "rooms/my",
    REGISTRATION = "auth/register",
    SIGN_IN = "auth/login",
    SIGN_OUT = "auth/logout",
    TOGGLE = "toggle",
    UNDO = "undo",
    AI_RECIPES = "ai/recipes",
}

export const enum ValidationErrors {
    VERIFICATION_CODE = "Verification code must be 6 digits long and contain only numbers.",
    EMAIL = "Enter a valid email address. It must contain only allowed characters and include an '@' and domain.",
    PASSWORD = "Password must be at least 8 characters long and include one uppercase letter, one number, and one special character.",
    CONFIRM_PASSWORD = "Confirmation password must match the password and follow the same rules.",
    USERNAME = "Username must be 3–20 characters long and contain only letters, numbers, underscores, or periods.",
}

export const enum NotificationsSeverityTypes {
    SUCCESS = "success",
    INFO = "info",
    WARN = "warn",
    ERROR = "error",
    SECONDARY = "secondary",
    CONTRAST = "contrast",
}

const PASSWORD_REGEX: RegExp =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{}|;:',.<>/?`~"\\]).{8,}$/;
const EMAIL_REGEX: RegExp =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
const VERIFICATION_CODE_REGEX: RegExp = /^[0-9]{6}$/;
const USERNAME_REGEX: RegExp = /^[a-zA-Z0-9_.]{3,20}$/;
const ROOM_NAME_REGEX: RegExp = /^.{1,128}$/;

export const USER_NOT_CONFIRM_VERIFICATION_CODE_ERROR_MESSAGE: string =
    "User needs to be authenticated to call this API.";

export const SHOW_NOTIFICATION_DELAY: number = 3000;

export const signInValidationConfig: IValidationConfig = {
    idList: [
        FormValidationsFieldsIds.USERNAME,
        FormValidationsFieldsIds.PASSWORD,
    ],
    isConfirmPassword: false,
};

export const signUpValidationConfig: IValidationConfig = {
    idList: [
        FormValidationsFieldsIds.USERNAME,
        FormValidationsFieldsIds.PASSWORD,
    ],
    isConfirmPassword: false,
};

const isValidVerificationCode = (verificationCode: string): boolean => {
    return VERIFICATION_CODE_REGEX.test(verificationCode);
};

const isValidEmail = (email: string): boolean => {
    return EMAIL_REGEX.test(email);
};

const isValidPassword = (password: string): boolean => {
    return PASSWORD_REGEX.test(password);
};

const isValidUsername = (username: string): boolean => {
    return USERNAME_REGEX.test(username);
};

export const isValidRoomName = (roomName: string): boolean => {
    return ROOM_NAME_REGEX.test(roomName);
};

export const enum NotificationsMessages {
    ITEMS_LOADED = "Items successfully loaded!",
    ROOM_CREATED = "Room successfully created!",
    ROOM_JOINED = "You have joined the room!",
    ROOM_DELETED = "You have deleted the room!",
    ROOMS_FETCHED = "Your rooms have been loaded!",
    USER_REGISTERED = "Registration successful! Please, Sign In!",
    ALREADY_REGISTERED = "You already registered, please Sign In!",
    USER_SIGNED_IN = "Signed in successfully!",
    USER_SIGNED_OUT = "Signed out successfully!",
    TOGGLE_SUCCESS = "Toggled successfully!",
    UNDO_SUCCESS = "Action undone successfully!",
    AI_RECIPES_GENERATED = "AI recipes generated successfully!",
    ITEM_DELETED = "Item successfully deleted!",
    ITEM_PURCHASED_TOGGLED = "Item purchase status successfully toggled!",
    ROOM_NOT_LOADED = "Room not loaded!",
}

export const validationActionsConfig: Record<
    FormValidationsFieldsIds,
    (query: string) => boolean
> = {
    [FormValidationsFieldsIds.VERIFICATION_CODE]: isValidVerificationCode,
    [FormValidationsFieldsIds.EMAIL]: isValidEmail,
    [FormValidationsFieldsIds.PASSWORD]: isValidPassword,
    [FormValidationsFieldsIds.CONFIRM_PASSWORD]: isValidPassword,
    [FormValidationsFieldsIds.USERNAME]: isValidUsername,
};

export const DEFAULT_FADE_DURATION: number = 400;

export const checkFormValidity = (
    formValues: IValidationValues,
    errors: IValidationErrors
): boolean => {
    return !Object.entries(formValues).some((formValue) => {
        const [key, value] = formValue;

        return errors[key] || !value;
    });
};
