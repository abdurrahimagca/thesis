# BU REPO AI ILE BASITCE OLUŞTURULDU CİDDİYET VE TAM FONKSİYONERLİK BEKLEMEMEK İSTEYEBİLİRSİNİZ

## 🚀 Hızlı Başlangıç

```bash
# Projeyi klonlayın
git clone https://github.com/username/turkish-thesis-generator.git
cd turkish-thesis-generator

# Kurulum
npm install

# Web arayüzünü başlatın
npm run web
# Tarayıcıda açın: http://localhost:3000
```

## 💻 Kullanım

### Web Arayüzü (Önerilen)
```bash
npm run web
```
- Modern web interface
- Form doldurma
- Canlı önizleme
- Tek tıkla indirme

### Komut Satırı
```bash
npm run init    # Örnek verilerle tez oluştur
npm run build   # PDF'e çevir (LaTeX gerekli)
```

## 📁 Çıktılar

- `output/thesis.tex` - LaTeX kaynak dosyası
- `output/thesis.pdf` - PDF dokümanı (LaTeX kuruluysa)

## 🎯 Özellikler

- ✅ **Örnek içerik**: Gerçekçi dummy data
- ✅ **Türkçe yazım kuralları**: Üniversite standartları
- ✅ **3 hazır şablon**: Yapay Zeka, Mühendislik, İşletme
- ✅ **Tablolar & şekiller**: Otomatik eklenir
- ✅ **Web interface**: Kullanımı kolay
- ✅ **PDF çıktısı**: LaTeX ile profesyonel

## 📋 İçerik

Oluşturulan tez şunları içerir:

- **Kapak sayfaları** (dış/iç)
- **Önsöz** ve **İçindekiler**
- **Özet** (Türkçe/İngilizce)
- **5 ana bölüm** (Giriş, Kuramsal Temeller, Malzeme-Yöntem, Bulgular, Sonuç)
- **Tablolar** ve **şekiller** (performans karşılaştırma vb.)
- **Kaynaklar** (8 akademik kaynak)
- **Özgeçmiş**

## ⚙️ LaTeX Kurulumu (Opsiyonel)

PDF oluşturmak için LaTeX gerekli:

```bash
# Ubuntu/Debian
sudo apt-get install texlive-latex-base

# Fedora
sudo dnf install texlive-latex

# macOS
brew install --cask mactex
```

## 🛠️ Proje Yapısı

```
turkish-thesis-generator/
├── src/
│   ├── generator.js      # CLI generator
│   └── app/              # Web interface
├── templates/
│   └── thesis-template.tex
├── output/               # Oluşturulan dosyalar
└── serve.js             # Web server
```

## 📞 Katkı

1. Fork edin
2. Feature branch oluşturun
3. Commit edin
4. Pull request gönderin

## 📄 Lisans

MIT

---

**💡 İpucu**: Web arayüzünde "Örnek Veri Yükle" butonunu kullanarak hızlıca başlayın!