export default async (req, res) => {
  try {
    const { message, lang = 'fr' } = req.body;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{
          role: "system",
          content: `Expert mécanique automobile. Réponds en ${lang} avec 3 étapes max.`
        }, {
          role: "user",
          content: message
        }]
      })
    });

    res.status(200).json(await response.json());
  } catch (error) {
    res.status(500).json({ error: "Service temporairement indisponible" });
  }
};
