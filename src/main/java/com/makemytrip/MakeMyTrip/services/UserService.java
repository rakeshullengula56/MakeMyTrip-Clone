package com.makemytrip.MakeMyTrip.services;

import com.makemytrip.MakeMyTrip.entities.Users;
import com.makemytrip.MakeMyTrip.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    public Users login(String email,String password){
        Users user= userRepository.findByEmail(email);
        if(user!=null && passwordEncoder.matches(password,user.getPassword())){
            return user;
        }
        return  null;
    }
    public Users signUp(Users user){
        if(userRepository.existsByEmail(user.getEmail())){
            throw new RuntimeException("Email already exists");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword())); // Encrypt password
        user.setRole(user.getRole() != null ? user.getRole() : "USER");
        return userRepository.save(user);
    }


}
