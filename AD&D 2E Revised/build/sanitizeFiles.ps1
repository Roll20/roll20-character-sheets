$htmlFolder = 'D:\git\roll20-character-sheets\AD&D 2E Revised\html'
$javascriptFolder = 'D:\git\roll20-character-sheets\AD&D 2E Revised\javascript'

"---- Sanitize HTML files ----"
Get-ChildItem $htmlFolder | ForEach-Object {
    $_.Name
    $content = Get-Content -Raw $_.FullName

    $replace = $content -replace [Regex]::Escape("â€™"), "'" #Weird encoding problem to match ’ character from PHB
    $replace = $content -replace [Regex]::Escape("\'"), "'"
    if ($replace -cne $content) {
        $replace | Set-Content -NoNewline -Path $_.FullName
    }
}

""
"---- Sanitize Javascript files ----"
Get-ChildItem $javascriptFolder | ForEach-Object {
    $_.Name
    $content = Get-Content -Raw $_.FullName

    $replace = $content -replace [Regex]::Escape("\\"), "\"
    if ($replace -cne $content) {
        $replace | Set-Content -NoNewline -Path $_.FullName
    }
}
""