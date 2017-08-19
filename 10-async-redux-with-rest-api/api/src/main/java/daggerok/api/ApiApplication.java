package daggerok.api;

import lombok.Data;
import lombok.experimental.Accessors;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.io.Serializable;
import java.net.URI;
import java.util.concurrent.ConcurrentSkipListSet;

import static java.util.Arrays.asList;
import static java.util.Objects.isNull;
import static org.springframework.web.reactive.function.server.RequestPredicates.DELETE;
import static org.springframework.web.reactive.function.server.RequestPredicates.GET;
import static org.springframework.web.reactive.function.server.RequestPredicates.POST;
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

    String title;
    boolean done;

    @Override
    public int compareTo(final Todo t) {

      return isNull(t) || isNull(this.title)
          ? 0 : this.title.compareTo(t.title);
    }
  }

  static final ConcurrentSkipListSet<Todo> todoList = new ConcurrentSkipListSet<>(
      asList(
          new Todo().setTitle("Todo is done.").setDone(true),
          new Todo().setTitle("Todo in progress.")
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
                                              todoList.add(t);
                                              return URI.create(t.title);
                                            })
                                            .map(URI::toASCIIString)
                                            .map("/"::concat),
                                     String.class);
            })
            .andRoute(
                DELETE("/{title}"),
                request -> accepted().body(
                    Flux.just(
                        todoList.removeIf(t -> t.title.equals(request.pathVariable("title")))
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
                request -> ok().body(Flux.fromIterable(todoList),
                                     Todo.class)
            )
            .andRoute(
                GET("/complete"),
                request -> ok().body(Flux.fromIterable(todoList)
                                         .filter(Todo::isDone),
                                     Todo.class)
            )
            .andRoute(
                GET("/incomplete"),
                request -> ok().body(Flux.fromIterable(todoList)
                                         .filter(todo -> !todo.done),
                                     Todo.class)
            )
            .andRoute(
                GET("/otherList"),
                request -> ok().body(Flux.just("one", "two", "three", "trololo")
                                         .map(" "::concat),
                                     String.class)
            )
            .andRoute(
                GET("/find/{title}"),
                request -> ok().body(Flux.fromIterable(todoList)
                                         .filter(todo -> todo.title.toLowerCase()
                                                                   .contains(request.pathVariable("title")
                                                                                    .toLowerCase())),
                                     Todo.class)
            )
            .andRoute(
                GET("/{title}"),
                request -> ok().body(Mono.justOrEmpty(todoList.stream()
                                                              .filter(todo -> todo.title.equals(request.pathVariable("title")))
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
