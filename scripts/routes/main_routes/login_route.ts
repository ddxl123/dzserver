import { route_name } from "../../route_name";
import { Router, Request, Response } from "express";
import { Token } from "../../utils/token";
import { database } from "../../mongoose/mongoose";
const router = Router();
//邮箱登陆-验证码
router.post(route_name.login, (request: Request, response: Response) => {
  if (request.body == null) {
    //收到的登陆的数据为null
    response.send({ code: "1001" });
    return;
  }
  if (request.body["username"] == null || request.body["password"] == null) {
    //收到的value为null
    response.send({ code: "1002" });
    return;
  }
  database.UserInfo.find(
    { username: request.body["username"] },
    (err, result) => {
      if (err) {
        response.send({ code: "1003" });
      } else {
        if (result.length == 0) {
          //该用户未被注册
          response.send({ code: "1004" });
        } else if (result.length == 1) {
          if (result[0]["password"] == request.body["password"]) {
            //密码正确
            Token.generateToken(
              {
                user_id: result[0]["_id"],
                password: request.body["password"],
              },
              (err, encoded) => {
                if (err) {
                  //密码正确，但token生成err
                  response.send({ code: "1005" });
                } else {
                  if (encoded == null) {
                    //密码正确，但token生成的encoded未定义
                    response.send({ code: "1006" });
                  } else {
                    //密码正确，且token生成成功
                    response.setHeader("token", encoded);
                    response.send({ code: "1007" });
                  }
                }
              }
            );
          } else {
            //密码错误
            response.send({ code: "1008" });
          }
        } else {
          //数据库存在重复的用户账号
          response.send({ code: "1009" });
        }
      }
    }
  );
});

export { router as login_router };
