// src/api/personalize.js
import axios from "axios";

export async function getRecommendations(userId) {
  const url = process.env.REACT_APP_PERSONALIZE_API; // e.g. https://xxx.execute-api.us-east-1.amazonaws.com/prod/recommend
  const recommenderArn = process.env.REACT_APP_RECOMMENDER_ARN; // your ARN

  const response = await axios.post(url, { userId, recommenderArn });
  return response.data; // array of { itemId, score, productName?, price? }
}
