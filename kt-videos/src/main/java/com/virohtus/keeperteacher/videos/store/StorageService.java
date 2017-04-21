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

    public void store(String key, MultipartFile file, ProgressListener progressListener) throws IOException, InterruptedException {
        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentLength(file.getSize());
        PutObjectRequest request = new PutObjectRequest(bucketName, key, file.getInputStream(), objectMetadata);
        TransferManager transferManager = TransferManagerBuilder.standard()
                .withS3Client(amazonS3Client)
                .build();
        Upload upload = transferManager.upload(request);
        upload.addProgressListener(progressListener);
    }
}
