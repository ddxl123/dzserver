//数据库
import "./mongoose/mongoose";

//服务器
import express from "express";

const server_id: string = "192.168.137.1";
const server_port: number = 8081;

//创建服务器对象
const server = express();
///监听服务器
server.listen(server_port, server_id, (err) => {
  if (!err) {
    console.log("服务器已启动...");
  } else {
    console.log("服务器启动失败");
  }
});

//隐藏服务器的具体实现(开发语言及框架)
server.disable("x-powered-by");
server.use(express.json({ limit: "50mb" }));

//路由集
//main_routes
import { register_router } from "./routes/main_routes/register_route";
server.use(register_router);
import { login_router } from "./routes/main_routes/login_route";
server.use(login_router);
import { need_id_router } from "./routes/main_routes/need_id_route";
server.use(need_id_router);

//need_id_routes
import { create_dz_router } from "./routes/need_id_routes/create_dz_page/create_dz_route";
server.use(create_dz_router);
import { send_review } from "./routes/need_id_routes/dz_page/send_review_route";
server.use(send_review);

//no_id_routes
import { get_dz_router } from "./routes/no_id_routes/home_page/get_dz_route";
server.use(get_dz_router);
import { enter_dz_router } from "./routes/no_id_routes/dz_page/enter_dz_route";
server.use(enter_dz_router);
