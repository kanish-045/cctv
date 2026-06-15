package cctv_backend.demo.controller;

import cctv_backend.demo.entity.Alert;
import cctv_backend.demo.service.AlertService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/alerts")
@CrossOrigin("*")
public class AlertController {

    private final AlertService service;

    public AlertController(AlertService service) {
        this.service = service;
    }

    @PostMapping
    public Alert receiveAlert(@RequestBody Alert alert) {
        return service.saveAlert(alert);
    }

    @GetMapping
    public List<Alert> getAlerts() {
        return service.getAllAlerts();
    }
}