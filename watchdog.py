import requests
statusurl = "http://localhost:3000/Status"
STATUS = requests.get(statusurl).json()
tempurl = "http://localhost:3000/getLASTweather"
TEMPS = requests.get(tempurl).json()




print(STATUS["status"])
print(TEMPS["temperatures"])
 


changeStatus = "http://localhost:3000/changeStatus"
todo = {"_id": "1","status": "1010110000"}
response = requests.post(changeStatus, json=todo)


print(response.status_code)
print(response.text)