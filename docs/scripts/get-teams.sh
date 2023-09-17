#!/bin/bash
ORG="ULL-MII-SYTWS-2324"
if [ $# -eq 1 ]; then
  ORG=$1
fi
TEAMS=$(gh org-teams -o "$ORG")
echo $TEAMS
