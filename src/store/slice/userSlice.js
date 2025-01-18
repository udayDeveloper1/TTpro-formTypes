import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pdfListData: [],
  pdfListingData3: [],
  PdfListData2: [],
};

const userSlice = createSlice({
  name: "userSlice",
  initialState: initialState,
  reducers: {
    setPdfListData: (state, action) => {
      state.pdfListData = action.payload;
    },
    setPdfListData3: (state, action) => {
      console.log(action.payload);

      state.pdfListingData3 = [action.payload];
      console.log(state.pdfListingData3);
    },
    setPdfListData2: (state, action) => {
      console.log(action.payload);
      state.PdfListData2 = action.payload;
      console.log(state.PdfListData2);
    },
  },
});

export const { setPdfListData, setPdfListData3, setPdfListData2 } = userSlice.actions;

export default userSlice.reducer;
