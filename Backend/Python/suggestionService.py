#suggestions

from flask import Flask, jsonify, render_template, Response
from flask import request
from flask import json
import json
import requests

eventBroker = "194.94.239.125:9000"

def main():
    try:
        url = "http://%s/request" % eventBroker
        
        payload = "{\n \"type\": \"RetrieveDataByExampleCommand\",\n \"sender\": \"ecowarriors\",\n \"payload\": {\n  \"example\": {\n   \"metadata\": {\n    \"creator\": \"ecowarriors\",\n    \"tags\" : [\"namespace:ecowarriors-suggestions\"]\n   }\n  }\n }\n}"

        headers = {
            'content-type': "application/json"
        }

        response = requests.request("POST", url, data=payload, headers=headers)

        # print(response.text)
        parseData = json.loads(response.text)
        getTimings = parseData['payload']['event']['result'][0]['data']

        return jsonify({'message': getTimings})
        # return json.dumps("{message : %s}" % getTimings)
        
    except Exception as e:
        print(e)
        return jsonify({'message': 'login failed'})
        # return json.dumps("{message : error occured!}")
