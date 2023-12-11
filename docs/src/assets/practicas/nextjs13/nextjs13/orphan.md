# Git Orphan Branch

Normally orphan or empty branches are needed when 
you do not want to initiate a branch from a source branch.

Follow these steps to create a working **orphan branch**:

1. `git checkout — orphan <orphan-branch-name>`
2. `git rm -rf` .
3. `git commit — allow-empty -m "commit message"`
4. `git push origin <orphan-branch-name>`

