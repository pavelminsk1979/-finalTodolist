import {createAsyncThunk} from "@reduxjs/toolkit";
import {DispatchType, StateStoreType} from "../state/store";

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
   state:StateStoreType
   dispatch:DispatchType
rejectValue: null
}>()