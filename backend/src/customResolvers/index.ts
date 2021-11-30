import {
  Args,
  ArgsType,
  Ctx,
  Field,
  FieldResolver,
  Query,
  Resolver,
  Root,
} from "type-graphql"
import { FindManyReviewArgs, Food, Review } from "../generatedGraphql"
import { Context } from "../types"

@Resolver((of) => Food)
class CustomFoodResolver {
  @FieldResolver((_type) => Number)
  async overall_rating(
    @Root() food: Food,
    @Ctx() { prisma }: Context
  ): Promise<number | null> {
    const reviews = await prisma.review.groupBy({
      by: ["foodId"],
      where: {
        foodId: {
          equals: food.id,
        },
      },
      _avg: {
        rating: true,
      },
      orderBy: {
        _avg: {
          rating: "desc",
        },
      },
    })

    if (reviews.length == 1) {
      return reviews[0]._avg?.rating
    }

    return 0
  }

  @Query((_returns) => [Food])
  async topFoods(@Args() args: FindManyReviewArgs, @Ctx() { prisma }: Context) {
    const reviews = await prisma.review.groupBy({
      by: ["foodId"],
      where: args.where,
      _avg: {
        rating: true,
      },
      orderBy: {
        _avg: {
          rating: "desc",
        },
      },
    })

    const foodIds = reviews.map((review) => review.foodId)
    return await prisma.food.findMany({
      where: {
        id: {
          in: foodIds,
        },
      },
    })
  }
}

@ArgsType()
class SearchReviewsArgs extends FindManyReviewArgs {
  @Field()
  search: string
}

@Resolver((of) => Review)
class CustomReviewResolver {
  @Query((_returns) => [Review])
  async searchReviews(
    @Args() args: SearchReviewsArgs,
    @Ctx() { prisma }: Context
  ) {
    return await prisma.review.findMany({
      where: {
        ...args.where,
        text: {
          search: args.search,
        },
      },
      orderBy: args.orderBy,
      cursor: args.cursor,
      distinct: args.distinct,
      skip: args.skip,
      take: args.take,
    })
  }
}

export const CustomResolvers = [CustomFoodResolver, CustomReviewResolver]
