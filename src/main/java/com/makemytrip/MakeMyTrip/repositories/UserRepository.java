package com.makemytrip.MakeMyTrip.repositories;

import com.makemytrip.MakeMyTrip.entities.Users;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<Users,String> {
    Users findByEmail(String email);

    boolean existsByEmail(String email);
}
