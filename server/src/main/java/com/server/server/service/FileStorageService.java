package com.server.server.service;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.server.server.FileStorageProperties;
import com.server.server.exception.FileStorageException;
import com.server.server.exception.FileNotFoundException;

@Service
public class FileStorageService {
    
    private final Path fileStorageLocation;
    
    @Autowired
    public FileStorageService(FileStorageProperties prop){
        this.fileStorageLocation = Paths.get(prop.getUploadDir())
        .toAbsolutePath()
        .normalize();

        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (IOException e) {
            throw new FileStorageException("Failed to create directory", e);
        }
    }


    public String storeFile(MultipartFile file){
        if (file.isEmpty()) {
            throw new FileStorageException("File is empty");
        }
        try {
            String filenameExtension = StringUtils.getFilenameExtension(StringUtils.cleanPath(file.getOriginalFilename()));

            if (filenameExtension == null || filenameExtension.isEmpty()) {
                throw new FileStorageException("Invalid file extension");
            }

            String fileName = UUID.randomUUID().toString() + "." + filenameExtension;
            Path targetLocation = this.fileStorageLocation.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
            return fileName;
        } catch (IOException e) {
            throw new FileStorageException("Failed to save file", e);
        }
    }

    public Resource loadFileAsResource(String fileName){
        try {
            Path filePath = this.fileStorageLocation.resolve(fileName);
            UrlResource resource = new UrlResource(filePath.toUri());
            if(!resource.exists()){
                throw new FileNotFoundException("File not found");
            }
            return resource;
        } catch (MalformedURLException e) {
            throw new FileNotFoundException("File not found", e);
        }

    }

}
