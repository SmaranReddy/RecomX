import axios from "axios";

export async function getRecommendations(userId) {
  const url = process.env.REACT_APP_PERSONALIZE_API;
  const recommenderArn = process.env.REACT_APP_RECOMMENDER_ARN;

  if (!url || !recommenderArn) {
    throw new Error("API URL or recommender ARN environment variables are missing!");
  }

  if (!userId) {
    throw new Error("User ID is required!");
  }

  try {
    const response = await axios.post(
      url,
      { userId, recommenderArn },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data; // Expected to be in the provided format
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to fetch recommendations.");
  }
}
