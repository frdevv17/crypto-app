export const initialState = {name: "rjregfer"}
const reducer = (state, action) => {
    if (action.type === "UPDATE_NAME") {
        return {
            ...state,
            name: action.payload
        }
    }
    return state
}
export default reducer