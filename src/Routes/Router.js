import { createBrowserRouter } from "react-router-dom";

import PdfReview from "../pages/PdfReview";

import Form3View from "../pages/ScopeVerificationView";
import Form3Table from "../pages/ScopeVerificationList";
import PdfListing2 from "../pages/PdfListing2";
import PdfListing3222 from "../pages/TcType2List";
import Form2View from "../pages/TcType2View";
import ImportPdfTCtype1 from "../pages/ImportPdfTCtype1";
import ImportPdfTCtype2 from "../pages/ImportPdfTCtype2";
import ImportPdfScopeVerification from "../pages/ImportPdfScopeVerification";
import ImportHandlingForm from "../pages/Form5/HandleForm";
import ImportHandlingFormList from "../pages/Form5/HandleFormList";
import ImportHandleFormView from "../pages/Form5/HandleFormView";



import TcType1Form from "../pages/TcType1Form";
import TcType2Form from "../pages/TcType2Form";
import ScopeVerificationForm from "../pages/ScopeVerificationForm";
import TcType1View from "../pages/TcType1View";
import TcType2View from "../pages/TcType2View";
import TcType2List from "../pages/TcType2List";
import ScopeVerificationList from "../pages/ScopeVerificationList";
import ScopeVerificationView from "../pages/ScopeVerificationView";
import TCTypeCropProductionForm from "../pages/TCTypeCropProductionForm";
import TcType1List from "../pages/TcType1List";
import TCTypeCropProductionList from "../pages/TCTypeCropProductionList";
// import TCTypeCropProductionList from '../pages/TCTypeCropProductionList'

export const router = createBrowserRouter([
  {
    path: "/importPdfTCtype1",
    Component: ImportPdfTCtype1,
  },
  {
    path: "/tcType1Form",
    Component: TcType1Form,
  },
  {
    path: "/tcType1List",
    Component: TcType1List,
  },
  {
    path: "/tcType1View/:id/",
    Component: TcType1View,
  },
  {
    path: "/importPdfTCtype2",
    Component: ImportPdfTCtype2,
  },
  {
    path: "/tCTypeCropProductionList",
    Component: TCTypeCropProductionList,
  },
  {
    path: "/tcType2Form",
    Component: TcType2Form,
  },
  {
    path: "/tCTypeCropProductionForm",
    Component: TCTypeCropProductionForm,
  },
  {
    path: "/tcType2View/:id/",
    Component: TcType2View,
  },
  {
    path: "/tcType2List",
    Component: TcType2List,
  },

  {
    path: "/scopeVerificationList",
    Component: ScopeVerificationList,
  },
  {
    path: "/scopeVerificationView/:id/",
    Component: ScopeVerificationView,
  },

  {
    path: "/scopeVerificationForm",
    Component: ScopeVerificationForm,
  },
  {
    path: "/importPdfScopeVerification",
    Component: ImportPdfScopeVerification,
  },


  // --------------------------------- Hemang router -----------------------------------

  {
    path: "/form_5_handeling",
    Component: ImportHandlingForm,
  },
  {
    path: "/form_5_handelingList",
    Component: ImportHandlingFormList,
  },
  {
    path: "/form_5_handelingView/:id/",
    Component: ImportHandleFormView,
  },

  {
    path: "/PdfReview",
    Component: PdfReview,
  },
  {
    path: "/*",
    Component: TcType1Form,
  },
]);
