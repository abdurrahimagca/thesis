// Turkish Thesis Generator Web App - Simplified
class ThesisGenerator {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadDummyData();
    }

    setupEventListeners() {
        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tabId = e.target.closest('.tab-btn').dataset.tab;
                this.switchTab(tabId);
            });
        });

        // Word counting for abstracts
        const abstractTr = document.getElementById('abstractTr');
        const abstractEn = document.getElementById('abstractEn');
        
        if (abstractTr) {
            abstractTr.addEventListener('input', (e) => {
                this.updateWordCount(e.target, 'abstractTrCount');
            });
        }
        
        if (abstractEn) {
            abstractEn.addEventListener('input', (e) => {
                this.updateWordCount(e.target, 'abstractEnCount');
            });
        }
    }

    switchTab(tabId) {
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        const activeBtn = document.querySelector(`[data-tab="${tabId}"]`);
        if (activeBtn) activeBtn.classList.add('active');

        // Update tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        
        const activeContent = document.getElementById(tabId);
        if (activeContent) activeContent.classList.add('active');
    }

    updateWordCount(textarea, counterId) {
        const words = textarea.value.trim().split(/\s+/).filter(word => word.length > 0);
        const count = words.length;
        const counter = document.getElementById(counterId);
        if (counter) {
            counter.textContent = `${count}/250 kelime`;
            counter.style.color = count > 250 ? '#e53e3e' : '#718096';
        }
    }

    collectFormData() {
        return {
            thesisTitle: this.getValue('thesisTitle') || 'TEZ BAŞLIĞI',
            thesisTitleEn: this.getValue('thesisTitleEn') || 'THESIS TITLE IN ENGLISH',
            authorName: this.getValue('authorName') || 'YAZAR ADI',
            advisorName: this.getValue('advisorName') || 'DANIŞMAN ADI',
            university: this.getValue('university') || 'ÜNİVERSİTE ADI',
            faculty: this.getValue('faculty') || 'FAKÜLTE ADI',
            department: this.getValue('department') || 'BÖLÜM ADI',
            submissionDate: this.getValue('submissionDate') || 'TARIH',
            abstractTr: this.getValue('abstractTr') || 'Türkçe özet henüz eklenmemiştir.',
            abstractEn: this.getValue('abstractEn') || 'English abstract not yet added.',
            keywordsTr: this.getValue('keywordsTr') || 'anahtar kelimeler',
            keywordsEn: this.getValue('keywordsEn') || 'keywords',
            personalInfo: {
                birthPlace: this.getValue('birthPlace') || 'Doğum Yeri',
                birthDate: this.getValue('birthDate') || 'Doğum Tarihi',
                email: this.getValue('email') || 'email@domain.com'
            }
        };
    }

    getValue(id) {
        const element = document.getElementById(id);
        return element ? element.value : '';
    }

    setValue(id, value) {
        const element = document.getElementById(id);
        if (element) element.value = value;
    }

    loadDummyData() {
        const dummyData = {
            thesisTitle: 'YAPAY ZEKA TABAnLI BİLGİ İŞLEME SİSTEMLERİNİN GELİŞTİRİLMESİ VE UYGULANMASI',
            thesisTitleEn: 'DEVELOPMENT AND APPLICATION OF ARTIFICIAL INTELLIGENCE BASED INFORMATION PROCESSING SYSTEMS',
            authorName: 'AHMET YILMAZ',
            advisorName: 'Prof. Dr. MEHMET ÖZKAN',
            university: 'ANKARA TEKNİK ÜNİVERSİTESİ',
            faculty: 'MÜHENDİSLİK FAKÜLTESİ',
            department: 'BİLGİSAYAR MÜHENDİSLİĞİ BÖLÜMÜ',
            submissionDate: 'Haziran 2025',
            abstractTr: 'Bu çalışmada, yapay zeka tabanlı bilgi işleme sistemlerinin geliştirilmesi ve uygulanması konusu ele alınmıştır. Modern bilgi işleme tekniklerinin analiz edilmesi, makine öğrenmesi algoritmalarının karşılaştırılması ve yeni bir hibrit yaklaşımın önerilmesi çalışmanın temel hedefleridir. Geliştirilen sistem, %87 doğruluk oranı ile başarılı sonuçlar vermiştir.',
            abstractEn: 'In this study, the development and application of artificial intelligence based information processing systems has been addressed. The main objectives of the study are to analyze modern information processing techniques, compare machine learning algorithms and propose a new hybrid approach. The developed system achieved successful results with 87% accuracy rate.',
            keywordsTr: 'yapay zeka, bilgi işleme, makine öğrenmesi, hibrit sistem',
            keywordsEn: 'artificial intelligence, information processing, machine learning, hybrid system',
            birthPlace: 'Ankara',
            birthDate: '15.03.1998',
            email: 'ahmet.yilmaz@email.com'
        };

        // Populate form
        Object.keys(dummyData).forEach(key => {
            this.setValue(key, dummyData[key]);
        });

        // Update word counts
        this.updateWordCount(document.getElementById('abstractTr'), 'abstractTrCount');
        this.updateWordCount(document.getElementById('abstractEn'), 'abstractEnCount');
    }

    generateLatexTemplate(data) {
        return `% Türkçe Tez Şablonu - Web Generator
% Turkish Thesis Template - Web Generated

\\documentclass[12pt,a4paper,oneside]{report}

% Minimal paketler
\\usepackage[utf8]{inputenc}
\\usepackage[T1]{fontenc}
\\usepackage[left=4cm, right=2.5cm, top=3cm, bottom=2.5cm]{geometry}
\\usepackage{setspace}
\\usepackage{graphicx}

% ===============================
% TEZ BİLGİLERİ
% ===============================
\\newcommand{\\thesistitle}{${data.thesisTitle}}
\\newcommand{\\authorname}{${data.authorName}}
\\newcommand{\\advisorname}{${data.advisorName}}
\\newcommand{\\university}{${data.university}}
\\newcommand{\\faculty}{${data.faculty}}
\\newcommand{\\department}{${data.department}}
\\newcommand{\\submissiondate}{${data.submissionDate}}

% ===============================
% SAYFA NUMARALAMA VE FORMATLAR
% ===============================
\\pagestyle{plain}
\\onehalfspacing

% Başlık formatları
\\makeatletter
\\renewcommand{\\@makechapterhead}[1]{%
  \\vspace*{2cm}%
  {\\parindent \\z@ \\centering \\normalfont
    \\ifnum \\c@secnumdepth >\\m@ne
        \\large\\bfseries \\@chapapp\\space \\thechapter
        \\par\\nobreak
        \\vskip 20\\p@
    \\fi
    \\interlinepenalty\\@M
    \\large \\bfseries #1\\par\\nobreak
    \\vskip 20\\p@
  }}

\\renewcommand{\\@makeschapterhead}[1]{%
  \\vspace*{2cm}%
  {\\parindent \\z@ \\centering
    \\normalfont
    \\interlinepenalty\\@M
    \\large \\bfseries #1\\par\\nobreak
    \\vskip 20\\p@
  }}
\\makeatother

% Tablo ve şekil numaralandırma
\\renewcommand{\\thetable}{\\thechapter.\\arabic{table}}
\\renewcommand{\\thefigure}{\\thechapter.\\arabic{figure}}
\\renewcommand{\\theequation}{\\thechapter.\\arabic{equation}}

% İçindekiler başlıkları
\\renewcommand{\\contentsname}{İÇİNDEKİLER}
\\renewcommand{\\listfigurename}{ŞEKİLLER DİZİNİ}
\\renewcommand{\\listtablename}{TABLOLAR DİZİNİ}
\\renewcommand{\\bibname}{KAYNAKLAR}
\\renewcommand{\\appendixname}{EK}
\\renewcommand{\\chaptername}{}

% ===============================
% BELGE BAŞLANGICI
% ===============================
\\begin{document}

% ===============================
% DIŞ KAPAK
% ===============================
\\begin{titlepage}
\\centering
\\vspace*{2cm}

{\\fontsize{14}{21}\\selectfont\\bfseries \\university \\par}
\\vspace{0.5cm}
{\\fontsize{14}{21}\\selectfont\\bfseries \\faculty \\par}
\\vspace{0.5cm}
{\\fontsize{14}{21}\\selectfont\\bfseries \\department \\par}

\\vspace{3cm}

{\\fontsize{16}{24}\\selectfont\\bfseries \\thesistitle \\par}

\\vspace{3cm}

{\\fontsize{14}{21}\\selectfont LİSANS TEZİ \\par}

\\vspace{2cm}

{\\fontsize{14}{21}\\selectfont \\authorname \\par}

\\vspace{2cm}

{\\fontsize{12}{18}\\selectfont Danışman: \\advisorname \\par}

\\vfill

{\\fontsize{12}{18}\\selectfont \\submissiondate \\par}

\\end{titlepage}

% ===============================
% BAŞLANGIÇ KISMI - ROMEN RAKAMLARI
% ===============================
\\pagenumbering{roman}

% ===============================
% ÖNSÖZ
% ===============================
\\chapter*{ÖNSÖZ}
\\addcontentsline{toc}{chapter}{ÖNSÖZ}

\\singlespacing

Bu tez çalışmasında ${data.thesisTitle} konusu ele alınmıştır. Çalışma boyunca modern teknolojilerin analizi ve uygulanması hedeflenmiştir.

Tez çalışmam boyunca bana yol gösteren değerli danışmanım ${data.advisorName}'a, desteklerini hiç esirgemeyen aileme ve arkadaşlarıma teşekkürlerimi sunarım.

\\vspace{2cm}
\\hfill ${data.authorName} \\\\
\\hfill ${data.submissionDate}

\\onehalfspacing
\\clearpage

% ===============================
% İÇİNDEKİLER
% ===============================
\\tableofcontents
\\clearpage

% ===============================
% SİMGELER
% ===============================
\\chapter*{SİMGELER}
\\addcontentsline{toc}{chapter}{SİMGELER}

\\singlespacing

\\section*{Simgeler}
\\begin{tabular}{@{}ll@{}}
$A$ & Alan, m² \\\\
$T$ & Sıcaklık, K \\\\
$v$ & Hız, m/s \\\\
$\\rho$ & Yoğunluk, kg/m³ \\\\
$\\alpha$ & Doğruluk oranı \\\\
$\\beta$ & Güven aralığı \\\\
\\end{tabular}

\\section*{Kısaltmalar}
\\begin{tabular}{@{}ll@{}}
A.I. & Artificial Intelligence \\\\
M.L. & Machine Learning \\\\
S.V.M. & Support Vector Machine \\\\
R.F. & Random Forest \\\\
N.N. & Neural Network \\\\
\\end{tabular}

\\onehalfspacing
\\clearpage

% ===============================
% TÜRKÇE ÖZET
% ===============================
\\chapter*{${data.thesisTitle}}
\\addcontentsline{toc}{chapter}{ÖZET}

\\singlespacing

\\section*{ÖZET}

${data.abstractTr}

\\textbf{Anahtar Kelimeler:} ${data.keywordsTr}

\\onehalfspacing
\\clearpage

% ===============================
% İNGİLİZCE ÖZET
% ===============================
\\chapter*{${data.thesisTitleEn}}
\\addcontentsline{toc}{chapter}{ABSTRACT}

\\singlespacing

\\section*{ABSTRACT}

${data.abstractEn}

\\textbf{Keywords:} ${data.keywordsEn}

\\onehalfspacing
\\clearpage

% ===============================
% ANA METİN - ARAP RAKAMLARI
% ===============================
\\pagenumbering{arabic}

\\chapter{GİRİŞ}

\\section{Çalışmanın Amacı}

Bu çalışmanın temel amacı, yapay zeka teknolojilerini kullanarak daha etkili bilgi işleme sistemleri geliştirmektir. Modern dünyada artan veri miktarı ile birlikte, geleneksel işleme yöntemlerinin yetersiz kalması bu çalışmanın motivasyonunu oluşturmaktadır.

\\section{Literatür Özeti}

Yapay zeka alanında yapılan çalışmalar incelendiğinde, özellikle son 10 yılda makine öğrenmesi ve derin öğrenme algoritmalarında önemli gelişmeler kaydedildiği görülmektedir. Smith ve arkadaşları (2023), hibrit yaklaşımların geleneksel yöntemlere göre %25 daha iyi performans gösterdiğini rapor etmişlerdir.

\\section{Tezin Kapsamı}

Bu tez kapsamında, literatürde mevcut olan yaklaşımların analizi, yeni bir hibrit model önerisi, deneysel çalışmalar ve sonuçların değerlendirilmesi yer almaktadır. Çalışma 5 ana bölümden oluşmaktadır.

\\chapter{KURAMSAL TEMELLER}

\\section{Yapay Zeka Temelleri}

Yapay zeka, makinelerin insan benzeri düşünme ve öğrenme yeteneklerini simüle etmeyi amaçlayan bilim dalıdır. Alan Turing'in 1950'de önerdiği Turing Testi'nden günümüze kadar olan gelişim süreci, yapay zekanın evrimini göstermektedir.

\\section{Makine Öğrenmesi Algoritmaları}

Makine öğrenmesi, bilgisayarların verilerden öğrenerek performanslarını artırmalarını sağlayan yöntemler bütünüdür. Denetimli öğrenme, denetimsiz öğrenme ve pekiştirmeli öğrenme olmak üzere üç ana kategoride incelenir.

\\section{Bilgi İşleme Sistemleri}

Modern bilgi işleme sistemleri, büyük veri setlerini analiz etmek, desenleri keşfetmek ve anlamlı bilgiler çıkarmak için tasarlanmıştır. Bu sistemler, veri ön işleme, özellik çıkarma, model eğitimi ve değerlendirme aşamalarından oluşur.

\\chapter{MALZEME VE YÖNTEM}

\\section{Veri Seti}

Çalışmada kullanılan veri seti, 10.000 örnek ve 50 özellikten oluşmaktadır. Veri seti, çeşitli kaynaklardan toplanmış ve uygun ön işleme teknikleri uygulanmıştır. Veri setinin %70'i eğitim, %20'si test ve %10'u doğrulama için ayrılmıştır.

\\begin{table}[h!]
\\centering
\\caption{Veri seti özellikleri}
\\label{tab:dataset}
\\begin{tabular}{|l|c|}
\\hline
\\textbf{Özellik} & \\textbf{Değer} \\\\
\\hline
Toplam Örnek Sayısı & 10,000 \\\\
Özellik Sayısı & 50 \\\\
Eğitim Seti (\\%) & 70 \\\\
Test Seti (\\%) & 20 \\\\
Doğrulama Seti (\\%) & 10 \\\\
\\hline
\\end{tabular}
\\end{table}

\\section{Önerilen Hibrit Model}

Geliştirilen hibrit model, Random Forest ve Support Vector Machine algoritmalarının kombinasyonundan oluşmaktadır. Model, ensemble learning yaklaşımı ile her iki algoritmanın avantajlarını birleştirmektedir.

\\begin{figure}[h!]
\\centering
\\rule{10cm}{6cm} % Şekil yerine geçici kutu
\\caption{Hibrit model mimarisi}
\\label{fig:model_architecture}
\\end{figure}

\\section{Değerlendirme Metrikleri}

Sistemin performansı, doğruluk (accuracy), kesinlik (precision), duyarlılık (recall) ve F1-score metrikleri kullanılarak değerlendirilmiştir.

\\chapter{BULGULAR VE TARTIŞMA}

\\section{Deneysel Sonuçlar}

Önerilen hibrit model, test veri seti üzerinde %87.2 doğruluk oranı elde etmiştir. Bu sonuç, literatürdeki mevcut yaklaşımlardan %12 daha yüksektir.

\\begin{table}[h!]
\\centering
\\caption{Algoritma performans karşılaştırması}
\\label{tab:performance}
\\begin{tabular}{|l|c|c|c|}
\\hline
\\textbf{Algoritma} & \\textbf{Doğruluk (\\%)} & \\textbf{Kesinlik (\\%)} & \\textbf{Duyarlılık (\\%)} \\\\
\\hline
Random Forest & 78.5 & 76.2 & 80.1 \\\\
SVM & 82.3 & 81.7 & 83.0 \\\\
Neural Network & 85.1 & 84.3 & 85.9 \\\\
Hibrit Model & \\textbf{87.2} & \\textbf{86.8} & \\textbf{87.6} \\\\
\\hline
\\end{tabular}
\\end{table}

\\section{Karşılaştırmalı Analiz}

Geliştirilen sistem, Random Forest (%78.5), SVM (%82.3) ve Neural Network (%85.1) gibi geleneksel yöntemlerle karşılaştırılmış ve üstün performans göstermiştir.

\\begin{figure}[h!]
\\centering
\\rule{10cm}{6cm} % Şekil yerine geçici kutu
\\caption{Algoritmaların ROC eğrisi karşılaştırması}
\\label{fig:roc_curve}
\\end{figure}

\\section{İstatistiksel Analiz}

t-test analizi sonuçları, önerilen yöntemin istatistiksel olarak anlamlı düzeyde (p<0.05) daha iyi performans gösterdiğini kanıtlamıştır.

\\begin{equation}
Accuracy = \\frac{TP + TN}{TP + TN + FP + FN}
\\label{eq:accuracy}
\\end{equation}

\\chapter{SONUÇ VE ÖNERİLER}

\\section{Sonuçlar}

Bu çalışmada geliştirilen yapay zeka tabanlı hibrit sistem, bilgi işleme alanında önemli bir katkı sağlamıştır. Elde edilen %87.2 doğruluk oranı, sistemin pratik uygulamalarda kullanılabilir olduğunu göstermektedir.

\\section{Gelecek Çalışmalar}

Gelecek çalışmalarda, derin öğrenme algoritmalarının da hibrit modele entegre edilmesi, farklı veri setleri üzerinde test edilmesi ve gerçek zamanlı uygulamalar geliştirilmesi planlanmaktadır.

% ===============================
% KAYNAKLAR
% ===============================
\\chapter*{KAYNAKLAR}
\\addcontentsline{toc}{chapter}{KAYNAKLAR}

\\singlespacing

1. Smith, J., Johnson, A., Brown, K., "Advanced Machine Learning Techniques", \\textit{Journal of AI}, 45(3), 123-145, (2023).

2. Özkan, M., Yılmaz, S., "Hibrit Yaklaşımların Performans Analizi", \\textit{Bilgisayar Bilimleri Dergisi}, 12(2), 67-89, (2022).

3. Chen, L., Wang, X., "Deep Learning Applications", \\textit{IEEE Transactions}, 34(7), 234-251, (2023).

\\onehalfspacing

% ===============================
% ÖZGEÇMİŞ
% ===============================
\\chapter*{ÖZGEÇMİŞ}
\\addcontentsline{toc}{chapter}{ÖZGEÇMİŞ}

\\singlespacing

\\textbf{Kişisel Bilgiler:}

\\begin{tabular}{@{}ll@{}}
Ad Soyad: & ${data.authorName} \\\\
Doğum Yeri ve Tarihi: & ${data.personalInfo.birthPlace}, ${data.personalInfo.birthDate} \\\\
E-posta: & ${data.personalInfo.email} \\\\
\\end{tabular}

\\vspace{0.5cm}

\\textbf{Eğitim:}

\\begin{tabular}{@{}ll@{}}
2020-2024 & Lisans, ${data.department}, ${data.faculty}, ${data.university} \\\\
\\end{tabular}

\\vspace{0.5cm}

\\textbf{Yabancı Dil:}

İngilizce (İyi)

\\end{document}`;
    }
}

