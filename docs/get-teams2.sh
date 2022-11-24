#!/bin/bash
ORG="ULL-MII-SYTWS-2223"
TEAMS=$(gh org-teams -o "$ORG")
echo $TEAMS
