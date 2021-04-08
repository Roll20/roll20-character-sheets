$inputFile = 'D:\git\roll20-character-sheets\AD&D 2E Revised\raw\2ESheet-raw.html'
$jsFolderPath = 'D:\git\roll20-character-sheets\AD&D 2E Revised\javascript'
$outputFile = 'D:\git\roll20-character-sheets\AD&D 2E Revised\2ESheet.html'

$content = Get-Content -Path $inputFile

$inserts = ($content | Select-String -Pattern 'insert_')

$inserts | ForEach-Object {
   $content = $content -replace $_.Line, (Get-Content -Path "$($jsFolderPath)\$($_.Line.Split('_')[1])" -Raw)
}

$content | Set-Content -Path $outputFile
$time = Get-Date -Format "HH:mm:ss";
Write-Host "Combine complete $time" 