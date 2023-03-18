import os
from flask import Flask
from flask import request

import json
app = Flask(__name__)



@app.get("/webhook")
def webhook():
    #os.system("git pull")
    return "clear."



@app.post("/std")
def hello():
    #args = request.args
    c = "0"
    if "temp" in request.json:
        f = open("tmp/list.dat", "a")
        c =  str(request.get_json())
        f.write('\n')
        f.write(c)
        f.close()
        return "temperature submitted."
    else:
        return "nothing found."

@app.get("/read")
def read():
    _strr = ""
    f = open("tmp/list.dat", "r")
    ff = f.readlines()
    for i in ff:
        _strr += "</br>" + i

    f.close()
    return  _strr

@app.get("/readAPI")
def readAPI():
    _strr = ""
    f = open("tmp/list.dat", "r")
    ff = f.readlines()
    f.close()
    return  ff

@app.get("/delete")
def delete():
    open("tmp/list.dat", "w").close()
    return "clear."


@app.post("/test")
def test():
    if "temp" in request.json:
        return "!!!!"
    else:
        return request.json

