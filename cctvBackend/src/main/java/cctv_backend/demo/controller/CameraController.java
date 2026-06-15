package cctv_backend.demo.controller;

import cctv_backend.demo.dto.HeartbeatRequest;
import cctv_backend.demo.entity.Camera;
import cctv_backend.demo.service.CameraService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cameras")
@CrossOrigin("*")
public class CameraController {

    private final CameraService service;



    public CameraController(CameraService service) {
        this.service = service;
    }



    @PostMapping
    public Camera addCamera(@RequestBody Camera camera) {
        return service.addCamera(camera);
    }

    @DeleteMapping("/{id}")
    public String deleteCamera(@PathVariable Long id) {
        service.deleteCamera(id);
        return "Camera deleted successfully";
    }

    @GetMapping
    public List<Camera> getAll() {
        return service.getAllCameras();
    }
    @PostMapping("/heartbeat")
    public String heartbeat(
            @RequestBody HeartbeatRequest request) {

        service.updateHeartbeat(
                request.getCameraId(),
                request.getStatus()
        );

        return "received";
    }

}