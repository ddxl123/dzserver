import { Router, Request, Response } from "express";
import { route_name } from "../../../route_name";
import { tosend } from "../../../utils/tosend";
import { database } from "../../../mongoose/mongoose";
const router = Router();

var get_count: number = 3;

router.get(
  route_name.no_id_routes.home_page.get_dz,
  (request: Request, response: Response) => {
    if (
      request.query == null ||
      request.query["sort_method"] == null ||
      request.query["sort_method"] == ""
    ) {
      //获得的query或sort_method为null
      tosend(response, () => response.send({ code: "5001" }));
      return;
    }
    toDo(request, response);
  }
);

function user_info() {
  return {
    $lookup: {
      from: "user_info",
      let: { user_id: "$user_id" },
      pipeline: [
        {
          $match: {
            $expr: {
              $eq: ["$_id", "$$user_id"],
            },
          },
        },
      ],
      as: "user_info",
    },
  };
}
function dz_review1_info() {
  return {
    $lookup: {
      from: "dz_review1_info",
      let: { dz_id: "$dz_id" },
      pipeline: [
        {
          $match: {
            $expr: {
              //筛选dz_id的所有评论
              $eq: ["$dz_id", "$$dz_id"],
            },
          },
        },
        //获取总长度和赞最多的前2个
        {
          $sort: { create_time: -1 },
        },
        {
          $group: {
            _id: null, //将所有字段归为一组
            items: { $push: "$$ROOT" }, //保留全部字段
            count: { $sum: 1 }, //统计字段数量
          },
        },
        //此时ROOT仍然是个数组，而全部字段都归到items中
        {
          $project: {
            _id: 0, //不显示_id
            items: [
              //仅获取前2个字段
              {
                reviewer_user_id: {
                  $arrayElemAt: ["$items.reviewer_user_id", 0],
                },
                //TODO:
                //username:"",
                content: {
                  $arrayElemAt: ["$items.content", 0],
                },
              },
              {
                reviewer_user_id: {
                  $arrayElemAt: ["$items.reviewer_user_id", 1],
                },
                //TODO:
                //username:"",
                content: {
                  $arrayElemAt: ["$items.content", 1],
                },
              },
            ],
            count: 1, //显示字段总数量
          },
        },
      ],
      as: "dz_review1_info",
    },
  };
}

function toDo(request: Request, response: Response) {
  switch (request.query["sort_method"]) {
    case "随机":
      database.DzInfo.aggregate([
        {
          //随机抽取几个dz
          $sample: {
            size: get_count,
          },
        },
        //引入user_info,获取dz发布者的个人资料
        user_info(),
        {
          $project: {
            _id: 0,
            dz_id: "$_id",
            user_id: "$user_id",
            title: "$title",
            short_content: "$short_content",
            update_time: "$update_time",
            username: { $arrayElemAt: ["$user_info.username", 0] },
            user_icon: { $arrayElemAt: ["$user_info.user_icon", 0] },
          },
        },
        //引入dz_review1_info，获取赞最高的前2个评论
        dz_review1_info(),
        {
          $project: {
            dz_id: 1,
            user_id: 1,
            title: 1,
            short_content: 1,
            update_time: 1,
            username: 1,
            user_icon: 1,
            review_count: { $arrayElemAt: ["$dz_review1_info.count", 0] },
            review0: {
              $arrayElemAt: [
                { $arrayElemAt: ["$dz_review1_info.items", 0] },
                0,
              ],
            },
            review1: {
              $arrayElemAt: [
                { $arrayElemAt: ["$dz_review1_info.items", 0] },
                1,
              ],
            },
          },
        },
        //引入user_info，获取赞最高的前2个评论的个人资料
        {
          $lookup: {
            from: "user_info",
            let: { review0_user_id: "$review0.reviewer_user_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$_id", "$$review0_user_id"],
                  },
                },
              },
            ],
            as: "review0_user_info",
          },
        },
        {
          $lookup: {
            from: "user_info",
            let: { review1_user_id: "$review1.reviewer_user_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$_id", "$$review1_user_id"],
                  },
                },
              },
            ],
            as: "review1_user_info",
          },
        },
        {
          $project: {
            dz_id: 1,
            user_id: 1,
            title: 1,
            short_content: 1,
            update_time: 1,
            username: 1,
            user_icon: 1,
            review_count: 1,
            review0: {
              reviewer_user_id: "$review0.reviewer_user_id",
              content: "$review0.content",
              reviewer_username: {
                $arrayElemAt: ["$review0_user_info.username", 0],
              },
            },
            review1: {
              reviewer_user_id: "$review1.reviewer_user_id",
              content: "$review1.content",
              reviewer_username: {
                $arrayElemAt: ["$review1_user_info.username", 0],
              },
            },
          },
        },
      ])
        .then((result) => {
          //数据库查询成功
          tosend(response, () => response.send({ code: "5002", data: result }));
          console.log("result:", result);
        })
        .catch((err) => {
          //数据库查询err
          tosend(response, () => response.send({ code: "5003" }));
          console.log("err:", err);
        });
      break;
    case "最新":
      break;
    default:
      // tosend(response, () => response.send({ code: "5003" }));
      break;
  }
}

export { router as get_dz_router };
