export const fetchMutualFunds = async () => {
  try {
    const response = await fetch("http://127.0.0.1:5000/api/mutual-funds");

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Error fetching mutual funds.");
  }
};
