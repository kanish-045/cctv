package cctv_backend.demo.controller;

import cctv_backend.demo.entity.User;
import cctv_backend.demo.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    private final UserService service;

    public AuthController(UserService service) {
        this.service = service;
    }

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return service.register(user);
    }

    @PostMapping("/login")
    public String login(@RequestBody User user) {

        boolean success =
                service.login(user.getEmail(), user.getPassword());

        return success ? "Login Successful" : "Invalid Credentials";
    }
}