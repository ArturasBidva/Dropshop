package lt.arturas.spring.articles.entities;

import lombok.Data;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.List;

@Data
@Entity
@Table(name = "PRODUCTS")
public class ProductEntity {
    @Id
    private Long id;

    private String title;

    private String category;

    private Integer quantity;

    private String imageUrl;

    private BigDecimal price;

    @ManyToMany(fetch = FetchType.LAZY,cascade = CascadeType.ALL,mappedBy = "productList")
    private List<OrderEntity> orderEntity;

    public ProductEntity() {

    }
    public ProductEntity(Long id){
        this.id = id;
    }

}