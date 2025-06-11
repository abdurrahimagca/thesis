#!/usr/bin/env node

import fs from 'fs-extra';
import path from 'path';
import inquirer from 'inquirer';
import Mustache from 'mustache';
import chalk from 'chalk';
import { fileURLToPath } from 'url';

// ES Module için __dirname alternatifi
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Dummy data for automatic generation
const dummyData = {
  thesisTitle: "YAPAY ZEKA TABAnLı BİLGİ İŞLEME SİSTEMLERİNİN GELİŞTİRİLMESİ VE UYGULANMASI",
  authorName: "AHMET YILMAZ",
  advisorName: "Prof. Dr. MEHMET ÖZKAN",
  university: "ANKARA TEKNİK ÜNİVERSİTESİ",
  faculty: "MÜHENDİSLİK FAKÜLTESİ",
  department: "BİLGİSAYAR MÜHENDİSLİĞİ BÖLÜMÜ",
  submissionDate: "Haziran 2025",
  thesisTitleEn: "DEVELOPMENT AND APPLICATION OF ARTIFICIAL INTELLIGENCE BASED INFORMATION PROCESSING SYSTEMS",
  abstractTr: "Bu çalışmada, yapay zeka tabanlı bilgi işleme sistemlerinin geliştirilmesi ve uygulanması konusu ele alınmıştır. Modern bilgi işleme tekniklerinin analiz edilmesi, makine öğrenmesi algoritmalarının karşılaştırılması ve yeni bir hibrit yaklaşımın önerilmesi çalışmanın temel hedefleridir. Geliştirilen sistem, %87 doğruluk oranı ile başarılı sonuçlar vermiştir.",
  abstractEn: "In this study, the development and application of artificial intelligence based information processing systems has been addressed. The main objectives of the study are to analyze modern information processing techniques, compare machine learning algorithms and propose a new hybrid approach. The developed system achieved successful results with 87% accuracy rate.",
  keywordsTr: "yapay zeka, bilgi işleme, makine öğrenmesi, hibrit sistem",
  keywordsEn: "artificial intelligence, information processing, machine learning, hybrid system",
  chapters: [
    {
      number: 1,
      title: "GİRİŞ",
      isChapter3: false,
      isChapter4: false,
      sections: [
        { title: "Çalışmanın Amacı", content: "Bu çalışmanın temel amacı, yapay zeka teknolojilerini kullanarak daha etkili bilgi işleme sistemleri geliştirmektir. Modern dünyada artan veri miktarı ile birlikte, geleneksel işleme yöntemlerinin yetersiz kalması bu çalışmanın motivasyonunu oluşturmaktadır." },
        { title: "Literatür Özeti", content: "Yapay zeka alanında yapılan çalışmalar incelendiğinde, özellikle son 10 yılda makine öğrenmesi ve derin öğrenme algoritmalarında önemli gelişmeler kaydedildiği görülmektedir. Smith ve arkadaşları (2023), hibrit yaklaşımların geleneksel yöntemlere göre %25 daha iyi performans gösterdiğini rapor etmişlerdir." },
        { title: "Tezin Kapsamı", content: "Bu tez kapsamında, literatürde mevcut olan yaklaşımların analizi, yeni bir hibrit model önerisi, deneysel çalışmalar ve sonuçların değerlendirilmesi yer almaktadır. Çalışma 5 ana bölümden oluşmaktadır." }
      ]
    },
    {
      number: 2,
      title: "KURAMSAL TEMELLER",
      isChapter3: false,
      isChapter4: false,
      sections: [
        { title: "Yapay Zeka Temelleri", content: "Yapay zeka, makinelerin insan benzeri düşünme ve öğrenme yeteneklerini simüle etmeyi amaçlayan bilim dalıdır. Alan Turing'in 1950'de önerdiği Turing Testi'nden günümüze kadar olan gelişim süreci, yapay zekanın evrimini göstermektedir." },
        { title: "Makine Öğrenmesi Algoritmaları", content: "Makine öğrenmesi, bilgisayarların verilerden öğrenerek performanslarını artırmalarını sağlayan yöntemler bütünüdür. Denetimli öğrenme, denetimsiz öğrenme ve pekiştirmeli öğrenme olmak üzere üç ana kategoride incelenir." },
        { title: "Bilgi İşleme Sistemleri", content: "Modern bilgi işleme sistemleri, büyük veri setlerini analiz etmek, desenleri keşfetmek ve anlamlı bilgiler çıkarmak için tasarlanmıştır. Bu sistemler, veri ön işleme, özellik çıkarma, model eğitimi ve değerlendirme aşamalarından oluşur." }
      ]
    },
    {
      number: 3,
      title: "MALZEME VE YÖNTEM",
      isChapter3: true,
      isChapter4: false,
      sections: [
        { title: "Veri Seti", content: "Çalışmada kullanılan veri seti, 10.000 örnek ve 50 özellikten oluşmaktadır. Veri seti, çeşitli kaynaklardan toplanmış ve uygun ön işleme teknikleri uygulanmıştır. Veri setinin %70'i eğitim, %20'si test ve %10'u doğrulama için ayrılmıştır." },
        { title: "Önerilen Hibrit Model", content: "Geliştirilen hibrit model, Random Forest ve Support Vector Machine algoritmalarının kombinasyonundan oluşmaktadır. Model, ensemble learning yaklaşımı ile her iki algoritmanın avantajlarını birleştirmektedir. İlk aşamada Random Forest ile özellik seçimi yapılmakta, ikinci aşamada SVM ile sınıflandırma gerçekleştirilmektedir." },
        { title: "Değerlendirme Metrikleri", content: "Sistemin performansı, doğruluk (accuracy), kesinlik (precision), duyarlılık (recall) ve F1-score metrikleri kullanılarak değerlendirilmiştir. Ayrıca ROC eğrisi analizi ve karışıklık matrisi ile detaylı performans değerlendirmesi yapılmıştır." }
      ]
    },
    {
      number: 4,
      title: "BULGULAR VE TARTIŞMA",
      isChapter3: false,
      isChapter4: true,
      sections: [
        { title: "Deneysel Sonuçlar", content: "Önerilen hibrit model, test veri seti üzerinde %87.2 doğruluk oranı elde etmiştir. Bu sonuç, literatürdeki mevcut yaklaşımlardan %12 daha yüksektir. Model eğitimi 45 dakika sürmüş ve toplam 1000 iterasyon sonucunda yakınsama sağlanmıştır." },
        { title: "Karşılaştırmalı Analiz", content: "Geliştirilen sistem, Random Forest (%78.5), SVM (%82.3) ve Neural Network (%85.1) gibi geleneksel yöntemlerle karşılaştırılmış ve üstün performans göstermiştir. Özellikle hassasiyet ve özgüllük metrikleri açısından önemli iyileştirmeler gözlemlenmiştir." },
        { title: "İstatistiksel Analiz", content: "t-test analizi sonuçları, önerilen yöntemin istatistiksel olarak anlamlı düzeyde (p<0.05) daha iyi performans gösterdiğini kanıtlamıştır. Ayrıca 10-kat çapraz doğrulama ile model stabilitesi test edilmiş ve tutarlı sonuçlar elde edilmiştir." }
      ]
    },
    {
      number: 5,
      title: "SONUÇ VE ÖNERİLER",
      isChapter3: false,
      isChapter4: false,
      sections: [
        { title: "Sonuçlar", content: "Bu çalışmada geliştirilen yapay zeka tabanlı hibrit sistem, bilgi işleme alanında önemli bir katkı sağlamıştır. Elde edilen %87.2 doğruluk oranı, sistemin pratik uygulamalarda kullanılabilir olduğunu göstermektedir. Sistem, gerçek zamanlı veri işleme kapasitesi ile endüstriyel uygulamalar için uygun niteliktedir." },
        { title: "Gelecek Çalışmalar", content: "Gelecek çalışmalarda, derin öğrenme algoritmalarının da hibrit modele entegre edilmesi, farklı veri setleri üzerinde test edilmesi ve gerçek zamanlı uygulamalar geliştirilmesi planlanmaktadır. Ayrıca model optimizasyonu ve hesaplama karmaşıklığının azaltılması üzerinde çalışılacaktır." }
      ]
    }
  ],
  personalInfo: {
    birthPlace: "Ankara",
    birthDate: "15.03.1998",
    email: "ahmet.yilmaz@email.com",
    education: [
      { year: "2020-2024", level: "Lisans", department: "Bilgisayar Mühendisliği", school: "Ankara Teknik Üniversitesi" },
      { year: "2016-2020", level: "Lise", school: "Ankara Fen Lisesi" }
    ],
    experience: [
      { year: "2023-2024", position: "Yazılım Geliştirici Stajyeri", company: "TechnoSoft A.Ş." }
    ]
  }
};

