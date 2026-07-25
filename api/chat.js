export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      hata: "Sadece POST kullanılabilir"
    });
  }

  const mesaj = req.body.mesaj;

  try {

    const cevap = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + process.env.OPENAI_API_KEY
      },

      body: JSON.stringify({

        model: "gpt-4o-mini",

        messages: [
          {
            role: "system",
            content: "Sen Kuantrum adlı Türkçe konuşan yardımsever bir yapay zekasın."
          },
          {
            role: "user",
            content: mesaj
          }
        ]

      })

    });


    const veri = await cevap.json();


    if (!veri.choices) {
      return res.status(500).json({
        cevap: "Yapay zeka cevap veremedi 🤖"
      });
    }


    res.status(200).json({
      cevap: veri.choices[0].message.content
    });


  } catch (hata) {


    res.status(500).json({
      cevap: "Hata: " + hata.message
    });


  }

}
