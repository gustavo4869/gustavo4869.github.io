# Gera os PDFs do currículo (PT e EN) a partir de cv/curriculo-*.html, com o Chrome em modo headless.
# Uso: powershell -File cv\gerar-pdf.ps1
$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$cv = $PSScriptRoot
$destino = Join-Path (Split-Path $cv -Parent) "assets\cv"
New-Item -ItemType Directory -Force $destino | Out-Null

$saidas = @{
  "curriculo-pt.html" = "Curriculo_Gustavo_Ferreira.pdf"
  "curriculo-en.html" = "Resume_Gustavo_Ferreira.pdf"
}
foreach ($entrada in $saidas.Keys) {
  $uri = ([System.Uri](Join-Path $cv $entrada)).AbsoluteUri
  $pdf = Join-Path $destino $saidas[$entrada]
  & $chrome --headless=new --disable-gpu --no-pdf-header-footer "--print-to-pdf=$pdf" $uri | Out-Null
  Write-Host "$entrada -> $pdf"
}
