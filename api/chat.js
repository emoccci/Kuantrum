export default async function handler(req, res)
  if (req.method !== "POST") {
    return res.status(405).json({
      hata: "Sadece POST kullanılabilir"
    });
  }

  const mesaj = req.body.mesaj;

  // Buraya yapay zeka bağlantısı gelecek

  res.status(200).json({
    cevap: "Kuantrum düşündü 🤖: " + mesaj
  });

}
