export const capitalizeFirstLetter = (value) => {
  if(typeof value === "string") return value;
    const stringValue = value?.toString(); 
    return stringValue?.charAt(0)?.toUpperCase() + stringValue?.slice(1);
  };

  export const formatDateToDDMMYYYY = (date) => {
    const d = new Date(date);
    
    // Extract day, month, and year
    const day = String(d.getDate()).padStart(2, '0'); // Ensure two digits
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = d.getFullYear();
    
    // Format to dd/mm/yyyy
    return `${day}/${month}/${year}`;
  }

  export const links = {
    // tc type1
    importPdfTCtype1: "/importPdfTCtype1",
    tcType1Form: "/tcType1Form",
    tcType1List: "/tcType1List",
    tcType1View: "/tcType1View/:id/",
    importPdfTCtype2: "/importPdfTCtype2",
    tCTypeCropProductionList: "/tCTypeCropProductionList",
    tCTypeCropProductionForm: "/tCTypeCropProductionForm",
    importPdftCTypeCropProduction: "/importPdftCTypeCropProduction",
    tcTypeCropProductinView: "//tcTypeCropProductinView/:id/",
    tcType2View: "/tcType2View/:id/",
    tcType2Form: "/tcType2Form",
    tcType2List: "/tcType2List",
    
    scopeVerificationList: "/scopeVerificationList",
    scopeVerificationView: "/scopeVerificationView/:id/",
    scopeVerificationForm: "/scopeVerificationForm",
    importPdfScopeVerification: "/importPdfScopeVerification",

    // ------------------------------ Hemang Code -------------------------------------

    handlingTradingScTypeForm: "/handlingTradingScTypeForm",
    handlingTradingScTypeList: "/handlingTradingScTypeList",
    handlingTradingScTypeView: "/handlingTradingScTypeView/:id/",
    importPdfhandlingTradingScType: "/importPdfhandlingTradingScType",

    handlingTradingScTypeFormV3_0: "/handlingTradingScTypeForm_v3_0",
    handlingTradingScTypeListV3_0: "/handlingTradingScTypeList_v3_0",
    handlingTradingScTypeViewV3_0: "/handlingTradingScTypeView_v3_0/:id/",
    importPdfhandlingTradingScTypeV3_0: "/importPdfhandlingTradingScType_v3_0",
    // ------------------------------ Hemang Code -------------------------------------

    PdfReview: "/PdfReview",
    tcType1Form: "/tcType1Form",
  }