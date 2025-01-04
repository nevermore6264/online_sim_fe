import { api } from "../utils/axios";

// country.js
export const GetAllCountries = async () => {
  try {
    const response = await api.get(`/api/countries`);
    const countriesData = response?.data?.data;

    // Adding dial codes and flag image URLs
    const countriesWithDialCodes = countriesData.map((country) => {
      const dialCode = getDialCode(country.code); // Function to get the dial code based on the country code

      return {
        name: country.text,
        code: country.code,
        icon: country.icon,
        flagImage: `https://flagsapi.com/${dialCode}/flat/64.png`, // Adjust as needed
      };
    });

    return countriesWithDialCodes;
  } catch (error) {
    console.error("Error fetching countries:", error);
    throw error; // Rethrow error for handling in the caller
  }
};

// Function to map country codes to dial codes
const getDialCode = (code) => {
  const dialCodes = {
    JPN: "JP",
    HKG: "HK",
    CAN: "CA",
    DEU: "DE",
    FRA: "FR",
    AUS: "AU",
    GBR: "GB",
    SGP: "SG",
    KOR: "KR",
    USA: "US",
  };

  return dialCodes[code] || "N/A"; // Default to "N/A" if not found
};
