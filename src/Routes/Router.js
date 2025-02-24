import { createBrowserRouter } from "react-router-dom";

import PdfReview from "../pages/PdfReview";

// import ImportPdfTCtype2 from "../pages/Form2/ImportPdfTCtype2";
// import TcType2Form from "../pages/Form2/TcType2Form";
// import TcType2View from "../pages/Form2/TcType2View";
// import TcType2List from "../pages/Form2/TcType2List";

import ImportPdfScopeVerification from "../pages/3Form/ImportPdfScopeVerification";
import ScopeVerificationForm from "../pages/3Form/ScopeVerificationForm";
import ScopeVerificationList from "../pages/3Form/ScopeVerificationList";
import ScopeVerificationView from "../pages/3Form/ScopeVerificationView";

// import ImportHandlingForm from "../pages/Form5/HandleForm";
// import ImportHandlingFormList from "../pages/Form5/HandleFormList";
// import ImportHandleFormView from "../pages/Form5/HandleFormView";
// import ImportPdfHandleForm from "../pages/Form5/ImportPdfHandleForm";

import TcType1Form from "../pages/1Form/TcType1Form";
import TcType1View from "../pages/1Form/TcType1View";
import TcType1List from "../pages/1Form/TcType1List";
import ImportPdfTCtype1 from "../../src/pages/1Form/ImportPdfTCtype1";

// import TCTypeCropProductionForm from "../pages/Form4/TCTypeCropProductionForm";
// import TCTypeCropProductionList from "../pages/Form4/TCTypeCropProductionList";
// import TcTypeCropProductinView from "../pages/Form4/TcTypeCropProductinView";
// import ImportPdfScopeProduction from "../pages/Form4/ImportPdfCropProduction";

// ------------------------------------- Hemang Router v3.0 ----------------------------------------

import ScopeVerificationFormV3 from "../pages/3FormV3.0/ScopeVerificationFormV3";
import ScopeVerificationListV3 from "../pages/3FormV3.0/ScopeVerificationListV3";
import ImportPdfScopeVerificationV3 from "../pages/3FormV3.0/ImportPdfScopeVerificationV3";
import ScopeVerificationViewV3 from "../pages/3FormV3.0/ScopeVerificationViewV3";





import { links } from "../utils/utils";
// import TCTypeCropProductionList from '../pages/TCTypeCropProductionList'

export const router = createBrowserRouter([
  {
    // "/importPdfTCtype1"
    path: links.importPdfTCtype1,
    Component: ImportPdfTCtype1,
  },
  {
    // path: "/tcType1Form",
    path: links.tcType1Form,
    Component: TcType1Form,
  },
  {
    // path: "/tcType1List",
    path: links.tcType1List,
    Component: TcType1List,
  },
  {
    // path: "/tcType1View/:id/",
    path: links.tcType1View,
    Component: TcType1View,
  },
  // {
  //   // path: "/importPdfTCtype2",
  //   path: links.importPdfTCtype2,
  //   Component: ImportPdfTCtype2,
  // },
  // {
  //   // path: "/tCTypeCropProductionList",
  //   path: links.tCTypeCropProductionList,
  //   Component: TCTypeCropProductionList,
  // },

  // {
  //   // path: "/tcType2Form",
  //   path: links.tcType2Form,
  //   Component: TcType2Form,
  // },
  // {
  //   // path: "/tCTypeCropProductionForm",
  //   path: links.tCTypeCropProductionForm,
  //   Component: TCTypeCropProductionForm,
  // },
  // {
  //   // path: "/importPdftCTypeCropProduction",
  //   path: links.importPdftCTypeCropProduction,
  //   Component: ImportPdfScopeProduction,
  // },
  // {
  //   // path: "/tcTypeCropProductinView/:id/",
  //   path: links.tcTypeCropProductinView,
  //   Component: TcTypeCropProductinView,
  // },
  // {
  //   // path: "/tcType2View/:id/",
  //   path: links.tcType2View,
  //   Component: TcType2View,
  // },
  // {
  //   // path: "/tcType2List",
  //   path: links.tcType2List,
  //   Component: TcType2List,
  // },
  
  {
    // path: "/scopeVerificationList",
    path: links.scopeVerificationList,
    Component: ScopeVerificationList,
  },
  {
    // path: "/scopeVerificationView/:id/",
    path: links.scopeVerificationView,
    Component: ScopeVerificationView,
  },

  {
    // path: "/scopeVerificationForm",
    path: links.scopeVerificationForm,
    Component: ScopeVerificationForm,
  },
  {
    // path: "/importPdfScopeVerification",
    path: links.importPdfScopeVerification,
    Component: ImportPdfScopeVerification,
  },


  // --------------------------------- Hemang router start -----------------------------------

  // {
  //   // path: "/handlingTradingScTypeForm",
  //   path: links.handlingTradingScTypeForm,
  //   Component: ImportHandlingForm,
  // },
  // {
  //   // path: "/handlingTradingScTypeList",
  //   path: links.handlingTradingScTypeList,
  //   Component: ImportHandlingFormList,
  // },
  // {
  //   // path: "/handlingTradingScTypeView/:id/",
  //   path: links.handlingTradingScTypeView,
  //   Component: ImportHandleFormView,
  // },
  // {
  //   // path: "/importPdfhandlingTradingScType",
  //   path: links.importPdfhandlingTradingScType,
  //   Component: ImportPdfHandleForm,
  // },

  // ---------------------------- Form version-3 ------------------------------------

  {
    // path: "/handlingTradingScTypeForm",
    path: links.handlingTradingScTypeFormV3_0,
    Component: ScopeVerificationFormV3,
  },
  {
    // path: "/handlingTradingScTypeList",
    path: links.handlingTradingScTypeListV3_0,
    Component: ScopeVerificationListV3,
  },
  {
    // path: "/handlingTradingScTypeView/:id/",
    path: links.handlingTradingScTypeViewV3_0,
    Component: ScopeVerificationViewV3,
  },
  {
    // path: "/importPdfhandlingTradingScType",
    path: links.importPdfhandlingTradingScType,
    Component: ImportPdfScopeVerificationV3,
  },

  // --------------------------------- Hemang router end -----------------------------------

  {
    path: "/PdfReview",
    path: "/PdfReview",
    Component: PdfReview,
  },
  {
    path: "/tcType1Form*",
    path: "/tcType1Form*",
    Component: TcType1Form,
  },
]);
