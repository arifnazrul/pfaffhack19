#Dummy data generator!


import requests

eventBroker = "194.94.239.125:9000"

url = "http://%s/request" % eventBroker

payload = "{\r\n\t\"type\": \"PersistDataCommand\",\r\n\t\"sender\": \"ecowarriors\",\r\n\t\"payload\": {\r\n\t\t\"force\": false,\r\n\t\t\"storageObject\": {\r\n\t\t\t\"metadata\": {\r\n\t\t\t\t\"tags\":[\"namespace:ecowarriors-user_data_123\"]\r\n\t\t\t},\r\n\t\t\t\"data\":{\r\n\t\t\t\t\"userid\": \"user12343543543\",\r\n\t\t\t\t\"model_p\": \"hybrid\",\r\n\t\t\t\t\"carType_p\": \"asd\",\r\n\t\t\t\t\"typeOfFuel\": \"diesel\",\r\n\t\t\t\t\"manDate\" : \"20190101\"\r\n\t\t\t}\r\n\t\t}\r\n\t}\r\n}"
headers = {
    'content-type': "application/json",
    'cache-control': "no-cache",
    'postman-token': "4cd7d061-4050-fdcf-d228-0c2ee163d235"
}

response = requests.request("POST", url, data=payload, headers=headers)

print(response.status_code)
