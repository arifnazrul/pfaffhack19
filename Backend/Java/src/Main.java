import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.ListIterator;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;



public class Main {

        @SuppressWarnings("unchecked")
        public static void main(String[] args)
        {
            /*//JSON parser object to parse read file
            JSONParser jsonParser = new JSONParser();

            try (FileReader reader = new FileReader("test.json"))
            {
                //Read JSON file
                Object obj = jsonParser.parse(reader);

                JSONObject employeeList = (JSONObject) obj;
                System.out.println(employeeList);

               parseHistoricalDataObject( employeeList );

            } catch (FileNotFoundException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            } catch (ParseException e) {
                e.printStackTrace();
            }*/

            JSONObject user1 =new JSONObject();
            user1.put("user","user123");
            user1.put("type","weekly");

            graph (user1);
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

        public static JSONObject graph(JSONObject user){
            String user1=(String) user.get("user");
            String type = (String) user.get("type");
            JSONArray co2returnData=null;

            JSONArray tag =new JSONArray();
            tag.add("namespace:ecowarriors-historical-data") ;
            tag.add(user1);

            if (type.equals("weekly")){
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
            }else { if (type.equals("monthly")) {

                }else {

                }
            }
            JSONObject graph = new JSONObject();
            graph.put("history",co2returnData);
            return graph;
        }

        private static void parseHistoricalDataObject(JSONObject histData)
        {
            //Get employee object within list
            String type = (String) histData.get("type");
            System.out.printf("Type %s\n",type);
            String sender = (String) histData.get("sender");
            System.out.printf("Sender %s\n",sender);
            //Get employee first name
            JSONObject payload = (JSONObject) histData.get("payload");
            JSONObject event = (JSONObject) payload.get("event");
            JSONArray result = (JSONArray) event.get("result");

            for (Object res:result) {
                JSONObject tmp = ((JSONObject)res);
                String id = (String)tmp.get("id");
                System.out.println("ID of result: "+id);
            }

        }
    }

