
# Define Time for Scheduler
$Time=New-ScheduledTaskTrigger -At 11:10AM -Daily -DaysInterval 1

# Set Actions to be Performed During Execution
# $Action=New-ScheduledTaskAction -Execute PowerShell.exe -WorkingDirectory "C:/repos/pacteraedge-hackathon/pacteraedge-hackathon/target" -Argument "java -jar web-scraper-0.0.1-SNAPSHOT.jar -UserName omura -Password pass"

$Action=New-ScheduledTaskAction -Execute PowerShell.exe -WorkingDirectory "C:/repos/pacteraedge-hackathon/pacteraedge-hackathon/target" -Argument "java -jar web-scraper-0.0.1-SNAPSHOT.jar"



# Save Scheduler:

Register-ScheduledTask -TaskName "Run Java Web Scraper Daily" -Trigger $Time -Action $Action -RunLevel Highest


