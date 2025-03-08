package com.makemytrip.MakeMyTrip.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.makemytrip.MakeMyTrip.entities.Users;
import com.makemytrip.MakeMyTrip.services.UserService;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*")
public class UserController {
    @Autowired
    private UserService userServices;

    @PostMapping("/login")
    public Users login(@RequestParam String email,@RequestParam String password){
        return userServices.login(email,password);
    }
    @PostMapping("/signup")
    public ResponseEntity<Users> signup(@RequestBody Users user){
        return ResponseEntity.ok(userServices.signUp(user));
    }
    @GetMapping("/email")
    public ResponseEntity<Users> getUserByEmail(@RequestParam String email){
        Users user = userServices.getUserByEmail(email);
        if(user != null){
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.notFound().build();
    }
    @PostMapping("/edit")
    public Users editProfile(@RequestParam String id ,@RequestBody Users updatedUser){
        return userServices.editProfile(id,updatedUser);
    }
}