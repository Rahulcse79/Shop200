import {

    CREATE_STORE_SETUP_REQUEST,
    CREATE_STORE_SETUP_SUCCESS,
    CREATE_STORE_SETUP_FAIL,
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
export const createStoreReducer = (state = { seller: {} }, { type, payloadStoreData }) => {

    switch (type) {
        case CREATE_STORE_SETUP_REQUEST:
            return {
                loading: true,
            };
        case CREATE_STORE_SETUP_SUCCESS:
            return {
                ...state,
                loading: false,
                payloadStoreData: payloadStoreData,
            };
        case CREATE_STORE_SETUP_FAIL:
            return {
                ...state,
                loading: false,
                payloadStoreData: null,
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

// Bank account reducer.
export const bankAccountReducer = (state = { seller: {} }, { type, bankAccountData }) => {

    switch (type) {
        case BANK_ACCOUNT_SETUP_REQUEST:
            return {
                loading: true,
            };
        case BANK_ACCOUNT_SETUP_SUCCESS:
            return {
                ...state,
                loading: false,
                bankAccountData: bankAccountData,
            };
        case BANK_ACCOUNT_SETUP_FAIL:
            return {
                ...state,
                loading: false,
                bankAccountData: null,
                error: bankAccountData,
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
export const businessInformationReducer = (state = { seller: {} }, { type, businessInfoData }) => {

    switch (type) {
        case BUSINESS_INFORMATION_SETUP_REQUEST:
            return {
                loading: true,
            };
        case BUSINESS_INFORMATION_SETUP_SUCCESS:
            return {
                ...state,
                loading: false,
                businessInfoData: businessInfoData,
            };
        case BUSINESS_INFORMATION_SETUP_FAIL:
            return {
                ...state,
                loading: false,
                businessInfoData: null,
                error: businessInfoData,
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
export const documentUploadReducer = (state = { seller: {} }, { type, documentUploadData }) => {

    switch (type) {
        case DOCUMENT_UPLOAD_SETUP_REQUEST:
            return {
                loading: true,
            };
        case DOCUMENT_UPLOAD_SETUP_SUCCESS:
            return {
                ...state,
                loading: false,
                documentUploadData: documentUploadData,
            };
        case DOCUMENT_UPLOAD_SETUP_FAIL:
            return {
                ...state,
                loading: false,
                documentUploadData: null,
                error: documentUploadData,
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
export const verificationReducer = (state = { seller: {} }, { type, verificationData }) => {

    switch (type) {
        case VERIFICATION_SETUP_REQUEST:
            return {
                loading: true,
            };
        case VERIFICATION_SETUP_SUCCESS:
            return {
                ...state,
                loading: false,
                verificationData: verificationData,
            };
        case VERIFICATION_SETUP_FAIL:
            return {
                ...state,
                loading: false,
                verificationData: null,
                error: verificationData,
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