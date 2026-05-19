# Makefile

PORT ?= 8080

## HELP:
.PHONY: help
## help: Show this help message.
help:
	@echo "Usage: make [target]\n"
	@sed -n 's/^##//p' ${MAKEFILE_LIST} | sed 's/:/|/' | column -t -s '|' | sed -e 's/^/ /'

## :
## SERVE:

.PHONY: serve
## serve: Run a static web server on http://localhost:$(PORT).
serve:
	@echo "Serving qr-code at http://localhost:$(PORT)"
	@python3 -m http.server $(PORT)

.PHONY: open
## open: Open the running site in the default browser.
open:
	@open http://localhost:$(PORT)

## :
