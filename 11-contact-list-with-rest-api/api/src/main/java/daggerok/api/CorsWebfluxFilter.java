package daggerok.api;

import lombok.val;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;

import static org.springframework.http.HttpMethod.OPTIONS;
import static org.springframework.http.HttpStatus.NO_CONTENT;

@Component
public class CorsWebfluxFilter implements WebFilter {

  private static final String HEADER_VALUE
      = "DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,"
      + "Content-Type,Content-Range,Range";

  @Override
  public Mono<Void> filter(final ServerWebExchange exchange, final WebFilterChain chain) {

    val response = exchange.getResponse();
    val headers = response.getHeaders();

    headers.add("Access-Control-Allow-Origin", "*"); // control here origins if needed
    headers.add("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    headers.add("Access-Control-Allow-Headers", HEADER_VALUE);

    if (OPTIONS == exchange.getRequest().getMethod()) {
      headers.add("Access-Control-Max-Age", "1728000");
      response.setStatusCode(NO_CONTENT);
      return Mono.empty();
    }

    headers.add("Access-Control-Expose-Headers", HEADER_VALUE);
    return chain.filter(exchange);
  }
}
