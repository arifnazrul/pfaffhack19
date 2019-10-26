#forecasting
#CODING IMPLICATIONS 
from statsmodels.tsa.ar_model import AR
from random import random
import requests
import json

eventBroker = "194.94.239.125:9000"

def main(userid):


    

    url = "http://%s/request" % eventBroker

    payload = "{\n \"type\": \"RetrieveDataByExampleCommand\",\n \"sender\": \"ecowarriors\",\n \"payload\": {\n  \"example\": {\n   \"metadata\": {\n   \t\"creator\": \"ecowarriors\",\n    \"tags\" : [\"namespace:ecowarriors-historical-data\" , \"%s\"]\n   }\n  }\n }\n}" % userid
    headers = {
        'content-type': "application/json"
        }

    response = requests.request("POST", url, data=payload, headers=headers)
    parseData = json.loads(response.text)
    getList = parseData['payload']['event']['result'][0]['data']

    data = list()
    for i in getList:
        print(i[
            "CO2-total"])
        data.append(float(i["CO2-total"]))

    model = AR(data)
    model_fit = model.fit()
    # make prediction
    yhat = model_fit.predict(len(data), len(data))
    print(yhat)
    return ""


main("user123")
