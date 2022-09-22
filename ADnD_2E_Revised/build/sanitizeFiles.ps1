$htmlFolder = Join-Path $PSScriptRoot ".." "html"
$javascriptFolder = Join-Path $PSScriptRoot ".." "javascript"
$sassFolder = Join-Path $PSScriptRoot ".." "sass"
$cssFolder = Join-Path $PSScriptRoot ".." "css"

"---- Sanitize Javascript files ----"
Get-ChildItem -Path $javascriptFolder -Recurse -File | ForEach-Object {
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
Get-ChildItem -Path $htmlFolder -Recurse -File | ForEach-Object {
    $_.Name
    $content = Get-Content -Raw $_.FullName

    $replace = $content -replace [Regex]::Escape("â€™"), "'" #Weird encoding problem to match ’ character from PHB
    $replace = $content -replace [Regex]::Escape("\'"), "'"
    if ($replace -cne $content) {
        $replace | Set-Content -NoNewline -Path $_.FullName
    }
}
""

"---- Generating CSS files ----"
Get-ChildItem -Path $sassFolder -Recurse -File | ForEach-Object {
    $_.Name
    $cssFilename = [System.IO.Path]::GetFileNameWithoutExtension($_)
    $cssOutput = Join-Path $cssFolder "$cssFilename.css"
    sass --no-source-map $_.FullName $cssOutput
}
""

"---- Sanitize CSS files ----"
Get-ChildItem -Path $cssFolder -Recurse -File | ForEach-Object {
    $_.Name
    $content = Get-Content $_.FullName
    $content = $content -replace '^(  )[^ ].*', '$1$0' #makes indentation 4 spaces instead of 2
    $missingNewline = $content | Select-String -Pattern '^[^ /].*, .*'
    $missingNewline | ForEach-Object {
        $regex = "^" + [Regex]::Escape($_.Line) + "$"
        $content = $content -replace $regex, $_.Line.Replace(', ', ",`n")
    }
    $content | Set-Content -Path $_.FullName
}

""