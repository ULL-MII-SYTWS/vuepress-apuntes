---
---
# Git Orphan Branch

Normally **orphan** are needed when 
you do not want to initiate a branch from a source branch.

Follow these steps to create a working **orphan branch**:

1. `git checkout — orphan <orphan-branch-name>`
2. `git rm -rf` .
3. Add your files or unzip the zip file in the working directory or copy the files you want to have in the orphan branch.
4. `git add .`
5. `git commit -m "commit message"`
6. `git push origin <orphan-branch-name>`

