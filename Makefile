# Turkish Thesis Generator Makefile
# Türkçe Tez Oluşturucu Makefile

.PHONY: help init build clean install watch pdf setup

# Default target
help:
	@echo "🎓 Turkish Thesis Generator"
	@echo "=========================="
	@echo ""
	@echo "Kullanılabilir komutlar:"
	@echo "  make setup       - Projeyi ilk kez kurulum"
	@echo "  make install-latex - LaTeX'i kur (Fedora/Ubuntu/Debian)"
	@echo "  make init        - Örnek verilerle tez oluştur"
	@echo "  make build       - .tex dosyasını PDF'e çevir"
	@echo "  make pdf         - Tez oluştur ve PDF'e çevir"
	@echo "  make clean       - Geçici dosyaları temizle"
	@echo "  make install     - Bağımlılıkları yükle"
	@echo "  make watch       - Değişiklikleri izle"
	@echo ""

# LaTeX kurulumu
install-latex:
	@echo "🔧 LaTeX kuruluyor..."
	@chmod +x install-latex.sh
	@./install-latex.sh

# İlk kurulum
setup:
	@echo "🔧 Proje kuruluyor..."
	@chmod +x init.sh
	@npm install
	@echo "✅ Kurulum tamamlandı!"
	@echo "💡 'make init' ile başlayabilirsiniz"

# Node.js bağımlılıklarını yükle
install:
	@echo "📦 Bağımlılıklar yükleniyor..."
	@npm install

# Örnek verilerle tez oluştur
init:
	@echo "📝 Örnek verilerle tez oluşturuluyor..."
	@echo "true" | npm run init
	@echo "✅ Tez şablonu oluşturuldu: output/thesis.tex"

# Kişisel verilerle tez oluştur
custom:
	@echo "📝 Kişisel verilerle tez oluşturuluyor..."
	@npm run init

# .tex dosyasını PDF'e çevir
build:
	@echo "🔨 PDF oluşturuluyor..."
	@cd output && \
	pdflatex thesis.tex && \
	pdflatex thesis.tex && \
	echo "✅ PDF oluşturuldu: output/thesis.pdf"

# Hem tez oluştur hem PDF'e çevir
pdf: init build

# Geçici dosyaları temizle
clean:
	@echo "🧹 Temizlik yapılıyor..."
	@rm -f output/*.aux output/*.log output/*.toc output/*.lof output/*.lot
	@rm -f output/*.out output/*.bbl output/*.blg output/*.fls output/*.fdb_latexmk
	@echo "✅ Geçici dosyalar temizlendi"

# Tam temizlik (PDF dahil)
clean-all: clean
	@rm -f output/thesis.pdf output/thesis.tex
	@echo "✅ Tüm çıktı dosyaları temizlendi"

# Değişiklikleri izle
watch:
	@echo "👀 Dosya değişiklikleri izleniyor..."
	@npm run watch

# LaTeX kontrolü
check-latex:
	@which pdflatex > /dev/null || (echo "❌ LaTeX bulunamadı. Lütfen LaTeX yükleyin." && exit 1)
	@echo "✅ LaTeX mevcut"

# Proje durumu
status:
	@echo "📊 Proje Durumu"
	@echo "==============="
	@echo -n "Node.js: "
	@which node > /dev/null && echo "✅ Mevcut" || echo "❌ Bulunamadı"
	@echo -n "npm: "
	@which npm > /dev/null && echo "✅ Mevcut" || echo "❌ Bulunamadı"
	@echo -n "LaTeX: "
	@which pdflatex > /dev/null && echo "✅ Mevcut" || echo "❌ Bulunamadı"
	@echo -n "Bağımlılıklar: "
	@test -d node_modules && echo "✅ Yüklü" || echo "❌ Yüklenmemiş"
	@echo -n "Çıktı dosyası: "
	@test -f output/thesis.tex && echo "✅ Mevcut" || echo "❌ Henüz oluşturulmamış"
	@echo -n "PDF dosyası: "
	@test -f output/thesis.pdf && echo "✅ Mevcut" || echo "❌ Henüz oluşturulmamış"

# Örnek kullanım
demo:
	@echo "🎬 Demo çalıştırılıyor..."
	@make clean-all
	@make init
	@make build
	@echo "🎉 Demo tamamlandı! output/thesis.pdf dosyasını kontrol edin."

# Development ortamı
dev: clean init watch