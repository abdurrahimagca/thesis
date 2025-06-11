#!/bin/bash

# LaTeX Installation Script for Turkish Thesis Generator
# Türkçe Tez Oluşturucu için LaTeX Kurulum Scripti

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🔧 LaTeX Kurulum Scripti${NC}"
echo -e "${YELLOW}Turkish Thesis Generator için LaTeX kuruluyor...${NC}\n"

# Detect OS
if [ -f /etc/os-release ]; then
    . /etc/os-release
    OS=$NAME
    VER=$VERSION_ID
elif type lsb_release >/dev/null 2>&1; then
    OS=$(lsb_release -si)
    VER=$(lsb_release -sr)
else
    OS=$(uname -s)
    VER=$(uname -r)
fi

echo -e "${BLUE}📋 Sistem: $OS $VER${NC}\n"

# Check if LaTeX is already installed
if command -v pdflatex &> /dev/null; then
    echo -e "${GREEN}✅ LaTeX zaten kurulu!${NC}"
    pdflatex --version | head -1
    exit 0
fi

# Installation based on OS
case "$OS" in
    "Fedora Linux"|"Fedora")
        echo -e "${BLUE}📦 Fedora için LaTeX kuruluyor...${NC}"
        echo -e "${YELLOW}Bu işlem birkaç dakika sürebilir...${NC}\n"
        
        # Update package list
        sudo dnf update -y
        
        # Install minimal LaTeX packages
        echo -e "${BLUE}🔄 Temel LaTeX paketleri kuruluyor...${NC}"
        sudo dnf install -y \
            texlive-latex \
            texlive-latex-bin \
            texlive-collection-basic \
            texlive-collection-latex \
            texlive-collection-latexrecommended \
            texlive-fontenc \
            texlive-inputenc \
            texlive-geometry \
            texlive-setspace \
            texlive-times \
            texlive-babel \
            texlive-babel-turkish \
            texlive-hyphen-turkish \
            texlive-collection-fontsrecommended
        ;;
    
    "Ubuntu"|"Debian GNU/Linux")
        echo -e "${BLUE}📦 Ubuntu/Debian için LaTeX kuruluyor...${NC}"
        
        # Update package list
        sudo apt-get update
        
        # Install LaTeX packages
        sudo apt-get install -y \
            texlive-latex-base \
            texlive-latex-recommended \
            texlive-fonts-recommended \
            texlive-lang-other \
            texlive-lang-turkish
        ;;
    
    "Arch Linux")
        echo -e "${BLUE}📦 Arch Linux için LaTeX kuruluyor...${NC}"
        
        sudo pacman -S --noconfirm \
            texlive-most \
            texlive-langextra
        ;;
    
    "CentOS Linux"|"Red Hat"*)
        echo -e "${BLUE}📦 CentOS/RHEL için LaTeX kuruluyor...${NC}"
        
        sudo yum install -y \
            texlive \
            texlive-latex \
            texlive-babel-turkish
        ;;
    
    *)
        echo -e "${RED}❌ Desteklenmeyen işletim sistemi: $OS${NC}"
        echo -e "${YELLOW}📖 Manuel kurulum talimatları:${NC}"
        echo -e "Ubuntu/Debian: sudo apt-get install texlive-full"
        echo -e "Fedora: sudo dnf install texlive-scheme-full"
        echo -e "Arch: sudo pacman -S texlive-most"
        echo -e "macOS: brew install --cask mactex"
        exit 1
        ;;
esac

# Check if installation was successful
echo -e "\n${BLUE}🔍 Kurulum kontrol ediliyor...${NC}"

if command -v pdflatex &> /dev/null; then
    echo -e "${GREEN}✅ LaTeX başarıyla kuruldu!${NC}"
    pdflatex --version | head -1
    
    # Test basic functionality
    echo -e "\n${BLUE}🧪 Temel test yapılıyor...${NC}"
    cd /tmp
    cat > test.tex << 'EOF'
\documentclass{article}
\usepackage[utf8]{inputenc}
\begin{document}
Test document
\end{document}
EOF
    
    if pdflatex -interaction=nonstopmode test.tex > /dev/null 2>&1; then
        echo -e "${GREEN}✅ LaTeX test başarılı!${NC}"
        rm -f test.*
    else
        echo -e "${YELLOW}⚠️  LaTeX kuruldu ama test başarısız. Manuel kontrol edin.${NC}"
    fi
    
    echo -e "\n${GREEN}🎉 LaTeX kurulumu tamamlandı!${NC}"
    echo -e "${BLUE}💡 Şimdi 'make pdf' komutu ile tez oluşturabilirsiniz.${NC}"
    
else
    echo -e "${RED}❌ LaTeX kurulumu başarısız!${NC}"
    echo -e "${YELLOW}📖 Lütfen manuel kurulum yapın veya sistem yöneticinizle iletişime geçin.${NC}"
    exit 1
fi