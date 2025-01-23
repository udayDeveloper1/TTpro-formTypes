import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pdfListData: [],
  pdfListingData3: [],
  PdfListData2: [],
  PdfListData4: [],
};

const userSlice = createSlice({
  name: "userSlice",
  initialState: initialState,
  reducers: {
    setPdfListData: (state, action) => {
      state.pdfListData = action.payload;
    },
    setPdfListData3: (state, action) => {
      state.pdfListingData3 = [action.payload];
    },
    setPdfListData2: (state, action) => {
      state.PdfListData2 = action.payload;
    },
    setPdfListData4: (state, action) => {
      state.PdfListData4 = action.payload;
    },
  },
});

export const { setPdfListData, setPdfListData3, setPdfListData2, setPdfListData4 } = userSlice.actions;

export default userSlice.reducer;
