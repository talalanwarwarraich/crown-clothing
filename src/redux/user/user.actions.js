import { UserActions } from "../../enums/redux/reducer-actions.enums";

export const setCurrentUser = (user) => ({
	type: UserActions.SET_CURRENT_USER,
	payload: user,
});
