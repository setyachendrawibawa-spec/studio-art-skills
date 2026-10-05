$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:8080/")
$listener.Start()
Write-Host "Studio Art Skills HTTP Server started on http://localhost:8080/"
Write-Host "Press Ctrl+C to stop the server."

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        $urlPath = $request.Url.LocalPath
        if ($urlPath -eq "/") { $urlPath = "/prototype.html" }
        
        $decodedPath = [System.Uri]::UnescapeDataString($urlPath)
        $filePath = Join-Path (Get-Location) $decodedPath.Substring(1)
        
        if (Test-Path $filePath -PathType Leaf) {
            $content = [System.IO.File]::ReadAllBytes($filePath)
            
            # Map Content-Type
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $contentType = "text/html"
            if ($ext -eq ".js") { $contentType = "text/javascript" }
            elseif ($ext -eq ".css") { $contentType = "text/css" }
            elseif ($ext -eq ".png") { $contentType = "image/png" }
            elseif ($ext -eq ".jpg" -or $ext -eq ".jpeg") { $contentType = "image/jpeg" }
            
            $response.ContentType = $contentType
            $response.ContentLength64 = $content.Length
            $response.OutputStream.Write($content, 0, $content.Length)
        } else {
            $response.StatusCode = 404
            $err = [System.Text.Encoding]::UTF8.GetBytes("File Not Found: " + $urlPath)
            $response.OutputStream.Write($err, 0, $err.Length)
        }
        $response.Close()
    } catch {
        Write-Host "Error serving request: $_"
    }
}
