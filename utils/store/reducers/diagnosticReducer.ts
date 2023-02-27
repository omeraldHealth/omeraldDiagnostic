import { createReducer } from '@reduxjs/toolkit';
import { getDiagnosticUser } from '../actions/diagnosticUser';

const initialState = {
  someData: null,
};

export const diagnosticReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getDiagnosticUser.fulfilled, (state, action) => {
      state.someData = action.payload;
    })
});





