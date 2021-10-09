& 'D:\git\roll20-character-sheets\AD&D 2E Revised\build\sanitizeFiles.ps1'

"---- Combining files ----"
$inputFile = 'D:\git\roll20-character-sheets\AD&D 2E Revised\html\2ESheet-base.html'
$sourceFolder = 'D:\git\roll20-character-sheets\AD&D 2E Revised'
$outputFile = 'D:\git\roll20-character-sheets\AD&D 2E Revised\2ESheet.html'

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
   $replaces = $split[2..100];
   for ($i=0; $i -lt $replaces.Length; $i++) {
      $replace = $replaceConstant -f $i;
      $rawContent = $rawContent.Replace($replace, $replaces[$i])
   }
   $rawContent = $rawContent -replace "\#REPLACE\d+\#", ""
   
   $regex = "^" + [Regex]::Escape($_.Line) + "$"
   $content = $content -replace $regex, $rawContent
}

$content | Set-Content -Path $outputFile
$time = Get-Date -Format "HH:mm:ss";
Write-Host "Combine complete $time" 