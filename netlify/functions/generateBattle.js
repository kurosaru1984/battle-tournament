export default async function handler(event) {
  const { charA, charB } = JSON.parse(event.body);

  const prompt = `キャラA: ${charA} と キャラB: ${charB} のトーナメントバトル実況を200文字以内で生成してください。`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 200,
    }),
  });

  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify({ result: data.choices[0].message.content }),
  };
}
