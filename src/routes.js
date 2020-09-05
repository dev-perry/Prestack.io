import Drive from "./pages/Drive";
import Presentations from "./pages/Presentations"
// {
//   path: "/path-name",
//   name: "Drive",
//   icon: "icon name",
//   component: Drive,
//   layout: "layout-tag"
// },

const routes = [
  {
    path: "/drive",
    name: "Drive",
    icon: "fas fa-hdd",
    component: Drive,
    layout: "admin"
  },
  {
    path: "/presentations",
    name: "Presentations",
    icon: "fas fa-bolt",
    component: Presentations,
    layout: "admin"
  },
  {
    path: "/participation",
    name: "Participation",
    icon: "fas fa-user-check",
    component: null,
    layout: "admin"
  },
  {
    collapse: true,
    name: "Classes",
    icon: "fas fa-school",
    state: "classesCollapse",
    views: [
      {
        path: "/classes/french-201-kjdlsauhelfaeju",
        name: "French 201",
        miniName: "F",
        component: null,
        layout: "admin"
      },
      {
        path: "/classes/phys-150-jkfurehliufheue",
        name: "Physics 150",
        miniName: "P",
        component: null,
        layout: "/auth"
      }
    ]
  }

];

export default routes;
