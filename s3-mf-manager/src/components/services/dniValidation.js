export const validateDNI = async (dni) => {
    try {
      const response = await fetch(`https://api.reniec.gob.pe/validate/${dni}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error validando el DNI:", error);
      return null;
    }
  };
  