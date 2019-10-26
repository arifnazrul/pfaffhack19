import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;

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

        private static JSONObject buildRetrivalObject(String[] tags){
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

            String [] tag =new String[2];
            tag[0] ="namespace:ecowarriors-historical-data";
            tag[1] = user1;

            if (type.equals("weekly")){
                Sender.sendPost(buildRetrivalObject(tag));
            }else { if (type.equals("monthly")) {

                }else {

                }
            }

            return null;
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

