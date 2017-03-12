import { SHOW_FEEDBACK, HIDE_FEEDBACK } from '../actions/actions'; 

let initialState = false

export default (state=initialState,action) => {
    switch(action.type){
        case SHOW_FEEDBACK:
            return true;
        case HIDE_FEEDBACK:
            return false;
        default:
            return state;
    }
}



