

import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { getUserDetails } from 'utils/hook/userDetail';

export const getDiagnosticUser = createAsyncThunk(
  'data/fetchSomeData',
  async () => {
    const response = await getUserDetails({"phoneNumber":"918553548534"});
    return response.data;
  }
);
