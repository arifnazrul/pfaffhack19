package hello;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.web.bind.annotation.*;
//import javax.json.stream;

import java.io.IOException;
import java.util.LinkedList;
import java.util.ListIterator;

@RestController
public class HelloController {
    
   /* @RequestMapping("/")
    public JSONObject index() {
        JSONObject res =new JSONObject();
        res.put("test","hallo");
        return res;
    }*/
   //@RequestMapping(value="/")

   @RequestMapping(value="/graphWeeḱly/{user1}",method = RequestMethod.GET )
    public <type> JSONObject graphWeekly(@PathVariable("user1") String user1){
        //updateStorage();
       JSONArray co2returnData=null;

        JSONArray tag =new JSONArray();
        tag.add("namespace:ecowarriors-historical-data") ;
        tag.add(user1);

            String retrive = Sender.sendPost(buildRetrivalObject(tag));
            LinkedList<String> co2Values = new LinkedList<>();
            int index = retrive.indexOf("CO2-total");
            while (index >= 0) {
                System.out.print(index);
                System.out.print(": "+retrive.substring(index,index+12));
                int endNumber = retrive.indexOf("\"",index+12);
                co2Values.addFirst(retrive.substring(index+12,endNumber));
                index = retrive.indexOf("CO2-total", index + 1);
            }
            co2returnData =new JSONArray();
            ListIterator<String> it = co2Values.listIterator(7);
            for (int i=0;i<7;i++){
                co2returnData.add(it.previous());
            }


        JSONObject graph = new JSONObject();
        graph.put("history",co2returnData);
        return graph;
    }

    @RequestMapping(value="/graphMonthly/{user1}",method = RequestMethod.GET )
    public <type> JSONObject graphMonthly(@PathVariable("user1") String user1){
        //updateStorage();
        JSONArray co2returnData=null;

        JSONArray tag =new JSONArray();
        tag.add("namespace:ecowarriors-historical-data") ;
        tag.add(user1);

        String retrive = Sender.sendPost(buildRetrivalObject(tag));
        LinkedList<String> co2Values = new LinkedList<>();
        int index = retrive.indexOf("CO2-total");
        while (index >= 0) {
            System.out.print(index);
            System.out.print(": "+retrive.substring(index,index+12));
            int endNumber = retrive.indexOf("\"",index+12);
            co2Values.addFirst(retrive.substring(index+12,endNumber));
            index = retrive.indexOf("CO2-total", index + 1);
        }
        co2returnData =new JSONArray();
        ListIterator<String> it = co2Values.listIterator(30);
        for (int i=0;i<30;i++){
            co2returnData.add(it.previous());
        }


        JSONObject graph = new JSONObject();
        graph.put("history",co2returnData);
        return graph;
    }

    //@RequestMapping(value="/updateStorage",method = RequestMethod.GET);//{newDist}",method = RequestMethod.GET )
    public  String updateStorage(/*@PathVariable("newDist") JSONObject data*/){
        JSONParser parser = new JSONParser();
       String stdata = "{ userid: user123, dist_r: fraunhofer platz 1;Kaiserslautern, dist_to_r: Mannheimer Strasse 10;Kaiserslautern, liter: 10, CO2-total: 50, timestemp: 20191025 }";
        JSONObject data=null;
        try {
           data = (JSONObject) parser.parse(stdata);
       } catch (ParseException e) {
           e.printStackTrace();
       }
        String userID = (String)data.get("userid");
        JSONObject jsonRetrive=new JSONObject();

        //JSONParser parser = new JSONParser();


        JSONArray co2returnData=null;

        JSONArray tag =new JSONArray();
        tag.add("namespace:ecowarriors-historical-data") ;
        tag.add(userID);

        String retrive = Sender.sendPost(buildRetrivalObject(tag));
        try {
            jsonRetrive = (JSONObject) parser.parse(retrive);
        } catch (ParseException e) {
            e.printStackTrace();
        }

        JSONObject payload =(JSONObject) jsonRetrive.get("payload");
        JSONObject event = (JSONObject) payload.get("event");
        JSONArray result = (JSONArray) event.get("result");
        JSONObject idWrapper = (JSONObject) result.get(0);
        String id =  (String) idWrapper.get("id");

        JSONArray history = (JSONArray) result.get(1);
        history.add(data);

        String jsonString = "{\n    \"type\": \"PersistDataCommand\",\n" +
                "    \"sender\": \"Pfaff-Commander\",\n" +
                "    \"payload\": {\n        \"force\": false,\n" +
                "        \"storageObject\": {\n" +
                "            \"id\": \""+id+"\",\n" +
                "            \"version\": 0,\n" +
                "            \"metadata\": {\n" +
                "            \t\"tags\": [\"test123\"]\n" +
                "            },\n" +
                "            \"data\": {\n" +history.toJSONString()+"}\n    }\n}";

        System.out.println("Update: "+jsonString);

        JSONObject graph = new JSONObject();
        graph.put("history",co2returnData);
        return "Arbeit is gemacht";
    }

    private static JSONObject buildRetrivalObject(JSONArray tags){
        JSONObject metadata = new JSONObject();
        metadata.put("creator","ecowarriors");
        metadata.put("tags",tags);

        JSONObject example = new JSONObject();
        example.put("metadata",metadata);

        JSONObject payload = new JSONObject();
        payload.put("example",example);

        String sender ="pm-storage-service";

        String type ="RetrieveDataByExampleCommand";

        JSONObject res = new JSONObject();
        res.put("payload",payload);
        res.put("sender",sender);
        res.put("type",type);

        System.out.println(res.toJSONString());

        return res;
    }
}
