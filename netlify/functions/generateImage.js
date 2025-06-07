
exports.handler = async function (event) {
  if (event.httpMethod && event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  console.log('generateImage called');

  try {
    const { prompt } = JSON.parse(event.body || '{}');
    console.log('Request body parsed:', { prompt });

    if (!prompt) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Missing prompt' })
      };
    }

    console.log('Calling OpenAI with prompt:', prompt);
    const res = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({ prompt, n: 1, size: '512x512' })
    });

    console.log('OpenAI response status:', res.status);

    const data = await res.json();
    console.log('OpenAI response JSON:', data);

    const url = data?.data?.[0]?.url;
    console.log('Generated image URL:', url);

    if (!url) {
      return {
        statusCode: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Failed to generate image' })
      };
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ generatedImage: url })
    };
  } catch (err) {
    console.log('Error in generateImage:', err);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: err.message })
    };
  }
};
