import ReducerProps from '../../types/Utils/ReducerProps';
import * as constant from './constants';

const initialState = {
    stores: [],
    selected: null,
    data: null,
    error: null,
};

const storeReducer = (history:any) => (state = initialState, action: ReducerProps) => {
    
    switch (action.type) {
        case constant.FETCH_STORES:
            return { 
                ...state,
                error: null 
            };
        case constant.FETCH_STORES_SUCCESS:
            return { 
                ...state,
                stores: action.data 
            };
        case constant.FETCH_STORES_FAILED:
            return { 
                ...state,
                error: action.error 
            };
        
        case constant.SELECT_STORE:
            return {
                ...state,
                selected: action.data
            }

        default:
            return state;
    }
};

export default storeReducer;