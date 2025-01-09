export const capitalizeFirstLetter = (value) => {
    const stringValue = value?.toString(); 
    return stringValue?.charAt(0)?.toUpperCase() + stringValue?.slice(1);
  };