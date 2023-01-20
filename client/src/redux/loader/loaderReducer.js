import {
   LOADER_START, LOADER_END
} from "./actionTypes"



const initialState = {
    isLoading: false,
    progress:0
}

export const loaderReducer = (state = initialState, {
    type,
    payload
}) => {
    switch (type) {
        case LOADER_START:
            return {
                isLoading: true,
                progress:100
            }
            case LOADER_END:
                return {
                    isLoading: false,
                    progress:0
                }

             default:
                 return state

    }
}