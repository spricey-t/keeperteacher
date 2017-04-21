package com.virohtus.keeperteacher.videos.video;

import com.virohtus.keeperteacher.videos.store.StorageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/videos")
public class VideoController {

    private final Logger log = LoggerFactory.getLogger(VideoController.class);
    private final VideoService videoService;
    private final StorageService storageService;

    @Autowired
    public VideoController(VideoService videoService, StorageService storageService) {
        this.videoService = videoService;
        this.storageService = storageService;
    }


    @GetMapping
    public Page<Video> findAllPaged(
            Pageable pageable
    ) {
        return videoService.findAllPaged(pageable);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void handleFileUpload(
            @RequestParam("videoId") String videoId,
            @RequestParam("file") MultipartFile file
    ) throws IOException {
        storageService.store(file);
    }
}
