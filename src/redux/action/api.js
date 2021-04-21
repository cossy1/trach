import { createActionType } from "../../utils";

export const API_REQUEST = createActionType("API_REQUEST", "API");

export const apiRequest = meta => ({
    type: API_REQUEST.START,
    meta
});