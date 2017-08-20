package daggerok.api;

import lombok.Data;
import lombok.experimental.Accessors;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.io.Serializable;
import java.net.URI;
import java.util.concurrent.ConcurrentSkipListSet;

import static java.util.Arrays.asList;
import static java.util.Objects.isNull;
import static org.springframework.http.HttpMethod.OPTIONS;
import static org.springframework.http.HttpStatus.NO_CONTENT;
import static org.springframework.web.reactive.function.server.RequestPredicates.*;
import static org.springframework.web.reactive.function.server.RouterFunctions.route;
import static org.springframework.web.reactive.function.server.ServerResponse.accepted;
import static org.springframework.web.reactive.function.server.ServerResponse.ok;

@Slf4j
@SpringBootApplication
public class ApiApplication {

  static final ConcurrentSkipListSet<Contact> db = new ConcurrentSkipListSet<>(
      asList(
          new Contact().setName("Max").setPhone("+380933495900"),
          new Contact().setName("Help").setPhone("911")
      )
  );

  @Bean
  RouterFunction<org.springframework.web.reactive.function.server.ServerResponse> routerFunction() {
    return
        route(
            POST("/"),
            request -> accepted().body(
                request.bodyToFlux(Contact.class)
                       .map(t -> {
                         db.add(t);
                         return URI.create(t.name);
                       })
                       .map(URI::toASCIIString)
                       .map("/"::concat),
                String.class)
        )
            .andRoute(
                DELETE("/{name}"),
                request -> accepted().body(
                    Flux.just(
                        db.removeIf(t -> t.name.equals(request.pathVariable("name")))
                            ? "OK" : "KO"),
                    String.class
                )
            )
            .andRoute(
                GET("/"),
                request -> ok().body(Mono.just("ololo"),
                                     String.class)
            )
            .andRoute(
                GET("/all"),
                request -> ok().body(Flux.fromIterable(db),
                                     Contact.class)
            )
            .andRoute(
                GET("/otherList"),
                request -> ok().body(Flux.just("one", "two", "three", "trololo")
                                         .map(" "::concat),
                                     String.class)
            )
            .andRoute(
                GET("/find/{name}"),
                request -> ok().body(Flux.fromIterable(db)
                                         .filter(contact -> contact.name.toLowerCase()
                                                                        .contains(request.pathVariable("name")
                                                                                         .toLowerCase())),
                                     Contact.class)
            )
            .andRoute(
                GET("/{name}"),
                request -> ok().body(Mono.justOrEmpty(db.stream()
                                                        .filter(contact -> contact.name.equals(request.pathVariable(
                                                            "name")))
                                                        .findFirst()),
                                     Contact.class)
            )
            .andRoute(
                GET("/**"),
                request -> ok().body(Mono.just("fallback"),
                                     String.class)
            )
        ;
  }

  @Component
  static class CorsWebfluxFilter implements WebFilter {

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

  @Data
  @Accessors(chain = true)
  static class Contact implements Serializable, Comparable<Contact> {

    private static final long serialVersionUID = -593373772734022253L;

    String name;
    String phone;

    @Override
    public int compareTo(final Contact t) {

      return isNull(t) || isNull(this.name)
          ? 0 : this.name.compareTo(t.name);
    }
  }

  public static void main(String[] args) {
    SpringApplication.run(ApiApplication.class, args);
  }
}
