import Drive from "./pages/Drive";
import Presentations from "./pages/Presentations";
import Participation from "./pages/Participation";
import Class from "./pages/Class";
// {
//   path: "/path-name",
//   name: "Drive",
//   icon: "icon name",
//   component: Drive,
//   layout: "layout-tag"
// },

function buildRoutes(classList){
  let collapse = [];
  if(classList != null && classList.length > 0){
    collapse = classList.map(function(item){
      return {
            path: `/classes/${item.id}`,
            name: item.name,
            miniName: item.name.charAt(0),
            component: Class,
            layout: "admin"
      }
    })
  }
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
      component: Participation,
      layout: "admin"
    },
    {
      collapse: true,
      name: "Classes",
      icon: "fas fa-school",
      state: "classesCollapse",
      views: collapse
    }
  ];

  return routes;
}
export default buildRoutes;

// [
//   {
//     path: "/classes/french-201-kjdlsauhelfaeju",
//     name: "French 201",
//     miniName: "F",
//     component: null,
//     layout: "admin"
//   },
//   {
//     path: "/classes/phys-150-jkfurehliufheue",
//     name: "Physics 150",
//     miniName: "P",
//     component: null,
//     layout: "/auth"
//   }
// ]
