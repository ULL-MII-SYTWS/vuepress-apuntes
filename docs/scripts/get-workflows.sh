#!/bin/bash
# gh workflow list -R ULL-MII-SYTWS/ull-mii-sytws.github.io
# NAME                    STATE   ID      
# pages-build-deployment  active  16440203
# I want a bash script that returns the ID of the workflow 


REPOS=("ULL-MII-SYTWS/ull-mii-sytws.github.io" "ULL-MII-SYTWS-2425/ull-mii-sytws-2425.github.io")

for REPONAME in "${REPOS[@]}"; do
  echo 
  echo "REPO: $REPONAME"
  WORKFLOWID=$(gh workflow list -R $REPONAME | awk '{print $3}')
  gh workflow view -R $REPONAME $WORKFLOWID | grep -v '^To see .*' | cat -
done

