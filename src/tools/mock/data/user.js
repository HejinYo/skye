import Mock from 'mockjs';

const LoginUsers = [{
  id: 1,
  username: 'admin',
  password: '123456',
  avatar: 'https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png',
  name: '张某某'
}];

const Users = [];
for (let i = 0; i < 86; i++) {
  Users.push(Mock.mock({
    id: Mock.Random.guid(),
    name: Mock.Random.cname(),
    addr: Mock.mock('@county(true)'),
    'age|18-60': 1,
    birth: Mock.Random.date(),
    sex: Mock.Random.integer(0, 1)
  }));
}

const menuList = {
  "message": "获取成功",
  "data": [
    {
      "childrenMenu": [],
      "micon": "fa fa-user",
      "mid": 1,
      "mlevel": 1,
      "mname": "用户管理",
      "murl": "#/dashboardv1",
      "pid": 0,
      "redCode": "user",
      "seq": 1
    },
    {
      "childrenMenu": [],
      "micon": "fa fa-camera",
      "mid": 2,
      "mlevel": 1,
      "mname": "菜单管理",
      "murl": "#/dashboardv2",
      "pid": 0,
      "redCode": "menu",
      "seq": 2
    },
    {
      "childrenMenu": [],
      "micon": "fa fa-plug",
      "mid": 10,
      "mlevel": 1,
      "mname": "sql监控",
      "murl": "#/Page4",
      "pid": 0,
      "redCode": "sql",
      "seq": 4
    },
    {
      "childrenMenu": [
        {
          "childrenMenu": [],
          "micon": "",
          "mid": 4,
          "mlevel": 2,
          "mname": "login",
          "murl": "#/login",
          "pid": 3,
          "redCode": "clip",
          "seq": 1
        },
        {
          "childrenMenu": [
            {
              "childrenMenu": [
                {
                  "childrenMenu": [],
                  "micon": "fa fa-camera",
                  "mid": 9,
                  "mlevel": 4,
                  "mname": "41",
                  "murl": "user/manager",
                  "pid": 7,
                  "redCode": "41",
                  "seq": 1
                }
              ],
              "micon": "fa fa-ban",
              "mid": 7,
              "mlevel": 3,
              "mname": "31",
              "murl": "resources/vendor/poshytip/demo/demo.html",
              "pid": 5,
              "redCode": "31",
              "seq": 1
            },
            {
              "childrenMenu": [],
              "micon": "fa fa-edit",
              "mid": 8,
              "mlevel": 3,
              "mname": "32",
              "murl": "test/needcreate",
              "pid": 5,
              "redCode": "32",
              "seq": 2
            }
          ],
          "micon": "fa fa-cube",
          "mid": 5,
          "mlevel": 2,
          "mname": "jqGrid",
          "murl": "#",
          "pid": 3,
          "redCode": "jqGrid",
          "seq": 2
        },
        {
          "childrenMenu": [],
          "micon": "fa fa-hdd-o",
          "mid": 6,
          "mlevel": 2,
          "mname": "404 page",
          "murl": "#/404",
          "pid": 3,
          "redCode": "Poshy tip",
          "seq": 3
        }
      ],
      "micon": "fa fa-money",
      "mid": 3,
      "mlevel": 1,
      "mname": "开发工具",
      "murl": "#",
      "pid": 0,
      "redCode": "tools",
      "seq": 3
    }
  ],
  "status": 0
}

export {LoginUsers, Users, menuList};
