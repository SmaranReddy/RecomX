import axios from "axios";

export async function getRecommendations(userId) {
  const url = process.env.REACT_APP_PERSONALIZE_API;
  const recommenderArn = process.env.REACT_APP_RECOMMENDER_ARN;

  console.log("API URL:", url);
  console.log("ARN:", recommenderArn);
  console.log("UserID:", userId);

  try {
    const response = await axios.post(url, { userId, recommenderArn });
    console.log("API response data:", response.data);
    return response.data;
  } catch (err) {
    console.error("API error:", err.response?.data || err.message);
    throw err;
  }
}