// Global functions - Simplified
let generator;

document.addEventListener('DOMContentLoaded', () => {
    generator = new ThesisGenerator();
});

function loadTemplate(type) {
    if (!generator) return;
    
    const templates = {
        ai: {
            thesisTitle: 'YAPAY ZEKA TABAnLı BİLGİ İŞLEME SİSTEMLERİNİN GELİŞTİRİLMESİ VE UYGULANMASI',
            thesisTitleEn: 'DEVELOPMENT AND APPLICATION OF ARTIFICIAL INTELLIGENCE BASED INFORMATION PROCESSING SYSTEMS',
            keywordsTr: 'yapay zeka, bilgi işleme, makine öğrenmesi, hibrit sistem',
            keywordsEn: 'artificial intelligence, information processing, machine learning, hybrid system'
        },
        engineering: {
            thesisTitle: 'YENİLENEBİLİR ENERJİ SİSTEMLERİNDE VERİMLİLİK OPTİMİZASYONU',
            thesisTitleEn: 'EFFICIENCY OPTIMIZATION IN RENEWABLE ENERGY SYSTEMS',
            keywordsTr: 'yenilenebilir enerji, optimizasyon, verimlilik, güneş enerjisi',
            keywordsEn: 'renewable energy, optimization, efficiency, solar energy'
        },
        business: {
            thesisTitle: 'DİJİTAL PAZARLAMA STRATEJİLERİNİN TÜKETİCİ DAVRANIŞLARINA ETKİSİ',
            thesisTitleEn: 'THE EFFECT OF DIGITAL MARKETING STRATEGIES ON CONSUMER BEHAVIOR',
            keywordsTr: 'dijital pazarlama, tüketici davranışı, sosyal medya, e-ticaret',
            keywordsEn: 'digital marketing, consumer behavior, social media, e-commerce'
        }
    };

    if (templates[type]) {
        Object.keys(templates[type]).forEach(key => {
            generator.setValue(key, templates[type][key]);
        });
        showNotification(`${type.toUpperCase()} şablonu yüklendi!`, 'success');
    }
}

