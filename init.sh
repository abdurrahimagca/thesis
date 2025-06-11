#!/bin/bash

# Turkish Thesis Generator - Init Script
# Bu script projeyi başlatır ve gerekli dosyaları oluşturur

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# ASCII Art Logo
echo -e "${BLUE}"
cat << "EOF"
  _____ _   _ ____  _  _____ _   _   _____ _   _ _____ ____ ___ ____  
 |_   _| | | |  _ \| |/ /_ _| | | | |_   _| | | | ____/ ___|_ _/ ___| 
   | | | | | | |_) | ' / | || | | |   | | | |_| |  _| \___ \| |\___ \ 
   | | | |_| |  _ <| . \ | || |_| |   | | |  _  | |___ ___) | | ___) |
   |_|  \___/|_| \_\_|\_\___|\___/    |_| |_| |_|_____|____/___|____/ 
                                                                      
EOF
echo -e "${NC}"

echo -e "${BLUE}🎓 Turkish LaTeX Thesis Generator${NC}"
echo -e "${YELLOW}Türkçe tez şablonu oluşturucu başlatılıyor...${NC}\n"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js bulunamadı. Lütfen Node.js'i yükleyin.${NC}"
    echo -e "${YELLOW}👉 https://nodejs.org/${NC}"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm bulunamadı. Lütfen npm'i yükleyin.${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Node.js ve npm mevcut${NC}"

# Create project structure if it doesn't exist
echo -e "${BLUE}📁 Proje yapısı oluşturuluyor...${NC}"

mkdir -p src
mkdir -p templates
mkdir -p output
mkdir -p assets

# Check if package.json exists
if [ ! -f "package.json" ]; then
    echo -e "${YELLOW}📦 package.json oluşturuluyor...${NC}"
    cat > package.json << 'EOF'
{
  "name": "turkish-thesis-generator",
  "version": "1.0.0",
  "description": "Turkish LaTeX thesis template generator with dummy data",
  "main": "index.js",
  "scripts": {
    "init": "node src/generator.js",
    "build": "npm run init && npm run compile",
    "compile": "cd output && pdflatex thesis.tex && pdflatex thesis.tex",
    "clean": "rm -rf output/* && rm -f output/*.aux output/*.log output/*.toc output/*.lof output/*.lot",
    "dev": "npm run init && npm run compile",
    "watch": "nodemon --watch src --watch templates --exec 'npm run init'"
  },
  "dependencies": {
    "inquirer": "^9.2.12",
    "mustache": "^4.2.0",
    "fs-extra": "^11.1.1",
    "chalk": "^4.1.2"
  },
  "devDependencies": {
    "nodemon": "^3.0.2"
  },
  "keywords": ["latex", "thesis", "turkish", "template", "generator"],
  "author": "Turkish Thesis Generator",
  "license": "MIT"
}
EOF
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo -e "${BLUE}📚 Bağımlılıklar yükleniyor...${NC}"
    npm install
fi

echo -e "${GREEN}✓ Bağımlılıklar hazır${NC}"

# Check if LaTeX is installed
if command -v pdflatex &> /dev/null; then
    echo -e "${GREEN}✓ LaTeX mevcut${NC}"
    LATEX_AVAILABLE=true
else
    echo -e "${YELLOW}⚠️  LaTeX bulunamadı. PDF oluşturmak için LaTeX gerekli.${NC}"
    echo -e "${YELLOW}   Ubuntu/Debian: sudo apt-get install texlive-full${NC}"
    echo -e "${YELLOW}   macOS: brew install --cask mactex${NC}"
    echo -e "${YELLOW}   Windows: https://miktex.org/${NC}"
    LATEX_AVAILABLE=false
fi

# Display menu
echo -e "\n${BLUE}🚀 Ne yapmak istiyorsunuz?${NC}"
echo -e "${GREEN}1)${NC} Örnek verilerle tez oluştur"
echo -e "${GREEN}2)${NC} Kendi verilerinle tez oluştur"
echo -e "${GREEN}3)${NC} Sadece .tex dosyası oluştur"
if [ "$LATEX_AVAILABLE" = true ]; then
    echo -e "${GREEN}4)${NC} Tez oluştur ve PDF'e çevir"
fi
echo -e "${GREEN}q)${NC} Çıkış"

read -p "Seçiminiz: " choice

case $choice in
    1)
        echo -e "\n${BLUE}📝 Örnek verilerle tez oluşturuluyor...${NC}"
        echo "true" | npm run init
        echo -e "\n${GREEN}✅ Tez dosyası oluşturuldu: output/thesis.tex${NC}"
        ;;
    2)
        echo -e "\n${BLUE}📝 Kişisel verilerle tez oluşturuluyor...${NC}"
        echo "false" | npm run init
        echo -e "\n${GREEN}✅ Tez dosyası oluşturuldu: output/thesis.tex${NC}"
        ;;
    3)
        echo -e "\n${BLUE}📝 .tex dosyası oluşturuluyor...${NC}"
        npm run init
        echo -e "\n${GREEN}✅ .tex dosyası hazır: output/thesis.tex${NC}"
        ;;
    4)
        if [ "$LATEX_AVAILABLE" = true ]; then
            echo -e "\n${BLUE}📝 Tez oluşturuluyor ve PDF'e çevriliyor...${NC}"
            npm run dev
            if [ -f "output/thesis.pdf" ]; then
                echo -e "\n${GREEN}✅ PDF başarıyla oluşturuldu: output/thesis.pdf${NC}"
            else
                echo -e "\n${RED}❌ PDF oluşturulurken hata oluştu${NC}"
            fi
        else
            echo -e "\n${RED}❌ LaTeX yüklü değil, PDF oluşturulamıyor${NC}"
        fi
        ;;
    q|Q)
        echo -e "\n${YELLOW}👋 Hoşçakalın!${NC}"
        exit 0
        ;;
    *)
        echo -e "\n${RED}❌ Geçersiz seçim${NC}"
        exit 1
        ;;
esac

# Show available commands
echo -e "\n${BLUE}📚 Kullanılabilir komutlar:${NC}"
echo -e "${GREEN}npm run init${NC}     - Tez şablonu oluştur"
echo -e "${GREEN}npm run build${NC}    - .tex dosyasını PDF'e çevir"
echo -e "${GREEN}npm run clean${NC}    - Geçici dosyaları temizle"
echo -e "${GREEN}npm run watch${NC}    - Değişiklikleri izle ve otomatik güncelle"

if [ -f "output/thesis.tex" ]; then
    echo -e "\n${GREEN}🎉 Tez şablonunuz hazır!${NC}"
    echo -e "${YELLOW}📁 Dosyalar: output/ klasöründe${NC}"
    
    if [ "$LATEX_AVAILABLE" = true ]; then
        echo -e "\n${BLUE}💡 PDF oluşturmak için:${NC}"
        echo -e "   cd output && pdflatex thesis.tex"
    fi
fi