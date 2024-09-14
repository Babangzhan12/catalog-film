package com.server.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

import com.server.server.entity.Pengguna;
import com.server.server.service.PenggunaService;

@RestController
@RequestMapping("/api")
@PreAuthorize("isAuthenticated()")
public class PenggunaController {
    
    @Autowired
    private PenggunaService penggunaService;

    
    @GetMapping("/penggunas")
    public List<Pengguna> findall(){
        return penggunaService.findAll();
    }

    @GetMapping("/penggunas/{username}")
    public Pengguna findByUsername(@PathVariable("id") String username){
        return penggunaService.findByUsername(username);
    }
    @PostMapping("/penggunas")
    public Pengguna create(@RequestBody Pengguna pengguna){
        return penggunaService.create(pengguna);
    }

    @PutMapping("/penggunas")
    public Pengguna edit(@RequestBody Pengguna pengguna) {
        return penggunaService.edit(pengguna);
    
    }

    @PutMapping("/profile")
    public Pengguna updateProfile(@RequestBody Pengguna pengguna) {
        Pengguna old = penggunaService.findById(pengguna.getId());
        pengguna.setPassword(old.getPassword());
        return penggunaService.edit(pengguna);
    }

    @DeleteMapping("/penggunas/{id}")
    public void deleteById(@PathVariable("id") Integer id){
        penggunaService.deleteByUId(id);
    }
}
