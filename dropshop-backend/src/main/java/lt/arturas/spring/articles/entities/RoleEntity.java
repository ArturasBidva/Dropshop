package lt.arturas.spring.articles.entities;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name = "ROLES")
public class RoleEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String roleName;

    @ManyToMany(cascade = CascadeType.MERGE, fetch = FetchType.EAGER,mappedBy = "roles")
    private List<UserEntity> users;
}