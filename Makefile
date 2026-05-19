PORT ?= 8080

.PHONY: serve open clean help

help:
	@echo "Targets:"
	@echo "  serve   Run a static web server on http://localhost:$(PORT)"
	@echo "  open    Open the running site in the default browser"
	@echo "  clean   Remove macOS .DS_Store files"

serve:
	@echo "Serving qr-code at http://localhost:$(PORT)"
	@python3 -m http.server $(PORT)

open:
	@open http://localhost:$(PORT)

clean:
	@find . -name '.DS_Store' -delete
