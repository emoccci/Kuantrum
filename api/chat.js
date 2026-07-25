export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      hata: "Sadece POST kullanılabilir"
    });
  }

  const mesaj = req.body.mesaj;

  try {

    const cevap = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: mesaj
                }
              ]
            }
          ]
        })
      }
    );


    const veri = await cevap.json();


    if (!veri.candidates) {
      return res.status(500).json({
        cevap: "Gemini hatası: " + JSON.stringify(veri)
      });
    }


    res.status(200).json({
      cevap: veri.candidates[0].content.parts[0].text
    });


  } catch (hata) {

    res.status(500).json({
      cevap: "Sunucu hatası: " + hata.message
    });

  }

}
