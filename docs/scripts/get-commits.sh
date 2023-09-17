#!/bin/bash
set -e
# install gh-org-commits extension
DATE="2022-30-01"
lab="iaas"
ORG=ULL-ESIT-PL-2223
gh org-commits -f _data/team-names.txt -d $DATE -l $lab -o $ORG
