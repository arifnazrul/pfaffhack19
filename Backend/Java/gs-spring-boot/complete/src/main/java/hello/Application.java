package hello;

import java.util.Arrays;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;

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

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;


@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
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

    @Bean
    public CommandLineRunner commandLineRunner(ApplicationContext ctx) {
        return args -> {

            System.out.println("Let's inspect the beans provided by Spring Boot:");

            String[] beanNames = ctx.getBeanDefinitionNames();
            Arrays.sort(beanNames);
            for (String beanName : beanNames) {
                System.out.println(beanName);
            }

        };
    }

}
