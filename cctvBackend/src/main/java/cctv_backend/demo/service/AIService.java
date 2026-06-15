package cctv_backend.demo.service;

import cctv_backend.demo.entity.Camera;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class AIService {

    private final RestTemplate restTemplate =
            new RestTemplate();

    public void registerCamera(Camera camera){

        String aiUrl =
                "http://localhost:5000/register-camera";

        restTemplate.postForObject(
                aiUrl,
                camera,
                String.class
        );
    }

    public void deleteCamera(Long cameraId) {

        String url =
                "http://localhost:5000/remove-camera/" + cameraId;

        restTemplate.delete(url);
    }
}