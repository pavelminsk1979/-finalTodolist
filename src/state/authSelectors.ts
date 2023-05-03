import {StateStoreType} from "./store";

export const selectIsIsLoggedIn = (state:StateStoreType) =>state.auth.isLoggedIn