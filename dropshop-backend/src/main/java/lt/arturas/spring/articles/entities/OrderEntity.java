package lt.arturas.spring.articles.entities;

import lombok.Data;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.List;

@Data
@Entity
@Table(name = "ORDERS")

public class OrderEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
    private List<ProductEntity> productList;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private UserEntity userEntity;
    private String firstName;
    private String lastName;
    private String address;
    private String city;
    private BigDecimal price;

    public OrderEntity(){

    }

}
