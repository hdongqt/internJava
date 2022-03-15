package com.brycen.bookmanagement.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.brycen.bookmanagement.entity.RoleEntity;


@Repository
public interface RoleRepository extends JpaRepository<RoleEntity, Long> {
  Optional<RoleEntity> findByCode(String code);
}
