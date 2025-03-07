package com.makemytrip.MakeMyTrip.controllers;

import com.makemytrip.MakeMyTrip.entities.Users;
import com.makemytrip.MakeMyTrip.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public Users login(@RequestParam String email,@RequestParam String password){
        return userService.login(email,password);
    }
    @PostMapping("/signup")
    public ResponseEntity<Users> signUp(@RequestBody Users user){
        return ResponseEntity.ok(userService.signUp(user));
    }
    @GetMapping("/email")
    public ResponseEntity<Users> getUserByEmail(@RequestParam String email){
        Users user = userService.getUserByEmail(email);
        if(user != null){
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.notFound().build();
    }
    @PostMapping("/edit")
    public Users editProfile(@RequestParam String id ,@RequestBody Users updatedUser){
        return userService.editProfile(id,updatedUser);
    }

}
