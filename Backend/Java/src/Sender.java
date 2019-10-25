import org.json.simple.JSONObject;
import com.squareup.okhttp.*;

import java.io.IOException;

public class Sender {

    public static void sendPost(JSONObject pay){
    OkHttpClient client = new OkHttpClient();

    MediaType mediaType = MediaType.parse("application/json");
    RequestBody body = RequestBody.create(mediaType, "{\n\t\"type\": \"PersistDataCommand\",\n\t\"sender\": \"ecowarriors\",\n\t\"payload\": {\n\t\t\"force\": false,\n\t\t\"storageObject\": {\n\t\t\t\"metadata\": {\n\t\t\t\t\"tags\":[\"namespace:ecowarriors-historical-data\", \"user125\"]\n\t\t\t},\n\t\t\t\"data\":\n[{  \"userid\": \"user125\", \"dist_r\": \"Triftstrasse 7;Kaiserslautern\", \"dist_to_r\": \"Trippstadter Strasse 18;Kaiserslautern\", \"liter\":\"5\", \"CO2-total\" :\"40\",\"timestemp\" :\"20190924\" },\n{ \"userid\": \"user125\", \"dist_r\": \"Triftstrasse 7;Kaiserslautern\", \"dist_to_r\": \"Trippstadter Strasse 18;Kaiserslautern\", \"liter\": \"4\", \"CO2-total\" :\"40.5\",\"timestemp\" :\"20190925\" },\n{ \"userid\": \"user125\", \"dist_r\": \"Triftstrasse 7;Kaiserslautern\", \"dist_to_r\": \"Trippstadter Strasse 18;Kaiserslautern\", \"liter\": \"3\", \"CO2-total\" :\"41.6\",\"timestemp\" :\"20190926\" },\n{  \"userid\": \"user125\", \"dist_r\": \"Triftstrasse 7;Kaiserslautern\", \"dist_to_r\": \"Trippstadter Strasse 18;Kaiserslautern\", \"liter\": \"5\", \"CO2-total\" :\"42.5\",\"timestemp\" :\"20190927\" },\n{\"userid\": \"user125\", \"dist_r\": \"Triftstrasse 7;Kaiserslautern\", \"dist_to_r\": \"Trippstadter Strasse 18;Kaiserslautern \", \"liter\": \"4\", \"CO2-total\" :\"45\",\"timestemp\" :\"20190928\" },\n{ \"userid\": \"user125\", \"dist_r\": \"Triftstrasse 7;Kaiserslautern\", \"dist_to_r\": \"Trippstadter Strasse 18;Kaiserslautern\", \"liter\": \"3\", \"CO2-total\" :\"46.5\",\"timestemp\" :\"20190929\" },\n{ \"userid\": \"user125\", \"dist_r\": \"Triftstrasse 7;Kaiserslautern\", \"dist_to_r\": \"Trippstadter Strasse 18;Kaiserslautern\", \"liter\": \"5\", \"CO2-total\" :\"47\",\"timestemp\" :\"20190930\" }]\n\t\t\t\n\t\t}\n\t}\n}");
    Request request = new Request.Builder()
            .url("http://194.94.239.125:9000/request")
            .post(body)
            .addHeader("Content-Type", "application/json")
            .addHeader("User-Agent", "PostmanRuntime/7.18.0")
            .addHeader("Accept", "*/*")
            .addHeader("Cache-Control", "no-cache")
            .addHeader("Postman-Token", "a9502a19-5b1d-43d3-9b18-3ac3b40982aa,22bb214c-8724-4744-93aa-b4639c3341c9")
            .addHeader("Host", "194.94.239.125:9000")
            .addHeader("Accept-Encoding", "gzip, deflate")
            .addHeader("Content-Length", "1492")
            .addHeader("Connection", "keep-alive")
            .addHeader("cache-control", "no-cache")
            .build();
    try {
        Response response = client.newCall(request).execute();
    }catch (IOException e){
        System.out.println("IO Exception");
    }
    }

}
