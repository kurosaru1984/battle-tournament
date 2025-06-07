
exports.handler = async function (event) {
  if (event.httpMethod && event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  console.log('generateImage triggered');
  console.log('Env OPENAI_API_KEY loaded:', !!process.env.OPENAI_API_KEY);

  if (!process.env.OPENAI_API_KEY) {
    console.log('Missing OPENAI_API_KEY environment variable');
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Server configuration error' })
    };
  }

  try {
    console.log('Raw event body:', event.body);
    const { prompt } = JSON.parse(event.body || '{}');
    console.log('Request body parsed:', { prompt });

    if (!prompt) {
      console.log('No prompt provided');
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Missing prompt' })
      };
    }

    console.log('Calling OpenAI with prompt:', prompt);
    const payload = { prompt, n: 1, size: '512x512' };
    console.log('Payload sent to OpenAI:', payload);

    let res;
    try {
      res = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify(payload)
      });
    } catch (fetchErr) {
      console.log('Fetch error:', fetchErr);
      throw new Error('Failed to fetch from OpenAI');
    }

    console.log('OpenAI response status:', res.status);

    let data;
    try {
      data = await res.json();
    } catch (parseErr) {
      console.log('Error parsing JSON:', parseErr);
      throw new Error('Invalid JSON from OpenAI');
    }
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
