package lt.arturas.spring.articles.services;

import lt.arturas.spring.articles.entities.ProductEntity;
import lt.arturas.spring.articles.fetchers.BarboraFetcher;
import lt.arturas.spring.articles.models.Product;
import lt.arturas.spring.articles.repository.ProductRepository;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@EnableScheduling
public class ProductService {
    private final ProductRepository productRepository;

    private final BarboraFetcher barboraFetcher;

    public ProductService(ProductRepository productRepository,
                          BarboraFetcher barboraFetcher) {
        this.productRepository = productRepository;
        this.barboraFetcher = barboraFetcher;
    }

    public void createProduct(Product product) {
        ProductEntity productEntity = new ProductEntity();
        productEntity.setId(product.getId());
        productEntity.setTitle(product.getTitle());
        productEntity.setImageUrl(product.getImageUrl());
        productEntity.setPrice(product.getPriceWithCard());
        productEntity.setCategory(product.getCategory());
        productEntity.setQuantity(10);
        productRepository.save(productEntity);
    }

    //2.35 hour
    @Scheduled(fixedDelay = 10000000)
    void fetchProducts() {
        barboraFetcher.fetchProductsByCategory("https://barbora.lt/namai-ir-laisvalaikis?page=2",
                "namai-ir-laisvalaikis").forEach(this::createProduct);
        barboraFetcher.fetchProductsByCategory("https://barbora.lt/duonos-gaminiai-ir-konditerija?page=2",
                "duonos-gaminiai-ir-konditerija").forEach(this::createProduct);
        barboraFetcher.fetchProductsByCategory("https://barbora.lt/darzoves-ir-vaisiai?page=2",
                "darzoves-ir-vaisiai").forEach(this::createProduct);
        barboraFetcher.fetchProductsByCategory("https://barbora.lt/gerimai?page=2",
                "gerimai").forEach(this::createProduct);
        barboraFetcher.fetchProductsByCategory("https://barbora.lt/saldytas-maistas?page=2",
                "saldytas-maistas").forEach(this::createProduct);
        barboraFetcher.fetchProductsByCategory("https://barbora.lt/pieno-gaminiai-ir-kiausiniai?page=2",
                "pieno-gaminiai-ir-kiausiniai").forEach(this::createProduct);
        barboraFetcher.fetchProductsByCategory("https://barbora.lt/svaros-ir-gyvunu-prekes?page=2",
                "svaros-ir-gyvunu-prekes").forEach(this::createProduct);

        getALlProducts();
    }

    public List<Product> getALlProducts() {

        return productRepository.findAll()
                .stream()
                .map(Product::new)
                .collect(Collectors.toList());
    }
}