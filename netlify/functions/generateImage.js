exports.handler = async function(event) {
  if (event.httpMethod && event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { imageData } = JSON.parse(event.body || '{}');

    if (!imageData || typeof imageData !== 'string') {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Invalid or missing imageData' })
      };
    }

    // TODO: Integrate with OpenAI DALL·E API to generate an image.
    // For now, return a placeholder image URL.
    const generatedImage = 'https://placekitten.com/400/400';

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ generatedImage })
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: err.message })
    };
  }
};
