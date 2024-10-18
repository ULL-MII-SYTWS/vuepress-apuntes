#!/bin/bash
# Outputs the commits for a given lab
ROOT="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )/.."
LAB=$1
echo "Getting commits for lab $LAB"

# Excute this once per course:
# ./scripts/get-team-names.sh > $ROOT/sytws2425-teams.txt

# gh org-commits -o ULL-MII-SYTWS-2425    \
#      -l $LAB \
#      -f ./sytws2425-teams.txt -t > $ROOT/src/.vuepress/labs/${LAB}.json
# echo "Output is left at: $ROOT/src/.vuepress/labs/${LAB}.json"

gh org-commits -o ULL-MII-SYTWS-2425    \
     -l $LAB \
     -f ./sytws2425-teams.txt -t 2> /dev/null | jq -s '.[] | sort_by(.total) | reverse' | tee $ROOT/src/.vuepress/labs/${LAB}.json
