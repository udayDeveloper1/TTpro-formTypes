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
  
  // Example Usage
  const inputDate = "2025-01-22"; // Input date (ISO format or Date object)
  const formattedDate = formatDateToDDMMYYYY(inputDate);
  