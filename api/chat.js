export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ hata: "Sadece POST kullanılabilir" });
  }

  const mesaj = req.body.mesaj;

  res.status(200).json({
    cevap: "Kuantrum yeni beynine bağlandı 🤖 Gelen mesaj: " + mesaj
  });
}