function loadDummyData() {
    if (!generator) return;
    generator.loadDummyData();
    showNotification('Örnek veriler yüklendi!', 'success');
}

function resetForm() {
    if (confirm('Tüm verileri sıfırlamak istediğinize emin misiniz?')) {
        document.querySelectorAll('input, textarea').forEach(element => {
            element.value = '';
        });
        showNotification('Form sıfırlandı!', 'info');
    }
}

function generatePreview() {
    if (!generator) return;
    const data = generator.collectFormData();
    const latex = generator.generateLatexTemplate(data);
    document.getElementById('latexPreview').textContent = latex;
    showNotification('Önizleme güncellendi!', 'success');
}

function downloadLatex() {
    if (!generator) return;
    const data = generator.collectFormData();
    const latex = generator.generateLatexTemplate(data);
    
    const blob = new Blob([latex], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'thesis.tex';
    a.click();
    URL.revokeObjectURL(url);
    
    showNotification('LaTeX dosyası indirildi!', 'success');
}

function copyToClipboard() {
    const latex = document.getElementById('latexPreview').textContent;
    navigator.clipboard.writeText(latex).then(() => {
        showNotification('LaTeX kodu kopyalandı!', 'success');
    });
}

function generateThesis() {
    if (!generator) return;
    const data = generator.collectFormData();
    
    if (!data.thesisTitle || !data.authorName || !data.advisorName) {
        showNotification('Lütfen en az tez başlığı, yazar adı ve danışman adını doldurun!', 'error');
        return;
    }

    showProgressModal();
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += 10;
        updateProgress(progress);
        
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                hideProgressModal();
                downloadLatex();
                showNotification('Tez başarıyla oluşturuldu ve indirildi!', 'success');
            }, 500);
        }
    }, 200);
}

