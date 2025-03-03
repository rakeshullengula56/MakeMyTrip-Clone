package com.makemytrip.MakeMyTrip.repositories;

import com.makemytrip.MakeMyTrip.entities.Hotel;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface HotelRepository extends MongoRepository<Hotel,String> {
}
