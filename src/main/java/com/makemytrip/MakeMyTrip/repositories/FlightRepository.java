package com.makemytrip.MakeMyTrip.repositories;

import com.makemytrip.MakeMyTrip.entities.Flight;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface FlightRepository extends MongoRepository<Flight,String> {
}
