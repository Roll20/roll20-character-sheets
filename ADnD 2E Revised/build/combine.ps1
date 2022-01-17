$sanitizeScript = Join-Path $PSScriptRoot "sanitizeFiles.ps1"
& $sanitizeScript

"---- Combining files ----"

$sourceFolder = Join-Path $PSScriptRoot ".."
$inputFile = Join-Path $sourceFolder "html" "2ESheet-base.html"
$outputFile = Join-Path $sourceFolder '2ESheet.html'

$replaceConstant = '#REPLACE{0}#'

$content = Get-Content -Path $inputFile

$inserts = ($content | Select-String -Pattern 'insert_')

$inserts | ForEach-Object {
   $_.Line.Trim()
   $split = $_.Line.Split('_')
   $whiteSpace = $split[0].Replace('insert', '')
   $fileName = $split[1]
   $file = Get-ChildItem -Path $sourceFolder -Filter $fileName -Recurse
   $fileContent = Get-Content -Path $file.FullName
   if ($whiteSpace.Length -gt 0) {
      for ($i = 0; $i -lt $fileContent.Length; $i++)
      {
         $fileContent[$i] = $whiteSpace + $fileContent[$i]
      }
   }
   $rawContent = $fileContent -join "`n"
   $replaceValues = $split[2..100];
   for ($i=0; $i -lt $replaceValues.Length; $i++) {
      $replaceKey = $replaceConstant -f $i;
      $replaceValue = $replaceValues[$i];
      if ($replaceValue.StartsWith("repeating")) {
         $replaceValue = $replaceValue.Replace("-", "_") #Allows for repeating section inserts
      }
      $rawContent = $rawContent.Replace($replaceKey, $replaceValue)
   }
   $rawContent = $rawContent -replace "\#REPLACE\d+\#", ""
   $rawContent = $rawContent -replace "\r?\nmodule\.exports.*;", ""
   
   $regex = "^" + [Regex]::Escape($_.Line) + "$"
   $content = $content -replace $regex, $rawContent
}

$content | Set-Content -Path $outputFile
$time = Get-Date -Format "HH:mm:ss";
Write-Host "Combine complete $time" 