default: version

version:
	cat sheet.json|  jq ". += {\"version\":\"$(shell date +%s)\"}" | tee sheet.json