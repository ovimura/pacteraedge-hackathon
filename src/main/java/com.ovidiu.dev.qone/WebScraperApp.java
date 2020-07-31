package com.ovidiu.dev.qone;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.IOException;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.jdbc.core.JdbcTemplate;

/**
 * A simple example, used on the jsoup website.
 * Url: https://www.baeldung.com/spring-boot-sqlite
 */
@SpringBootApplication
public class WebScraperApp implements CommandLineRunner {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    static List<String[]> ls;
    // https://stackoverflow.com/questions/38729016/java-how-can-i-use-jsoup-to-extract-headlines-from-a-news-page
    // https://stackoverflow.com/questions/34288372/parsing-google-news-in-java
    // https://stackoverflow.com/questions/35304577/parsing-nested-rss-xml-with-jsoup
    public static void main(String[] args) throws IOException {
        //Document doc = Jsoup.connect("http://en.wikipedia.org/").get();
        for(int i=0; i<args.length; i++)
            System.out.println(args[i]);
        String googleNewsUrl = "https://news.google.com/rss?hl=en-US&gl=US&ceid=US:en";
        String yahooNewsUrl = "https://www.yahoo.com/news/rss.xml";
        Document doc = Jsoup.connect(yahooNewsUrl).get();
        log(doc.title());
        ls = new ArrayList();
        Elements newsHeadlines = doc.select("rss channel item");
        String[] news = new String[4];
        for (Element headline : newsHeadlines) {
//            log("%s\n", headline.select("title").text());
//            log("%s\n", headline.select("timeAndDate").text());
//            log("%s\n", headline.select("source").text());
//            log("%s\n", headline.select("description").text());
            news[0] = headline.select("title").text();
            news[1] = headline.select("pubDate").text();
            news[2] = headline.select("source").attr("url"); //.text();
            news[3] = headline.select("link").text();

            ls.add(news);
            news = new String[4];
        }
        SpringApplication.run(WebScraperApp.class, args);
    }

    private static void log(String msg, String... vals) {
        System.out.println(String.format(msg, vals));
    }

    @Override
    public void run(String... args) throws Exception {
        jdbcTemplate.execute("CREATE TABLE IF NOT EXISTS news(title VARCHAR(100), timeAndDate VARCHAR(100), source VARCHAR(100), description VARCHAR(100))");

        for(int i=0; i<ls.size(); i++) {
//            System.out.println(ls.get(i)[0]+ " " +ls.get(i)[1]+ " " +ls.get(i)[2]+ " " +ls.get(i)[3]);
            jdbcTemplate.execute("INSERT INTO news VALUES (\""+ls.get(i)[0] +"\", \"" + ls.get(i)[1]+ "\", \""+ls.get(i)[2]+"\", \""+ls.get(i)[3]+"\")");
        }

        List<News> newsList = jdbcTemplate.query("SELECT * FROM news",
                (resultSet, rowNum) -> new News(resultSet.getString("title"), resultSet.getString("timeAndDate"),resultSet.getString("source"),resultSet.getString("description")));
        newsList.forEach(System.out::println);
    }
}
