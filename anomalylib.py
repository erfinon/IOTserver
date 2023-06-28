import requests
def add(data):
    response = requests.post("http://gh.gh6024.ir:3000/logAnomaly", json=data)
    if(response.status_code != 201): 
        f = open("PROGERROR", "a")
        f.write("response status is : "+str(response.status_code))
        f.close()
add("""
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