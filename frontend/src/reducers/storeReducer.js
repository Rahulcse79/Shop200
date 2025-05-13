import {

    CREATE_STORE_SETUP_REQUEST,
    CREATE_STORE_SETUP_SUCCESS,
    CREATE_STORE_SETUP_FAIL,
    GET_STORE_SETUP_REQUEST,
    GET_STORE_SETUP_SUCCESS,
    GET_STORE_SETUP_FAIL,
    BANK_ACCOUNT_SETUP_REQUEST,
    BANK_ACCOUNT_SETUP_SUCCESS,
    BANK_ACCOUNT_SETUP_FAIL,
    BUSINESS_INFORMATION_SETUP_REQUEST,
    BUSINESS_INFORMATION_SETUP_SUCCESS,
    BUSINESS_INFORMATION_SETUP_FAIL,
    DOCUMENT_UPLOAD_SETUP_REQUEST,
    DOCUMENT_UPLOAD_SETUP_SUCCESS,
    DOCUMENT_UPLOAD_SETUP_FAIL,
    VERIFICATION_SETUP_REQUEST,
    VERIFICATION_SETUP_SUCCESS,
    VERIFICATION_SETUP_FAIL,
    CLEAR_ERRORS

} from '../constants/storeConstants';

// Create store reducer.
export const createStoreReducer = (state = { seller: {} }, { type, payload }) => {

    switch (type) {
        case CREATE_STORE_SETUP_REQUEST:
            return {
                loading: true,
                isCreated: false,
            };
        case CREATE_STORE_SETUP_SUCCESS:
            return {
                ...state,
                loading: false,
                isCreated: true,
            };
        case CREATE_STORE_SETUP_FAIL:
            return {
                ...state,
                loading: false,
                isCreated: false,
                error: payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

// Bank account reducer.
export const bankAccountReducer = (state = { seller: {} }, { type, payload }) => {

    switch (type) {
        case BANK_ACCOUNT_SETUP_REQUEST:
            return {
                loading: true,
            };
        case BANK_ACCOUNT_SETUP_SUCCESS:
            return {
                ...state,
                loading: false,
            };
        case BANK_ACCOUNT_SETUP_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

// Business information reducer.
export const businessInformationReducer = (state = { seller: {} }, { type, payload }) => {

    switch (type) {
        case BUSINESS_INFORMATION_SETUP_REQUEST:
            return {
                loading: true,
            };
        case BUSINESS_INFORMATION_SETUP_SUCCESS:
            return {
                ...state,
                loading: false,
            };
        case BUSINESS_INFORMATION_SETUP_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

// Document upload reducer.
export const documentUploadReducer = (state = { seller: {} }, { type, payload }) => {

    switch (type) {
        case DOCUMENT_UPLOAD_SETUP_REQUEST:
            return {
                loading: true,
            };
        case DOCUMENT_UPLOAD_SETUP_SUCCESS:
            return {
                ...state,
                loading: false,
            };
        case DOCUMENT_UPLOAD_SETUP_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

// Verification reducer.
export const verificationReducer = (state = { seller: {} }, { type, payload }) => {

    switch (type) {
        case VERIFICATION_SETUP_REQUEST:
            return {
                loading: true,
            };
        case VERIFICATION_SETUP_SUCCESS:
            return {
                ...state,
                loading: false,
            };
        case VERIFICATION_SETUP_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

// Create store reducer.
export const getStoreReducer = (state = { seller: {} }, { type, payloadStoreData }) => {

    switch (type) {
        case GET_STORE_SETUP_REQUEST:
            return {
                loading: true,
            };
        case GET_STORE_SETUP_SUCCESS:
            return {
                ...state,
                payloadStoreData: payloadStoreData,
                loading: false,
            };
        case GET_STORE_SETUP_FAIL:
            return {
                ...state,
                loading: false,
                error: payloadStoreData,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};