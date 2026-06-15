package cctv_backend.demo.service;
import cctv_backend.demo.service.AIService;
import cctv_backend.demo.entity.Camera;
import cctv_backend.demo.repository.CameraRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CameraService {



    private final CameraRepository repository;
    private final AIService aiService;

    public CameraService(
            CameraRepository repository,
            AIService aiService) {

        this.repository = repository;
        this.aiService = aiService;
    }

    public Camera addCamera(Camera camera) {

        camera.setStatus("ONLINE");

        Camera saved = repository.save(camera);

        aiService.registerCamera(saved);

        return saved;
    }

    public void deleteCamera(Long id) {

        repository.deleteById(id);

        try {
            aiService.deleteCamera(id);
        } catch (Exception e) {
            System.out.println("AI service delete failed");
        }
    }

    public void updateHeartbeat(Long cameraId, String status){

        Camera camera = repository
                .findById(cameraId)
                .orElseThrow();

        camera.setStatus(status);

        repository.save(camera);
    }

    public List<Camera> getAllCameras() {
        return repository.findAll();
    }
}