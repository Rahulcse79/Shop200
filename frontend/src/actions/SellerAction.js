import {
    LOGIN_SELLER_REQUEST,
    LOGIN_SELLER_SUCCESS,
    LOGIN_SELLER_FAIL,
    CLEAR_ERRORS
} from '../constants/SellerConstants';
import axios from 'axios';

// Login User
export const loginSeller = (email, password) => async (dispatch) => {
    try {

        dispatch({ type: LOGIN_SELLER_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        }

        const { data } = await axios.post(
            '/api/v1/seller/login',
            { email, password },
            config
        );

        dispatch({
            type: LOGIN_SELLER_SUCCESS,
            payload: data.seller,
        });

    } catch (error) {
        dispatch({
            type: LOGIN_SELLER_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Clear All Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};