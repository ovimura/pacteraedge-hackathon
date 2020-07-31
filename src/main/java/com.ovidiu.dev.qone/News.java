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
    private String description;

    public News(String title, String timeAndDate, String source, String description) {
        this.title = title;
        this.timeAndDate = timeAndDate;
        this.source = source;
        this.description = description;
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
        return this.description;
    }
    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return "News [title=" + this.title + ", timeAndDate=" + this.timeAndDate + ", source=" + this.source + ", description=" + this.description +"]";
    }
}