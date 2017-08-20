package daggerok.api;

import lombok.Data;
import lombok.experimental.Accessors;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.reactive.function.server.RouterFunction;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.io.Serializable;
import java.net.URI;
import java.util.concurrent.ConcurrentSkipListSet;

import static java.util.Arrays.asList;
import static java.util.Objects.isNull;
import static org.springframework.web.reactive.function.server.RequestPredicates.*;
import static org.springframework.web.reactive.function.server.RouterFunctions.route;
import static org.springframework.web.reactive.function.server.ServerResponse.accepted;
import static org.springframework.web.reactive.function.server.ServerResponse.ok;

@Slf4j
@SpringBootApplication
public class ApiApplication {

  @Data
  @Accessors(chain = true)
  static class Todo implements Serializable, Comparable<Todo> {

    private static final long serialVersionUID = -593373772734022253L;

    String name;
    String phone;

    @Override
    public int compareTo(final Todo t) {

      return isNull(t) || isNull(this.name)
          ? 0 : this.name.compareTo(t.name);
    }
  }

  static final ConcurrentSkipListSet<Todo> db = new ConcurrentSkipListSet<>(
      asList(
          new Todo().setName("Max").setPhone("+380933495900"),
          new Todo().setName("Help").setPhone("911")
      )
  );

  @Bean
  public RouterFunction<org.springframework.web.reactive.function.server.ServerResponse> routerFunction() {
    return
        route(
            POST("/"),
            request -> {

              return accepted().body(request.bodyToFlux(Todo.class)
                                            .map(t -> {
                                              db.add(t);
                                              return URI.create(t.name);
                                            })
                                            .map(URI::toASCIIString)
                                            .map("/"::concat),
                                     String.class);
            })
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
                                     Todo.class)
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
                                         .filter(todo -> todo.name.toLowerCase()
                                                                  .contains(request.pathVariable("name")
                                                                                   .toLowerCase())),
                                     Todo.class)
            )
            .andRoute(
                GET("/{name}"),
                request -> ok().body(Mono.justOrEmpty(db.stream()
                                                        .filter(todo -> todo.name.equals(request.pathVariable(
                                                            "name")))
                                                        .findFirst()),
                                     Todo.class)
            )
            .andRoute(
                GET("/**"),
                request -> ok().body(Mono.just("fallback"),
                                     String.class)
            )
        ;
  }

  public static void main(String[] args) {
    SpringApplication.run(ApiApplication.class, args);
  }
}
