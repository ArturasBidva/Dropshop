package lt.arturas.spring.articles.entities;

import lombok.Data;

import javax.persistence.*;
@Data
@Entity
@Table(name = "CREDITCARD")
public class CreditCardEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long number;
    private String name;
    private String expiry;
    private Long cvc;
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private UserEntity userEntity;
}
