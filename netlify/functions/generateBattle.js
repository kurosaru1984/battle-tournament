exports.handler = async function (event, context) {
  try {
    const { charA, charB } = JSON.parse(event.body);

    const prompt = `キャラA: ${charA} と キャラB: ${charB} のトーナメントバトル実況を200文字以内で生成してください。`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 200
      })
    });

    const data = await response.json();

    const content = data?.choices?.[0]?.message?.content || "⚠️ GPTからの返答が不正でした。";

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ result: content })
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ result: `❌ サーバーエラー: ${err.message}` })
    };
  }
};
