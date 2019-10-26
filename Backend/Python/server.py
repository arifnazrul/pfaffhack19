#main python api service 

from flask import Flask, jsonify, render_template, Response
from flask import request
from flask import json
import loginService
import formsService

app = Flask(__name__)

url = 'http://127.0.0.1'
port = '5000'
baseUrl = url+':'+port+'/'


@app.route('/', methods=['GET'])
def root():
    #    return Response(render_template('index.html',url = baseUrl, mimetype='text/html'))
    return jsonify({'Message': 'Sample REST Api'})


@app.route('/login', methods=['POST'])
def login_service():
    json_ = request.json
    userid = json_["username"]
    password = json_["password"]
    print (userid)
    
    return jsonify(loginService.main(userid, password))


@app.route('/form', methods=['POST'])
def form_service():
    json_ = request.json
    userid = json_["userid"]
    model_p = json_["model_p"]
    carType_p = json_["carType_p"]
    typeOfFuel_p = json_["typeOfFuel_p"]
    manDate_p = json_["manDate_p"]
    typeOfHeat_p = json_["typeOfHeat_p"]
    startHeat_p = json_["startHeat_p"]
    endHeat_p = json_["endHeat_p"]
    heatinLevel_p = json_["heatinLevel_p"]
    distTo = json_["distTo"]
    distFrom = json_["distFrom"]
    litresUsed = json_["litresUsed"]

    return jsonify(formsService.saveForm(userid, model_p, carType_p, typeOfFuel_p, manDate_p, typeOfHeat_p, startHeat_p, endHeat_p, heatinLevel_p, distTo, distFrom, litresUsed))



if __name__ == '__main__':
    app.run(host='0.0.0.0')
 
