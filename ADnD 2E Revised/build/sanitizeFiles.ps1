$htmlFolder = Join-Path $PSScriptRoot ".." "html"
$javascriptFolder = Join-Path $PSScriptRoot ".." "javascript"

"---- Sanitize Javascript files ----"
Get-ChildItem $javascriptFolder | ForEach-Object {
    $_.Name
    $content = Get-Content -Raw $_.FullName

    $replace = $content -replace [Regex]::Escape("\\"), "\"
    $replace = $replace -replace [Regex]::Escape(" \n"), "\n"
    $replace = $replace -replace [Regex]::Escape("[[[["), "[[ [["
    $replace = $replace -replace [Regex]::Escape("]]]]"), "]] ]]"
    if ($replace -cne $content) {
        $replace | Set-Content -NoNewline -Path $_.FullName
    }
}
""

$buildPug = Join-Path $PSScriptRoot "buildPug.js"
node $buildPug

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