# Get the folder names from the list of files in the latest commit
last_commit=$(curl -Ss -u "${CIRCLECI_CHARSHEETS_API_KEY}:" "https://circleci.com/api/v1.1/project/github/Roll20/roll20-character-sheets?filter=completed&limit=1" | jq -r '.[0]["vcs_revision"]')
changed_files="$(git diff-tree --pretty="" -r --name-only ${last_commit} HEAD)"
folders=()
folder_regex='(^.*?)\/'
IFS=$'\n'
for file in $changed_files; do
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
