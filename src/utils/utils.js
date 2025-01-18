export const capitalizeFirstLetter = (value) => {
  if(typeof value === "string") return value;
    const stringValue = value?.toString(); 
    return stringValue?.charAt(0)?.toUpperCase() + stringValue?.slice(1);
  };