import {StateStoreType} from "features/app/store";

export const selectIsInitialized = (state:StateStoreType) =>state.app.isInitialized

export const selectError = (state:StateStoreType) =>state.app.error

export const selectStatusLoading = (state:StateStoreType) =>state.app.statusLoading