class ThesisGenerator {
  constructor() {
    this.templatePath = path.join(__dirname, '..', 'templates');
    this.outputPath = path.join(__dirname, '..', 'output');
  }

  async init() {
    console.log(chalk.blue.bold('\n🎓 Turkish Thesis Generator'));
    console.log(chalk.gray('LaTeX tez şablonu oluşturuluyor...\n'));

    try {
      // Create output directory
      await fs.ensureDir(this.outputPath);

      // Ask user if they want to use dummy data or provide their own
      const { useDefaults } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'useDefaults',
          message: 'Örnek verilerle tez oluşturulsun mu?',
          default: true
        }
      ]);

      let data;
      if (useDefaults) {
        data = dummyData;
        console.log(chalk.green('✓ Örnek veriler kullanılıyor...\n'));
      } else {
        data = await this.collectUserData();
      }

      // Generate thesis
      await this.generateThesis(data);
      
      console.log(chalk.green.bold('\n✅ Tez başarıyla oluşturuldu!'));
      console.log(chalk.yellow(`📁 Dosyalar: ${this.outputPath}`));
      console.log(chalk.blue('🔧 PDF oluşturmak için: npm run build'));
      
    } catch (error) {
      console.error(chalk.red('❌ Hata:', error.message));
      process.exit(1);
    }
  }

  async collectUserData() {
    const questions = [
      { type: 'input', name: 'thesisTitle', message: 'Tez başlığı:' },
      { type: 'input', name: 'authorName', message: 'Yazar adı:' },
      { type: 'input', name: 'advisorName', message: 'Danışman adı:' },
      { type: 'input', name: 'university', message: 'Üniversite:' },
      { type: 'input', name: 'faculty', message: 'Fakülte:' },
      { type: 'input', name: 'department', message: 'Bölüm:' }
    ];

    const answers = await inquirer.prompt(questions);
    
    // Use dummy data for complex sections, but allow basic info customization
    return {
      ...dummyData,
      ...answers,
      submissionDate: new Date().toLocaleDateString('tr-TR', { year: 'numeric', month: 'long' })
    };
  }

  async generateThesis(data) {
    // Load and process template
    const templateContent = await fs.readFile(
      path.join(__dirname, '..', 'templates', 'thesis-template.tex'), 
      'utf8'
    );

    // Clean data from HTML entities
    const cleanData = this.cleanHtmlEntities(data);

    // Render template with data
    const renderedContent = Mustache.render(templateContent, cleanData);

    // Write generated files
    await fs.writeFile(
      path.join(this.outputPath, 'thesis.tex'), 
      renderedContent
    );

    // Copy additional files if needed
    await this.copyAssets();
  }

  cleanHtmlEntities(data) {
    // Deep clone and clean HTML entities
    const cleanData = JSON.parse(JSON.stringify(data));
    
    const cleanString = (str) => {
      if (typeof str !== 'string') return str;
      return str
        .replace(/&#39;/g, "'")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"')
        .replace(/&nbsp;/g, " ")
        .replace(/[^\x00-\x7F]/g, function(char) {
          // Keep Turkish characters, clean others
          if ('çğıöşüÇĞIİÖŞÜ'.includes(char)) return char;
          return char;
        });
    };

    const cleanObject = (obj) => {
      if (Array.isArray(obj)) {
        return obj.map(cleanObject);
      } else if (obj && typeof obj === 'object') {
        const cleaned = {};
        for (const [key, value] of Object.entries(obj)) {
          cleaned[key] = cleanObject(value);
        }
        return cleaned;
      } else if (typeof obj === 'string') {
        return cleanString(obj);
      }
      return obj;
    };

    return cleanObject(cleanData);
  }

  async copyAssets() {
    // Copy any additional assets like images, styles etc.
    const assetsPath = path.join(__dirname, '..', 'assets');
    if (await fs.pathExists(assetsPath)) {
      await fs.copy(assetsPath, path.join(this.outputPath, 'assets'));
    }
  }
}

// CLI execution
const generator = new ThesisGenerator();
generator.init();

export default ThesisGenerator;