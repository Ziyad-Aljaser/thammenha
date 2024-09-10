export async function fetchExpectedPrice(carDetails) {
  // Log the payload to verify the structure
  console.log("Sending car details:", carDetails);

  try {
    const response = await fetch("https://thammenha.onrender.com/predict/ksa", { // Updated to local endpoint
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(carDetails),
    });

    // Parse the response as JSON
    const data = await response.json();

    // Check if the response was successful
    if (response.ok) {
      return data.Predicted_Price;  // Adjusted to match the backend's response structure
    } else {
      // Log the error response for debugging
      console.error("Error response:", data);
      throw new Error(data.error || "Failed to fetch expected price");
    }
  } catch (error) {
    // Log any fetch or parsing errors
    console.error("Fetch error:", error);
    throw new Error("Failed to fetch expected price. Check the input data or server configuration.");
  }
}
