package lt.arturas.spring.articles.models;

import lombok.Data;
import lt.arturas.spring.articles.entities.UserEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class User implements UserDetails {
    private static final String rolePREFIX = "ROLE_";
    private Long id;
    private String name;
    private String username;
    private String password;
    private String avatarImgUrl;

    private BigDecimal balance;

    private List<CreditCard> cards;
    private List<Role> roles = new ArrayList<>();

    public User(UserEntity userEntity) {
        this.id = userEntity.getId();
        this.name = userEntity.getName();
        this.username = userEntity.getUsername();
        this.password = userEntity.getPassword();
        this.roles = userEntity.getRoles().stream().map(Role::new).collect(Collectors.toList());
        this.avatarImgUrl = userEntity.getAvatarImgUrl();
        this.cards = userEntity.getCardEntityList().stream().map(CreditCard::new).collect(Collectors.toList());
        this.balance = userEntity.getBalance();
    }

    public User() {

    }


    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles.stream()
                .map(it -> new Role(rolePREFIX + it.getRoleName()))
                .collect(Collectors.toList());
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public boolean isAdmin() {
        return roles.stream().anyMatch(role -> role.getRoleName().equals("ADMIN"));
    }

    public boolean isAuthor() {
        return roles.stream().anyMatch(role -> role.getRoleName().equals("AUTHOR"));
    }

    public boolean isUser() {
        return roles.stream().anyMatch(role -> role.getRoleName().equals("USER"));
    }

}