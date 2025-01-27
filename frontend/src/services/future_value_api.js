export const getFutureValue = async (data) => {
  try {
    const response = await fetch(
      "http://127.0.0.1:5000/api/investment/future-value",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error("Error calculating investment value.");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error("An error occurred while processing your request.");
  }
};
