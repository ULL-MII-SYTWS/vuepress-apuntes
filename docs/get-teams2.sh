#!/bin/bash
#ORG="ULL-MII-SYTWS-2223"
#ORG="ULL-MII-SYTWS-2324"

ORG="ULL-MII-SYTWS-2425"
TEAMS=$(gh org-teams -o "$ORG")
echo $TEAMS
