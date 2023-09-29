default: version

version:
	cat sheet.json|  jq ". += {\"version\":\"$(date +%s)\"}" | tee sheet.json

