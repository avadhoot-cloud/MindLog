# Define the paths
$backendPath = "D:\workspace_temp\MindLog\backend"
$frontendPath = "D:\workspace_temp\MindLog"

# Start backend server in a hidden window and store the process
if (Test-Path $backendPath) {
    Write-Output "Starting backend server..."
    $backendProcess = Start-Process powershell -WindowStyle Hidden -PassThru -ArgumentList "-Command", "cd $backendPath; npm start"
} else {
    Write-Output "Backend directory not found: $backendPath"
}

# Wait briefly for backend to start
Start-Sleep -Seconds 5

# Start Electron app in a hidden window
if (Test-Path $frontendPath) {
    Write-Output "Starting Electron app..."
    $frontendProcess = Start-Process powershell -WindowStyle Hidden -PassThru -ArgumentList "-Command", "cd $frontendPath; npm start"
} else {
    Write-Output "Frontend directory not found: $frontendPath"
}

# Wait for Electron app to close, then stop backend server
if ($frontendProcess) {
    Wait-Process -Id $frontendProcess.Id
}

# Stop backend server after Electron app closes
if ($backendProcess) {
    Stop-Process -Id $backendProcess.Id -Force
    Write-Output "Backend server stopped."
}

Write-Output "Both servers started and stopped successfully!"