function showProgressModal() {
    document.getElementById('progressModal').classList.add('active');
}

function hideProgressModal() {
    document.getElementById('progressModal').classList.remove('active');
}

function updateProgress(percent) {
    document.getElementById('progressFill').style.width = percent + '%';
    const messages = [
        'Hazırlanıyor...',
        'Temel bilgiler işleniyor...',
        'LaTeX kodu üretiliyor...',
        'Template oluşturuluyor...',
        'İçerik yazılıyor...',
        'Tablolar ekleniyor...',
        'Şekiller hazırlanıyor...',
        'Son kontroller...',
        'Tamamlanıyor...',
        'Başarıyla tamamlandı!'
    ];
    
    const messageIndex = Math.floor(percent / 10);
    document.getElementById('progressText').textContent = messages[messageIndex] || 'İşleniyor...';
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'times' : 'info'}-circle"></i>
        ${message}
    `;
    
    if (!document.querySelector('.notification-styles')) {
        const style = document.createElement('style');
        style.className = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 20px;
                border-radius: 10px;
                color: white;
                font-weight: 600;
                z-index: 1001;
                animation: slideInRight 0.3s ease;
                max-width: 400px;
                box-shadow: 0 4px 16px rgba(0,0,0,0.2);
            }
            .notification-success { background: linear-gradient(135deg, #48bb78, #38a169); }
            .notification-error { background: linear-gradient(135deg, #e53e3e, #c53030); }
            .notification-info { background: linear-gradient(135deg, #4299e1, #3182ce); }
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}