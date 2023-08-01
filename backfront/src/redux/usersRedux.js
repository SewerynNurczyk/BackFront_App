export const getUser = (state) => state.user;

const createActionName = (actionName) => `app/users/${actionName}`;
const LOG_IN = createActionName('LOG_IN');

export const logIn = (payload) => {
    localStorage.setItem('loggedInUser', payload.login);
    return {
        type: LOG_IN,
        payload,
    };
};

const SAVE_USER_TO_LOCAL_STORAGE = createActionName('SAVE_USER_TO_LOCAL_STORAGE');
export const saveUserToLocalStorage = () => ({
    type: SAVE_USER_TO_LOCAL_STORAGE,
});

const initialState = {
    login: localStorage.getItem('loggedInUser') || null,
    request: { pending: false, error: null, success: false },
};

const usersReducer = (statePart = initialState, action) => {
    switch (action.type) {
        case LOG_IN:
            return { ...statePart, login: action.payload.login };
        case SAVE_USER_TO_LOCAL_STORAGE:
            localStorage.setItem('loggedInUser', JSON.stringify(statePart.login));
            return statePart;
        default:
            return statePart;
    }
};

export default usersReducer;