package cctv_backend.demo.service;

import cctv_backend.demo.entity.Alert;
import cctv_backend.demo.repository.AlertRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AlertService {

    private final AlertRepository repository;

    public AlertService(AlertRepository repository) {
        this.repository = repository;
    }

    public Alert saveAlert(Alert alert) {

        alert.setTimestamp(LocalDateTime.now());

        return repository.save(alert);
    }

    public List<Alert> getAllAlerts() {
        return repository.findAll();
    }
}