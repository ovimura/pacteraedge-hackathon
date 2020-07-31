package com.ovidiu.dev.qone;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.IOException;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.jdbc.core.JdbcTemplate;

/**
 * A web scraper jar.
 * References:
 * Url: https://www.baeldung.com/spring-boot-sqlite
 *     https://stackoverflow.com/questions/38729016/java-how-can-i-use-jsoup-to-extract-headlines-from-a-news-page
 *     https://stackoverflow.com/questions/34288372/parsing-google-news-in-java
 *     https://stackoverflow.com/questions/35304577/parsing-nested-rss-xml-with-jsoup
 */
@SpringBootApplication
public class WebScraperApp implements CommandLineRunner {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    static List<String[]> yahoonews;
    static List<String[]> googlenews;
    public static void main(String[] args) throws IOException {
        String googleNewsUrl = "https://news.google.com/rss?hl=en-US&gl=US&ceid=US:en";
        String yahooNewsUrl = "https://www.yahoo.com/news/rss.xml";
        Document docyahoo = Jsoup.connect(yahooNewsUrl).get();
        // log(docyahoo.title());
        yahoonews = new ArrayList();
        Elements newsHeadlines = docyahoo.select("rss channel item");
        String[] news = new String[4];
        for (Element headline : newsHeadlines) {
            news[0] = headline.select("title").text();
            news[1] = headline.select("pubDate").text();
            news[2] = headline.select("source").attr("url"); //.text();
            news[3] = headline.select("link").text();
            yahoonews.add(news);
            news = new String[4];
        }
        Document docgoogle = Jsoup.connect(googleNewsUrl).get();
        // log(docgoogle.title());
        googlenews = new ArrayList();
        Elements newsHeadlinesg = docgoogle.select("rss channel item");
        String[] newsg = new String[4];
        for (Element hl : newsHeadlinesg) {
            newsg[0] = hl.select("title").text();
            newsg[1] = hl.select("pubDate").text();
            newsg[2] = hl.select("source").attr("url"); //.text();
            newsg[3] = hl.select("link").text();
            googlenews.add(newsg);
            newsg = new String[4];
        }
        SpringApplication.run(WebScraperApp.class, args);
    }

    private static void log(String msg, String... vals) {
        System.out.println(String.format(msg, vals));
    }

    @Override
    public void run(String... args) throws Exception {
        jdbcTemplate.execute("CREATE TABLE IF NOT EXISTS news(id INTEGER PRIMARY KEY AUTOINCREMENT, title VARCHAR(100), timeAndDate VARCHAR(100), source VARCHAR(100), link VARCHAR(100))");

        for(int i=0; i<yahoonews.size(); i++) {
            jdbcTemplate.execute("INSERT INTO news (title, timeAndDate, source, link) VALUES (\""+yahoonews.get(i)[0]
                    + "\", \"" + yahoonews.get(i)[1] + "\", \""+yahoonews.get(i)[2] + "\", \"" + yahoonews.get(i)[3] + "\")");
        }
        for(int i=0; i<googlenews.size(); i++) {
            jdbcTemplate.execute("INSERT INTO news (title, timeAndDate, source, link) VALUES (\""+googlenews.get(i)[0]
                    + "\", \"" + googlenews.get(i)[1] + "\", \"" + googlenews.get(i)[2] + "\", \"" + googlenews.get(i)[3] + "\")");
        }
//        List<News> newsList = jdbcTemplate.query("SELECT * FROM news",
//                (resultSet, rowNum) -> new News(resultSet.getString("title"), resultSet.getString("timeAndDate"),resultSet.getString("source"),resultSet.getString("description")));
//        newsList.forEach(System.out::println);
    }
}
