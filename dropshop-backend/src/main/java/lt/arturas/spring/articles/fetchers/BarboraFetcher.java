package lt.arturas.spring.articles.fetchers;

import com.gargoylesoftware.htmlunit.WebClient;
import com.gargoylesoftware.htmlunit.html.HtmlDivision;
import com.gargoylesoftware.htmlunit.html.HtmlElement;
import com.gargoylesoftware.htmlunit.html.HtmlPage;
import lt.arturas.spring.articles.models.Product;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Component
public class BarboraFetcher {

    public List<Product> fetchProductsByCategory(String barboraUrl, String category) {
        List<Product> produktai = new ArrayList<>();
        HtmlPage page = getDocument(barboraUrl);
        List<HtmlDivision> allpage = page.getByXPath("//div[contains(@class, 'b-product--wrap2 b-product--desktop-grid')]");
        for (HtmlElement all : allpage) {
            HtmlElement kaina = all.getFirstByXPath(".//span[@itemprop=\"price\"]");
            HtmlElement pavadinimas = all.getFirstByXPath(".//span[@itemprop=\"name\"]");
            HtmlElement imeidzas = all.getFirstByXPath(".//img[@itemprop='image']");
            String imageSrc = imeidzas.getAttribute("src");
            HtmlElement id = all.getFirstByXPath(".//div[@data-b-item-id]");
            String getRightid = id.getAttribute("data-b-item-id");
            String replaceStringValueInId = getRightid.replace("BR", "");
            Long testas = Long.parseLong(replaceStringValueInId);
            String removeEurSign = kaina.asNormalizedText().replace("€" , "");
            String formatedPrice = removeEurSign.replace(",", ".");
            BigDecimal bigDecimal = new BigDecimal(formatedPrice);

            produktai.add(new Product(imageSrc,pavadinimas.asNormalizedText(),bigDecimal,category,testas));
        }
        return produktai;
    }

    public static HtmlPage getDocument(String url) {
        HtmlPage page = null;
        try (final WebClient webClient = new WebClient()) {
            webClient.getOptions().setCssEnabled(false);
            webClient.getOptions().setJavaScriptEnabled(false);
            page = webClient.getPage(url);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return page;
    }
}
