package com.virohtus.keeperteacher.videos.video;

import com.virohtus.keeperteacher.videos.base.ResourceNotFoundException;
import com.virohtus.keeperteacher.videos.publish.VideoPublisher;
import com.virohtus.keeperteacher.videos.store.StorageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;

@RestController
@RequestMapping("/videos")
public class VideoController {

    private final Logger log = LoggerFactory.getLogger(VideoController.class);
    private final VideoService videoService;
    private final VideoPublisher videoPublisher;

    @Autowired
    public VideoController(VideoService videoService, VideoPublisher videoPublisher) {
        this.videoService = videoService;
        this.videoPublisher = videoPublisher;
    }


    @GetMapping
    public Page<Video> findAllPaged(
            Pageable pageable
    ) {
        return videoService.findAllPaged(pageable);
    }

    @PostMapping
    public Video create(
            @Valid @RequestBody Video video
    ) {
        return videoService.create(video);
    }

    @PostMapping("{videoId}/upload")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void handleFileUpload(
            @PathVariable("videoId") String videoId,
            @RequestParam("file") MultipartFile file
    ) throws IOException, ResourceNotFoundException {
        videoPublisher.publishVideo(videoId, file);
    }
}
