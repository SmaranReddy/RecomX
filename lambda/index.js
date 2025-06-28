const { PersonalizeRuntimeClient, GetRecommendationsCommand } = require("@aws-sdk/client-personalize-runtime");
const products = require('./products.json');

const client = new PersonalizeRuntimeClient({ region: "us-east-1" });

exports.handler = async (event) => {
  try {
    let body = event.body;
    if (typeof body === "string") body = JSON.parse(body);

    const userId = body.userId;
    const recommenderArn = body.recommenderArn;

    if (!userId || !recommenderArn) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Missing userId or recommenderArn" }),
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*"
        }
      };
    }

    const command = new GetRecommendationsCommand({
      recommenderArn,
      userId,
      numResults: 6
    });

    const result = await client.send(command);

    const enriched = (result.itemList || []).map(item => ({
      itemId: item.itemId,
      score: item.score,
      ...products[item.itemId]
    }));

    return {
      statusCode: 200,
      body: JSON.stringify(enriched),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*"
      }
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: e.message }),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*"
      }
    };
  }
};