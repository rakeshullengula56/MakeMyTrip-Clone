package com.makemytrip.MakeMyTrip.entities;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
@Data
@Document(collection = "flight")
public class Flight {
    @Id
    private String _id;
    private String flightName;
    private String from;
    private String to;
    private String departureTime;
    private String arrivalTime;
    private double price;
    private int availableSeats;
}