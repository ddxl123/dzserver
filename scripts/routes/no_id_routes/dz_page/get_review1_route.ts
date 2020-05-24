import { Router, Request, Response } from "express";
import { route_name } from "../../../route_name";

const router = Router();

router.get(
  route_name.no_id_routes.dz_page.get_review1,
  (request: Request, response: Response) => {}
);
