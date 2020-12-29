// import React from "react";
// import { Switch, Route, Redirect } from "react-router-dom";
// import { hot } from "react-hot-loader";
// import * as Style from "./style.scss";
// import Loading from "./common/loading";
// import Header from "./layout/header";
// import { getAuthInfo } from "@utils";
// import { getUser } from "@domain/user/action.js";
// // const Login = React.lazy(() => import("./login"));
// // const Home = React.lazy(() => import("./home"));
// // const Entity = React.lazy(() => import("./Entity"));
// // const TemplateEditor = React.lazy(() => import("./Template/Editor"));
// // const EntityList = React.lazy(() => import("./Entity/list/index"));
// // const TemplateList = React.lazy(() => import("./Template/list/index"));
// // const ConstractForm = React.lazy(() => import("./Constant/form/index"));
// // const ConstantList = React.lazy(() => import("./Constant/list/index"));

// // const EnumForm = React.lazy(() => import("./Enum/form/index"));
// // const EnumList = React.lazy(() => import("./Enum/list/index"));

// import Modals from "@/components/modals";

// class Routes extends React.Component {
//   componentDidMount() {
//     const user = getAuthInfo();
//     if (user) {
//       getUser(user.id);
//     }
//   }

//   render() {
//     return (
//       <React.Suspense fallback={<Loading />}>
//         <Switch>
//           <Route exact={true} path="/login" component={Login} />
//           {/* <Route exact={true} path="/registry" component={Registry}/> */}
//           <Route>
//             <div id="layout" className={Style.layout}>
//               <div className={Style.layout_header}>
//                 <Header />
//               </div>
//               <div className={Style.layout_content}>
//                 <React.Suspense fallback={<Loading />}>
//                   <Switch>
//                   <Route
//                       exact={true}
//                       path="/Constant/form"
//                       component={ConstractForm}
//                     />
//                     <Route
//                       exact={true}
//                       path="/Constant/list"
//                       component={ConstantList}
//                     />
//                     <Route
//                       exact={true}
//                       path="/Entity/list"
//                       component={EntityList}
//                     />
//                     <Route
//                       exact={true}
//                       path="/Entity/form"
//                       component={Entity}
//                     />
//                     <Route
//                       exact={true}
//                       path="/Template/list"
//                       component={TemplateList}
//                     />
//                     <Route
//                       exact={true}
//                       path="/Template/editor"
//                       component={TemplateEditor}
//                     />
//                                         <Route
//                       exact={true}
//                       path="/Enum/form"
//                       component={EnumForm}
//                     />
//                     <Route
//                       exact={true}
//                       path="/Enum/list"
//                       component={EnumList}
//                     />
//                     <Route exact={true} path="/" Redirect="/Entity/list" />
//                   </Switch>
//                 </React.Suspense>
//               </div>
//               {/* <div className="layout_footer">
//                 <Footer />
//               </div> */}
//               <Modals />
//             </div>
//           </Route>
//         </Switch>
//       </React.Suspense>
//     );
//   }
// }

// export default process.env.NODE_ENV === "development"
//   ? hot(module)(Routes)
//   : Routes;
