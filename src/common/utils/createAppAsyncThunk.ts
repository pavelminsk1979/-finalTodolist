import {createAsyncThunk} from "@reduxjs/toolkit";
import {DispatchType, StateStoreType} from "../../features/app/store";

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
   state:StateStoreType
   dispatch:DispatchType
rejectValue: null
}>()