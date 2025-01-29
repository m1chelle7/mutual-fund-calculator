export const getReturnRate = async () => {
  try {
    const response = await fetch("http://127.0.0.1:5000/api/return-rate");

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log(data);

    // Convert it to a percentage (e.g., 4.75)
    const percentage = data * 100;

    return percentage;
  } catch (error) {
    throw new Error("Error fetching return rate.");
  }
};
