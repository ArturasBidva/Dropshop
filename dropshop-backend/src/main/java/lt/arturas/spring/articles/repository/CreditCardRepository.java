package lt.arturas.spring.articles.repository;

import lt.arturas.spring.articles.entities.CreditCardEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CreditCardRepository extends JpaRepository<CreditCardEntity,Long> {

}
