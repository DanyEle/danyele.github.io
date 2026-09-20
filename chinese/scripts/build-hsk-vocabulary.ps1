$ErrorActionPreference = "Stop"

$sourceRoot = "https://raw.githubusercontent.com/jelleverheyen/hsk-vocabulary/main/wordlists/inclusive/old"
$outputPath = Join-Path $PSScriptRoot "..\hsk-vocabulary.js"
$levels = [ordered]@{}

foreach ($level in 1..5) {
  $entries = Invoke-RestMethod "$sourceRoot/$level.json"
  $levels["$level"] = @($entries | ForEach-Object {
    $form = $_.forms[0]
    [ordered]@{
      hanzi = $_.simplified
      pinyin = $form.transcriptions.pinyin
      english = ($form.meanings -join "; ")
      pos = @($_.pos)
      frequency = $_.frequency
    }
  })
}

$json = $levels | ConvertTo-Json -Depth 6 -Compress
$banner = "/* Generated from jelleverheyen/hsk-vocabulary (MIT). Run scripts/build-hsk-vocabulary.ps1 to refresh. */`n"
[System.IO.File]::WriteAllText($outputPath, $banner + "window.HSK_VOCABULARY = " + $json + ";`n", [System.Text.UTF8Encoding]::new($false))
