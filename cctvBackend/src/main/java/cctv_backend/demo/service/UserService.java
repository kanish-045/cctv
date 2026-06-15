package cctv_backend.demo.service;

import cctv_backend.demo.entity.User;
import cctv_backend.demo.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository repository;

    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    public User register(User user) {
        return repository.save(user);
    }

    public boolean login(String email, String password) {

        return repository.findByEmail(email)
                .map(u -> u.getPassword().equals(password))
                .orElse(false);
    }
}