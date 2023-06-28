import requests
import anomalylib
statusurl = "http://gh.gh6024.ir:3000/Status"
STATUS = requests.get(statusurl).json()

R1 = STATUS["status"][1]
R2 = STATUS["status"][2]
R3 = STATUS["status"][3]
R4 = STATUS["status"][4]

anomalylib.add("""
                {
            "_id":"",
            "title":"error test",
            "level":0,
            "desc":"test",
            "detectorID":"SYSTEM/WATCHDOGS/wd1",
            "forwardedHead":""
            "spotTime":"",
            "retrieveTime":""
            "metadata":"",
            "logStatus":""
            "logDesc":""
          }
          """)
            
"""
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

"""