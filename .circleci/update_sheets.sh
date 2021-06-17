# Get the folder names from the list of files in the latest commit
last_commit=$(cat circleci-workspace/persist/last-commit)
echo "LAST COMMIT: ${last_commit}"
changed_files="$(git diff-tree --pretty="" -r --name-only ${last_commit} HEAD)"
echo "LAST COMMIT"
echo ">> ${last_commit}"
echo "CHANGED FILES"
echo ">> ${changed_files}"

folders=()
folder_regex='(^.*?)\/'
IFS=$'\n'
for file in $changed_files; do
	if [ "$file" == "approved.yaml" ];
		then
			echo ">>> Updating approved.yaml"
			curl -G \
				--data-urlencode "repo=roll20-character-sheets" \
				"https://${SERVICE_DOMAIN}/task/update_repo_metadata"
	fi
	folders+=("`grep -oP "$folder_regex" <<< "$file"`")
done

# Kind of hacky way to get a unique folder list
declare -A temp
for folder in "${folders[@]}"; do
	if [ "$folder" != "" ];
		then
			temp["$folder"]=1;
	fi
done
unique_folders=(${!temp[@]})

# Loop through each folder and send an update request
for folder in "${unique_folders[@]}"; do
	echo ">> ${folder}"
	curl -G \
		--data-urlencode "path=${folder//\/}" \
		--data-urlencode "repo=roll20-character-sheets" \
		"https://${SERVICE_DOMAIN}/task/update_sheet"
done
