import {StateStoreType} from "../app/store";

export const selectIsIsLoggedIn = (state:StateStoreType) =>state.auth.isLoggedIn