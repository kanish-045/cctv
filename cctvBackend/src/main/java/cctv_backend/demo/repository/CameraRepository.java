package cctv_backend.demo.repository;

import cctv_backend.demo.entity.Camera;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CameraRepository extends JpaRepository<Camera, Long> {
}