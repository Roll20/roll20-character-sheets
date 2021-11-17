$htmlFolder = 'D:\git\roll20-character-sheets\ADnD 2E Revised\html'
$javascriptFolder = 'D:\git\roll20-character-sheets\ADnD 2E Revised\javascript'

"---- Sanitize Javascript files ----"
Get-ChildItem $javascriptFolder | ForEach-Object {
    $_.Name
    $content = Get-Content -Raw $_.FullName

    $replace = $content -replace [Regex]::Escape("\\"), "\"
    $replace = $replace -replace [Regex]::Escape(" \n"), "\n"
    if ($replace -cne $content) {
        $replace | Set-Content -NoNewline -Path $_.FullName
    }
}
""

node buildPug.js

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