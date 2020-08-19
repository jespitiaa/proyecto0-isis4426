import * as actionTypes from './actionTypes'

const initialState = {
    authenticate : false,
    token : '',
}

const reducer = (state = initialState, action) =>{
    switch (action.type){
        case actionTypes.AUTHENTICATE:
            return {
                ...state,
                authenticate:true,
                token:action.token,
            };
        case actionTypes.UNAUTHENTICATE:
            return {
                ...state,
                authenticate:false,
                token:"",
            };
        default:
            return state
    }
}

export default reducer;