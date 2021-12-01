import {
  Args,
  ArgsType,
  Ctx,
  Field,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql"
import {
  FindManyReviewArgs,
  Food,
  Review,
  UserWhereUniqueInput,
} from "../generatedGraphql"
import { Context } from "../types"

@ArgsType()
class ToggleTryOrFavArgs {
  @Field()
  where: UserWhereUniqueInput
  @Field()
  food_name: string
}

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

  @Mutation((returns) => Food)
  async toggleTry(
    @Args() args: ToggleTryOrFavArgs,
    @Ctx() { prisma }: Context
  ) {
    const current_user = await prisma.user.findFirst({
      where: args.where,
      select: {
        toTryList: true,
        id: true,
      },
    })
    if (current_user === null) {
      console.error("Failed to get user for toggleTry")
      return undefined
    }
    let toTry = false
    let toTryElement: Food
    for (toTryElement of current_user["toTryList"]) {
      if (toTryElement.name === args.food_name) {
        toTry = true
        break
      }
    }
    // If toTry is true, then disconnect. If toTry is false, then connect.
    if (toTry)
      return await prisma.food.update({
        where: {
          name: args.food_name,
        },
        data: {
          usersWantTry: {
            disconnect: {
              id: current_user.id,
            },
          },
        },
      })
    return await prisma.food.update({
      where: {
        name: args.food_name,
      },
      data: {
        usersWantTry: {
          connect: {
            id: current_user.id,
          },
        },
      },
    })
  }

  @Mutation((returns) => Food)
  async toggleLiked(
    @Args() args: ToggleTryOrFavArgs,
    @Ctx() { prisma }: Context
  ) {
    const current_user = await prisma.user.findFirst({
      where: args.where,
      select: {
        favoritesList: true,
        id: true,
      },
    })
    if (current_user === null) {
      console.error("Failed to get user for toggleTry")
      return undefined
    }
    let fav = false
    let favElement: Food
    for (favElement of current_user["favoritesList"]) {
      if (favElement.name === args.food_name) {
        fav = true
        break
      }
    }
    // If toTry is true, then disconnect. If toTry is false, then connect.
    if (fav)
      return await prisma.food.update({
        where: {
          name: args.food_name,
        },
        data: {
          usersWithFavs: {
            disconnect: {
              id: current_user.id,
            },
          },
        },
      })
    return await prisma.food.update({
      where: {
        name: args.food_name,
      },
      data: {
        usersWithFavs: {
          connect: {
            id: current_user.id,
          },
        },
      },
    })
  }
}

@ArgsType()
class SearchReviewsArgs extends FindManyReviewArgs {
  @Field({ nullable: true })
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
          search: args.search?.replace(/\W/g, ""),
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
