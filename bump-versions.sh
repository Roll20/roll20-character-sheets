#!/bin/bash
for D in *; do
    if [ -d "${D}" ]; then
        test "$D" = contrib && continue;
        cat "${D}/sheet.json" |  jq ". += {\"version\":\"$(date +%s)\"}" | tee "${D}/sheet.json";
    fi
done

