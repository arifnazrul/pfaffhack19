#Form

from flask import Flask, jsonify, render_template, Response
from flask import request
from flask import json
import json
import requests

eventBroker = "194.94.239.125:9000"

def saveForm(userid, model_p, carType_p, typeOfFuel_p, manDate_p, typeOfHeat_p, startHeat_p, endHeat_p, heatinLevel_p, distTo, distFrom, litresUsed):
    url = "http://%s/request" % eventBroker

    payload = "{\r\n\t\"type\": \"PersistDataCommand\",\r\n\t\"sender\": \"ecowarriors\",\r\n\t\"payload\": {\r\n\t\t\"force\": false,\r\n\t\t\"storageObject\": {\r\n\t\t\t\"metadata\": {\r\n\t\t\t\t\"tags\":[\"namespace:ecowarriors-user_data\",\"%s\"]\r\n\t\t\t},\r\n\t\t\t\"data\":[{\r\n\t\t\t\t\"userid\": \"%s\",\r\n\t\t\t\t\"password\" : \"%s\",\r\n\t\t\t\t\"model_p\": \"%s\",\r\n\t\t\t\t\"carType_p\": \"%s\",\r\n\t\t\t\t\"typeOfFuel_p\": \"%s\",\r\n\t\t\t\t\"manDate_p\" : \"%s\",\r\n\t\t\t\t\"typeOfHeat_p\" : \"%s\",\r\n\t\t\t\t\"startHeat_p\" : \"%s\",\r\n\t\t\t\t\"endHeat_p\" : \"%s\",\r\n\t\t\t\t\"heatinLevel_p\" : \"%s\"\r\n\t\t\t},\r\n\t\t\t{\t\r\n\t\t\t\t\"distTo\" : \"%s\",\r\n\t\t\t\t\"distFrom\" : \"%s\",\r\n\t\t\t\t\"litresUsed\" : \"%s\"\r\n\t\t\t}]\r\n\t\t}\r\n\t}\r\n}" % (
        userid, userid, userid, model_p, carType_p, typeOfFuel_p, manDate_p, typeOfHeat_p, startHeat_p, endHeat_p, heatinLevel_p, distTo, distFrom, litresUsed)
    headers = {
        'content-type': "application/json",
        'cache-control': "no-cache",
        'postman-token': "1209de54-4af9-cbbb-0286-ace35342e8ee"
    }

    response = requests.request("POST", url, data=payload, headers=headers)
    print (response.text)
    return "User Successfully Created"

#saving data on historic data storage
#SOREN IMPLEMENTATION
# def updateForm(userid, distTo, distFrom, litresUsed):

#     return ""



