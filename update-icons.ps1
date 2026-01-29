#!/usr/bin/env pwsh
# PowerShell script to add icon modernization scripts to all HTML pages

$pages = @(
    "patients\list.html",
    "patients\register.html",
    "patients\details.html",
    "patients\queue.html",
    "pharmacy\inventory.html",
    "pharmacy\prescriptions.html",
    "laboratory\requests.html",
    "billing\invoices.html",
    "reports\analytics.html"
)

$iconScripts = @"
  <script src="../assets/js/utils/icons.js"></script>
  <script src="../assets/js/utils/icon-init.js"></script>
"@

$iconStyles = @"
  <style>
    /* Icon Styles */
    .sidebar-logo-icon svg { width: 28px; height: 28px; }
    .nav-icon svg { width: 20px; height: 20px; }
    .search-icon svg { width: 18px; height: 18px; }
    .user-avatar svg { width: 20px; height: 20px; }
    .btn svg { width: 18px; height: 18px; }
    .badge svg { width: 14px; height: 14px; }
  </style>
"@

foreach ($page in $pages) {
    $fullPath = "C:\Users\WAKE FRANSISCA\Documents\Career path\WIK\HMS Demo\$page"
    
    if (Test-Path $fullPath) {
        $content = Get-Content $fullPath -Raw
        
        # Add icon scripts before other scripts if not already present
        if ($content -notmatch "icon-init.js") {
            $content = $content -replace '(<script src="../assets/js/core/storage.js")', "$iconScripts`n  `$1"
            
            # Add icon styles in head if not present
            if ($content -notmatch "Icon Styles") {
                $content = $content -replace '(</head>)', "$iconStyles`n`$1"
            }
            
            Set-Content -Path $fullPath -Value $content -NoNewline
            Write-Host "✓ Updated: $page" -ForegroundColor Green
        } else {
            Write-Host "○ Skipped (already updated): $page" -ForegroundColor Yellow
        }
    } else {
        Write-Host "✗ Not found: $page" -ForegroundColor Red
    }
}

Write-Host "`n✨ Icon modernization complete!" -ForegroundColor Cyan
