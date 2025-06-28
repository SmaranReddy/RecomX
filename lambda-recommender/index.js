const fs = require('fs');
const path = require('path');
const https = require('https');

const productMapping = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'product_mapping_corrected.json'), 'utf8')
);

function callPersonalize(userId, recommenderArn) {
  const data = JSON.stringify({ userId, recommenderArn });
  const options = {
    hostname: 'mkldv2fxm2.execute-api.us-east-1.amazonaws.com', // Replace if needed
    port: 443,
    path: '/recommend', // Replace if needed
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  };
  return new Promise((resolve, reject) => {
    const req = https.request(options, res => {
      let body = '';
      res.on('data', d => (body += d));
      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            resolve(JSON.parse(body));
          } catch (err) {
            reject(err);
          }
        } else {
          reject(new Error('Personalize Error: ' + body));
        }
      });
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

exports.handler = async (event) => {
  let body;
  try {
    body = typeof event.body === "string" ? JSON.parse(event.body) : event.body;
  } catch (e) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Invalid JSON in request body" })
    };
  }

  const { userId, recommenderArn } = body || {};
  if (!userId || !recommenderArn) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Missing userId or recommenderArn" })
    };
  }

  let recommendations;
  try {
    recommendations = await callPersonalize(userId, recommenderArn);
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to get recommendations", error: err.message })
    };
  }

  const enriched = recommendations.map(rec => {
    const mapped = productMapping[rec.itemId];
    return {
      ...rec,
      productName: mapped ? mapped.productName : "Unknown",
      price: mapped ? mapped.price : null,
      category: mapped ? mapped.category : null
    };
  });

  return {
    statusCode: 200,
    body: JSON.stringify(enriched)
  };
};