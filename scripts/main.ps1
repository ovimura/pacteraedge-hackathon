
# Define Time for Scheduler
$Time=New-ScheduledTaskTrigger -At 4AM -Daily -DaysInterval 1

# Set Actions to be Performed During Execution

$Action=New-ScheduledTaskAction -Execute PowerShell.exe -WorkingDirectory "C:/repos/pacteraedge-hackathon/pacteraedge-hackathon/scripts" -Argument "C:\repos\pacteraedge-hackathon\pacteraedge-hackathon\scripts\main.ps1 -UserName omura -Password pass"


# Save Scheduler:

Register-ScheduledTask -TaskName "Run Web Scraper Daily" -Trigger $Time -Action $Action -RunLevel Highest


