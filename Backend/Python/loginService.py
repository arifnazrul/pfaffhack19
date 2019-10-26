#Login 

from flask import Flask, jsonify, render_template, Response
from flask import request
from flask import json
import json
import requests

eventBroker = "194.94.239.125:9000"


def main(username, password):
    try:
        url = "http://%s/request" % eventBroker
        payload = "{\n \"type\": \"RetrieveDataByExampleCommand\",\n \"sender\": \"pm-storage-service\",\n \"payload\": {\n  \"example\": {\n   \"metadata\": {\n    \"creator\": \"ecowarriors\",\n    \"tags\" : [\"%s\",\"%s\"]\n   }\n  }\n }\n}" % (
            "namespace:ecowarriors-user_data", username)
        headers = {
            'content-type': "application/json"
        }

        response = requests.request("POST", url, data=payload, headers=headers)

        # print(response.text)
        parseData = json.loads(response.text)
        getpass = parseData['payload']['event']['result'][0]['data'][0]['password']

        if password == getpass:
            print("{message : successful login}")
            
            return jsonify({'message': 'successful login', 'userid': username})
            # return json.dumps("""{'message':'successful login','userid':'%s'}""" % username)
        else:
            print("{message : login failed}")
            return jsonify({'message': 'login failed'})
            
        
    except Exception as e:
        print (e)
        return jsonify({'message': 'login failed'})
         

def getNamespace():
    
    return ""


# main("user124", "user124")
