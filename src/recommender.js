const API_URL = "https://mkldv2fxm2.execute-api.us-east-1.amazonaws.com/recommend";
const RECOMMENDER_ARN = "arn:aws:personalize:us-east-1:497709827980:recommender/MyMLBasedEcommerceRecommenderSystem";

export async function getRecommendations(userId) {
  const resp = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      userId,
      recommenderArn: RECOMMENDER_ARN
    })
  });
  if (!resp.ok) {
    let errText = await resp.text();
    throw new Error(`API error: ${resp.status} - ${errText}`);
  }
  return resp.json();
}