#!/bin/bash
REPOS=("repo1" "repo2" "repo3")

# All elements
echo "${REPOS[@]}"  # Output: repo1 repo2 repo3

for REPO in "${REPOS[@]}"; do
  echo "REPO: $REPO"
done

# First element
echo "First repo: ${REPOS[0]}"  # Output: repo1. Does not work in zsh
# in zsh use ${REPOS[1]} instead of ${REPOS[0]}

# Number of elements
echo "length: ${#REPOS[@]}"  # Output: 3

# Slice of the array (second and third elements)
echo "repos from 1 to 2: ${REPOS[@]:1:2}"  # Output: repo2 repo3

# Last element
echo "last repo: ${REPOS[@]: -1}"  # Output: repo3