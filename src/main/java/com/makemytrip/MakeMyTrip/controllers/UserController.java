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
    public ResponseEntity<?> login(@RequestParam String email, @RequestParam String password) {
        Users user = userService.login(email, password);

        if (user != null) {
            return ResponseEntity.ok(user);  // ✅ Return user if successful
        } else {
            return ResponseEntity.status(401).body("Invalid email or password");  // ❌ Return error if login fails
        }
    }


    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody Users user) {
        try {
            Users savedUser = userService.signUp(user);
            System.out.println("Signup successful: " + savedUser);  // ✅ Log the user in backend console
            return ResponseEntity.ok(savedUser);
        } catch (Exception e) {
            System.err.println("Signup error: " + e.getMessage());  // ❌ Log error in backend
            return ResponseEntity.status(400).body(e.getMessage());  // Return error response
        }
    }

}
