const route_name = {
  main_routes: {
    login: "/login",
    register: "/register",
    need_id: "/need_id",
  },
  need_id_routes: {
    create_dz_page: {
      create_dz: "/need_id/create_dz_page/create_dz",
    },
    dz_page: {
      send_review: "/need_id/dz_page/send_review",
    },
  },
  no_id_routes: {
    home_page: {
      get_dz: "/no_id/home_page/get_dz",
    },
    dz_page: {
      enter_dz: "/no_id/dz_page/enter_dz",
      get_review1: "/no_id/dz_page/get_review1",
    },
  },
};

export { route_name };
