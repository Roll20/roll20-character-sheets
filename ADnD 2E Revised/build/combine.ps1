$sanitizeScript = Join-Path $PSScriptRoot "sanitizeFiles.ps1"
& $sanitizeScript

"---- Combining files ----"

$sourceFolder = Join-Path $PSScriptRoot ".."
$baseFile = Join-Path $sourceFolder "html" "2ESheet-base.html"
$outputFile = Join-Path $sourceFolder '2ESheet.html'

$replaceConstant = '#REPLACE{0}#'

function CreateReplaceDictionary([String[]] $split) {
   $replaceValues = $split[2..100];
   $dic = @{}
   for ($i=0; $i -lt $replaceValues.Length; $i++) {
      $replaceKey = $replaceConstant -f $i;
      $replaceValue = $replaceValues[$i];
      if ( $replaceValue.StartsWith("repeating"))
      {
         $replaceValue = $replaceValue.Replace("-", "_") #Allows for repeating section inserts
      }
      $dic.Add($replaceKey, $replaceValue)
   }
   return $dic
}

function CombineRecursive([String[]] $inputContent) {
   $content = $inputContent | Select-String -Pattern "^module\.exports.*;" -NotMatch

   $inserts = ($content | Select-String -Pattern 'insert_')
   if ($inserts.Length -lt 1) {
      return $content
   }

   $inserts | ForEach-Object {
      Write-Host $_.Line.Trim()
      $split = $_.Line.Split('_')
      $whiteSpace = $split[0].Replace('insert', '')
      $fileName = $split[1]
      $file = Get-ChildItem -Path $sourceFolder -Filter $fileName -Recurse
      $fileContent = Get-Content -Path $file.FullName

      $replaceDic = CreateReplaceDictionary($split)

      for ($i = 0; $i -lt $fileContent.Length; $i++)
      {
         # Add whitespace
         $fileContent[$i] = $whiteSpace + $fileContent[$i]
         # Replace values
         if ($fileContent[$i].Contains("#REPLACE")) {
            foreach ($key in $replaceDic.Keys) {
               $fileContent[$i] = $fileContent[$i].Replace($key, $replaceDic[$key])
            }
         }
      }
      # Remove unused replace keys
      for ($i = 0; $i -lt $fileContent.Length; $i++) {
         $fileContent[$i] = $fileContent[$i] -replace "\#REPLACE\d+\#", ""
      }

      $combinedContent = CombineRecursive -inputContent $fileContent
      $rawContent = $combinedContent -join "`n"

      $regex = "^" + [Regex]::Escape($_.Line) + "$"
      $content = $content -replace $regex, $rawContent
   }
   return $content
}

$inputContent = Get-Content -Path $baseFile
$outputContent = CombineRecursive -inputContent $inputContent
$outputContent | Set-Content -Path $outputFile
$time = Get-Date -Format "HH:mm:ss";
Write-Host "Combine complete $time"