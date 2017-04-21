package com.virohtus.keeperteacher.videos.video;

import com.virohtus.keeperteacher.videos.base.ResourceNotFoundException;
import com.virohtus.keeperteacher.videos.store.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    public Video create(Video video) {
        return videoRepository.save(video);
    }

    public Video findById(String videoId) throws ResourceNotFoundException {
        Video video = videoRepository.findOne(videoId);
        if(video == null) {
            throw new ResourceNotFoundException(videoId);
        }
        return video;
    }

}
