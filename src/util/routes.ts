import Login from "../apps/Login";
import CurrentSession from "../apps/CurrentSession";
import Dashboard from "../apps/Dashboard";
import Mentees from "../apps/Mentees";
import NewSession from "../apps/NewSession";
import Notifications from "../apps/Notifications";
import Settings from "../apps/Settings";
import Resources from "../apps/Resources";
import Profile from "../apps/Profile";
import EditMentee from "../apps/EditMentee";



export const Paths = {
  login: "/login",
  dashboard: "/",
  mentees: "/mentees",
  notifications: "/notifications",
  settings: "/settings",
  newSession: "/new-session",
  currentSession: "/current-session",
  profile: "/profile",
  resources: "/resources",
  editMentee: "/edit-mentee",
};

export const PublicPaths: string[] = [Paths.login];

export interface Route {
  path: string;
  exact: boolean;
  component: any;
  props?: any;
}

export const routes: Route[] = [
  {
    path: Paths.login,
    component: Login,
    exact: true,
  },
  {
    path: Paths.dashboard,
    component: Dashboard,
    exact: true,
  },
  {
    path: Paths.mentees,
    component: Mentees,
    exact: true,
  },
  {
    path: Paths.notifications,
    component: Notifications,
    exact: true,
  },
  {
    path: Paths.settings,
    component: Settings,
    exact: true,
  },
  {
    path: Paths.newSession,
    component: NewSession,
    exact: true,
  },
  {
    path: Paths.currentSession,
    component: CurrentSession,
    exact: true,
  },
  {
    path: Paths.profile,
    component: Profile,
    exact: true,
  },
  {
    path: Paths.resources,
    component: Resources,
    exact: true,
  },
  {
    path: Paths.editMentee,
    component: EditMentee,
    exact: true,
  },
];
