#!/bin/bash
set -e
# install gh-org-commits extension

DATE="2022-11-23"
lab="building-async-await"
ORG=ULL-MII-SYTWS-2223
# ORG=ULL-MII-SYTWS-2223
gh org-commits -f student-names.txt -l $lab -o $ORG -d $DATE
