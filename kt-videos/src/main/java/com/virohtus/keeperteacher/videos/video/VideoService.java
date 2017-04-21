package com.virohtus.keeperteacher.videos.video;

import com.virohtus.keeperteacher.videos.store.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@Service
@Transactional
public class VideoService {

    private final VideoRepository videoRepository;
    private final StorageService storageService;

    @Autowired
    public VideoService(VideoRepository videoRepository, StorageService storageService) {
        this.videoRepository = videoRepository;
        this.storageService = storageService;
    }

    public Page<Video> findAllPaged(Pageable pageable) {
        return videoRepository.findAll(pageable);
    }


    public void createVideo(MultipartFile file) throws IOException {
        storageService.store(file);
    }
}
