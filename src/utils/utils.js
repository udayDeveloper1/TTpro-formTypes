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
    handlingTradingScTypeForm: "/handlingTradingScTypeForm",
    handlingTradingScTypeList: "/handlingTradingScTypeList",
    handlingTradingScTypeView: "/handlingTradingScTypeView/:id/",
    importPdfhandlingTradingScType: "/importPdfhandlingTradingScType",
    PdfReview: "/PdfReview",
    tcType1Form: "/tcType1Form",
  }