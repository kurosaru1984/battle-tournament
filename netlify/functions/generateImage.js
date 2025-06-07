exports.handler = async function (event) {
  if (event.httpMethod && event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  console.log('Image generation function called');

  // TODO: Integrate with OpenAI DALL·E API to generate an image.
  // For now, always return the placeholder image URL.

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      generatedImage: 'https://dummyimage.com/400x400/000/fff.png&text=TEST'
    })
  };
};
