#!/bin/bash
files=`ls ./db/*.md`
rm -f ./db/dictionary.js
JSstring=()
echo $files
for eachfile in $files
do
  JSstring+="'$eachfile',"
done
echo "export default const files = ["$JSstring"];"  >> ./db/dictionary.js