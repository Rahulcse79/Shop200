import {
    LOGIN_SELLER_REQUEST,
    LOGIN_SELLER_SUCCESS,
    LOGIN_SELLER_FAIL,
    REGISTER_SELLER_REQUEST,
    REGISTER_SELLER_SUCCESS,
    REGISTER_SELLER_FAIL,
    LOAD_SELLER_REQUEST,
    LOAD_SELLER_SUCCESS,
    LOAD_SELLER_FAIL,
    LOGOUT_SELLER_SUCCESS,
    LOGOUT_SELLER_FAIL,
    CLEAR_ERRORS
} from '../constants/SellerConstants';

export const SellerReducer = (state = { seller: {} }, { type, payload }) => {
    switch (type) {
        case LOGIN_SELLER_REQUEST:
        case REGISTER_SELLER_REQUEST:
        case LOAD_SELLER_REQUEST:
            return {
                loading: true,
                isAuthenticated: false,
            };
        case LOGIN_SELLER_SUCCESS:
        case REGISTER_SELLER_SUCCESS:
        case LOAD_SELLER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                seller: payload,
            };
        case LOGOUT_SELLER_SUCCESS:
            return {
                loading: false,
                seller: null,
                isAuthenticated: false,
            };
        case LOGIN_SELLER_FAIL:
        case REGISTER_SELLER_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                seller: null,
                error: payload,
            };
        case LOAD_SELLER_FAIL:
            return {
                loading: false,
                isAuthenticated: false,
                seller: null,
                error: payload,
            }
        case LOGOUT_SELLER_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};