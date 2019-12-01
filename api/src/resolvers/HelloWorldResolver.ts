import { Query, Resolver } from "type-graphql";

@Resolver()
export class HelloWorldResolver {
  // @ts-ignore
  @Query(() => String)
  hello() {
    return "hi!";
  }
}