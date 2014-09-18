for file in *.md; do
	echo "====== Reading file: ${file} ======"
	while read line; do

		url=$(echo "$line" | sed s/.*\(// | sed s/\)// | sed s/^##.*//)

		if [[ ! -z "$url" ]]; then
			echo "- Checking URL: ${url}"
			curl -s --head "${url}" | head -n 1 | grep "HTTP/1.[01] [^23].."
		fi
	done <"$file"
done