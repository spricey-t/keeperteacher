package com.virohtus.keeperteacher.videos.store;

import com.amazonaws.auth.profile.ProfileCredentialsProvider;
import com.amazonaws.event.ProgressListener;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.transfer.TransferManager;
import com.amazonaws.services.s3.transfer.TransferManagerBuilder;
import com.amazonaws.services.s3.transfer.Upload;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.atomic.AtomicLong;


@Service
public class StorageService {

    private final Logger log = LoggerFactory.getLogger(StorageService.class);
    private final AmazonS3 amazonS3Client;
    private final ExecutorService executorService;
    private final String bucketName;
    private final String profile;

    @Autowired
    public StorageService(
            ExecutorService executorService,
            @Value("${com.virohtus.keeperteacher.videos.store.bucketName}") String bucketName,
            @Value("${com.virohtus.keeperteacher.videos.store.region}") String region,
            @Value("${com.virohtus.keeperteacher.videos.store.profile}") String profile
    ) {
        this.executorService = executorService;
        this.bucketName = bucketName;
        this.profile = profile;
        amazonS3Client = AmazonS3ClientBuilder.standard()
                .withRegion(region)
                .withCredentials(new ProfileCredentialsProvider(profile))
                .build();
    }

    public void store(MultipartFile file) throws IOException {
        long totalBytes = file.getSize();
        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentLength(totalBytes);
        PutObjectRequest request = new PutObjectRequest(
                bucketName, file.getOriginalFilename(),
                file.getInputStream(), objectMetadata
        );
        TransferManager transferManager = TransferManagerBuilder.standard()
                .withS3Client(amazonS3Client)
                .build();
        AtomicLong bytesTransferred = new AtomicLong(0);
        Upload upload = transferManager.upload(request);
        upload.addProgressListener((ProgressListener) progressEvent -> {
            switch (progressEvent.getEventType()) {
                case TRANSFER_STARTED_EVENT:
                    log.info("transfer started");
                    return;
                case TRANSFER_COMPLETED_EVENT:
                    log.info("transfer completed");
                    return;
                case TRANSFER_FAILED_EVENT:
                    log.info("transfer failed");
                    return;
            }
            if(progressEvent.getEventType().isByteCountEvent()) {
                bytesTransferred.addAndGet(progressEvent.getBytesTransferred());
                log.info(String.format("upload - %d", (int) ((bytesTransferred.get() * 100.0) / totalBytes)));
            }
        });
    }
}
