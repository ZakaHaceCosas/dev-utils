set -e

workspaces=("string" "number" "perf" "http" "geo" "entity")

for w in "${workspaces[@]}"
do
    cd "$w"
    npm publish
    cd ..
done

cd ..
