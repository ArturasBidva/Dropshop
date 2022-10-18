package lt.arturas.spring.articles.services;

import lt.arturas.spring.articles.entities.RoleEntity;
import lt.arturas.spring.articles.entities.UserEntity;
import lt.arturas.spring.articles.models.User;
import lt.arturas.spring.articles.repository.UserRepository;
import lt.arturas.spring.articles.requests.CreateUserRequest;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserService implements UserDetailsService {
    private static final String defaultImg = "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg";
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public void createUser(CreateUserRequest request) {
        UserEntity userEntity = new UserEntity();
        userEntity.setAvatarImgUrl(defaultImg);
        userEntity.setName(request.getName());
        userEntity.setPassword(passwordEncoder.encode(request.getPassword()));
        userEntity.setBalance(BigDecimal.valueOf(0));
        userEntity.setUsername(request.getUsername());
        List<RoleEntity> roleEntities = new ArrayList<>();
        RoleEntity roleEntity = new RoleEntity();
        roleEntity.setId(2L);
        roleEntities.add(roleEntity);
        userEntity.setRoles(roleEntities);
        userRepository.save(userEntity);
    }

    public UserEntity getUserById(Long id) {
        return userRepository.getReferenceById(id);
    }

    @Override
    public User loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity userEntity = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(String.format("User with username %s not found", username)));
        return new User(userEntity);
    }

    public boolean checkIfUserExist(String username) {
        return userRepository.existsByUsername(username);
    }

    public void topUpBalance(Long userId, BigDecimal topUpBalance) {
        UserEntity userEntity = getUserById(userId);
        BigDecimal existingBalance = userEntity.getBalance();
        userEntity.setBalance(existingBalance.add(topUpBalance));
        userRepository.save(userEntity);
    }

}