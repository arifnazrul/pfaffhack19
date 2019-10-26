package hello;

import okhttp3.*;
import org.json.simple.JSONObject;
//import com.squareup.okhttp.*;

import java.io.IOException;

public class Sender {


    public static String sendPost(JSONObject pay){
        OkHttpClient client = new OkHttpClient();
        String textResponds=null;

        MediaType mediaType = MediaType.parse("application/json");
        RequestBody body = RequestBody.create(mediaType,pay.toJSONString() );
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
            //System.out.println("response"+response.body().string());
            textResponds = response.body().string();
        }catch (IOException e){
            System.out.println("IO Exception");
        }
        return textResponds;
    }
}
