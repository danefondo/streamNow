import VueRouter from "vue-router";
import Home from "./pages/Home";
import GoLive from "./pages/GoLive";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Scheduled from "./pages/Scheduled";
import Watch from "./pages/Watch";
import EditStream from "./pages/EditStream";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import VerifyUser from "./pages/VerifyUser";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import ResetPass from "./pages/ResetPass";
import ForgotPass from "./pages/ForgotPass";
import Settings from "./pages/Settings";
import Error404 from "./pages/Error404";
import auth from "./config/auth";

const routes = [
  { path: "/scheduled", component: Scheduled },
  {
    path: "/dashboard/golive",
    component: GoLive,
    meta: {
      requireAuthentication: true,
    },
  },
  { path: "/watch/:id", component: Watch },
  {
    path: "/edit/:id",
    component: EditStream,
    meta: {
      requireAuthentication: true,
    },
  },
  { path: "/discover", component: Home },
  { path: "/login", component: Login, name: "Login" },
  { path: "/register", component: Register },
  { path: "/verify/:token", component: VerifyUser, name: "Verify" },
  { path: "/about", component: About },
  { path: "/privacy", component: Privacy },
  { path: "/terms", component: Terms },
  { path: "/contact", component: Contact },
  { path: "/profile/:id", component: Profile },
  { path: "/reset", component: ResetPass },
  { path: "/accounts/forgotPass", component: ForgotPass },
  {
    path: "/dashboard/settings", component: Settings, meta: {
      requireAuthentication: true,
    },
  },
  { path: "/error404", component: Error404 },
  { path: "/", component: Home },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

const noReAuth = ["Login", "Verify"]
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuthentication && !auth.isAuthenticated()) {
    next({ name: "Login" });
  } else if (noReAuth.includes(to.name) && auth.isAuthenticated()) {
    next("/");
  } else {
    next();
  }
});

export default router;
