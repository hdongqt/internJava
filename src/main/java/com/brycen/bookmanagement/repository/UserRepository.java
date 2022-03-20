package com.brycen.bookmanagement.repository;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.hibernate.annotations.Where;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.brycen.bookmanagement.entity.UserEntity;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
  Optional<UserEntity> findByUsername(String username);
  
  UserEntity findOneByUsername(String username);
  
  Boolean existsByUsername(String username);
  
  @Query("select u from UserEntity u where u.email = ?1 and username != ?2")
  UserEntity existsEmailByOther(String email,String username);

  Boolean existsByEmail(String email);
  
  @Transactional
  @Modifying
  @Query("update UserEntity u set u.password = ?2 where u.username=?1")
  int changePassword(String username, String newPassword);
  
  @Where(clause = "is_delete = false")
  List<UserEntity> findByFullnameLike(String key);
  
//  List<UserEntity> findByFullnameLike(String key,Pageable pageable);
  
  
  
  
  //admin
  @Query("select u from UserEntity u where u.role.id = ?1 and  fullname like %?2%")
  List<UserEntity> findUserByRoleAndFullname(Long idRole,String fullname,Pageable pageable);
  
  
  
}
