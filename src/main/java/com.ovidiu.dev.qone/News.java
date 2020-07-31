package com.ovidiu.dev.qone;

import javax.persistence.Entity;
//import javax.persistence.GeneratedValue;
//import javax.persistence.Id;
//import javax.validation.constraints.Size;

@Entity
public class News {
    private String title;
    private String timeAndDate;
    private String source;
    private String link;

    public News(String title, String timeAndDate, String source, String link) {
        this.title = title;
        this.timeAndDate = timeAndDate;
        this.source = source;
        this.link = link;
    }
    public String getTitle() {
        return this.title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public String getTimeAndDate() {
        return this.timeAndDate;
    }
    public void setTimeAndDate(String timeAndDate) {
        this.timeAndDate = timeAndDate;
    }
    public String getSource() {
        return this.source;
    }
    public void setSource(String source) {
        this.source = source;
    }
    public String getDescription() {
        return this.link;
    }
    public void setDescription(String link) {
        this.link = link;
    }

    @Override
    public String toString() {
        return "News [title=" + this.title + ", timeAndDate=" + this.timeAndDate + ", source=" + this.source + ", link=" + this.link +"]";
    }
}