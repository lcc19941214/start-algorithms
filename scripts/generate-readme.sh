#!/bin/bash

root=$(pwd)
README="$root/README.md"
echo -e '# Start Algorithms\n' >$README

function generate() {
  local DIR=$1
  local anchor=$2
  local CUR_DIRNAME=$(basename $DIR)
  local filenames=$(ls $DIR)
  local dirs=()

  for filename in ${filenames[@]}; do
    local dir="$DIR/$filename"
    # skip __test__
    if [[ -d $dir && $filename != '__tests__' ]]; then
      dirs=(${dirs[@]} $filename)
    fi
  done

  local readme="$DIR/README.md"
  if [ -e $readme ]; then
    if [ ${#dirs[@]} == 0 ]; then
      echo "- [$CUR_DIRNAME]($readme)" >>$README
    else
      echo -e "$anchor [$CUR_DIRNAME]($readme)" >>$README
    fi
  else
    if [ ${#dirs[@]} != 0 ]; then
      echo -e "$anchor $CUR_DIRNAME" >>$README
    fi
  fi

  for dir in ${dirs[@]}; do
    local dir="$DIR/$dir"
    generate "$dir" "$anchor#"
  done
}

# skip src
for dir in `ls ./src`
do
  generate "./src/$dir" '##'
done

echo 'done'
