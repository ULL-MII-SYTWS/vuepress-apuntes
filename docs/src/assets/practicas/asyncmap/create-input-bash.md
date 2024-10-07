# Contenidos de `scripts/create-inputs.bash` de la práctica asyncmap

`➜  asyncmap-solution git:(main) ✗ cat scripts/create-inputs.bash`

```bash
#!/bin/bash

function help() {
  echo "Usage: $0 [numfiles(=3)] [size(=numfiles*3)]"
  echo "  numfiles: number of files to create"
  echo "  size: number of lines in the first file. Subsequent files 'i' will be of size: size-2*i"
  echo "  Files will be created in the test/ folder following the pattern test/f#number.txt"
  exit 0
}

function create() {
  local numfiles=3
  #echo $numfiles
  local size
  let size=numfiles*3
  #echo $size
  if [ -n "$1" ]; then
    numfiles=$1
    shift
    if [ -n "$1" ]; then
      size=$1
      shift
    fi
  fi
  for i in $(seq 1 ${numfiles}); do
    local sizeForFile
    let sizeForFile=$size-2*$i
    #echo $i $sizeForFile
    ./scripts/make-big-file.bash test/f${i}.txt ${sizeForFile} $i
  done
}

if [[ -n "$1" ]]; then
  if [[ $(echo "$1" | sed -E 's/--?h.*/-h/') == '-h' ]]; then
    help
  fi
fi

create "$@
```