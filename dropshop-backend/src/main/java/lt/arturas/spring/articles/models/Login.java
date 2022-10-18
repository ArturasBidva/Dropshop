package lt.arturas.spring.articles.models;

import lombok.Getter;

import java.util.List;
@Getter
public class Login {
    private final String username;
    private final String name;
    private final List<String> roles;
    private final String avatarImg;


    public Login(User user) {
        this.username = user.getUsername();
        this.name = user.getName();
        this.roles = user.getRoles().stream().map(Role::getRoleName).toList();
        this.avatarImg = user.getAvatarImgUrl();
    }
}
