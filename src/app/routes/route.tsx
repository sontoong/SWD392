import { Suspense, lazy } from "react";
import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
import { ROLE } from "../../constants/role";

const Layout = lazy(() => import("../components/layout/public-layout"));

//public
const LoginPage = lazy(() => import("../pages/LoginPage"));
const SignupPage = lazy(() => import("../pages/SignupPage"));
const HomePage = lazy(() => import("../pages/HomePage"));
const FreelancerProjectDetailPage = lazy(
  () => import("../pages/FreelancerProjectDetailPage"),
);
const ProjectSearchPage = lazy(() => import("../pages/ProjectSearchPage"));
const FreelancerSearchPage = lazy(
  () => import("../pages/FreelancerSearchPage"),
);

//freelancer
const FreelancerDetailPage = lazy(
  () => import("../pages/FreelancerDetailPage"),
);
const FreelancerProjectList = lazy(
  () => import("../pages/FreelancerProjectList"),
);
const FreelancerIncomeListPage = lazy(
  () => import("../pages/FreelancerIncomeListPage"),
);

//enterprise
const EnterpriseDetailPage = lazy(
  () => import("../pages/EnterpriseDetailPage"),
);
const EnterpriseCreateProjectPage = lazy(
  () => import("../pages/EnterpriseCreateProjectPage"),
);
const EnterpriseProjectListPage = lazy(
  () => import("../pages/EnterpriseProjectListpage"),
);
const EnterpriseProjectDetailPage = lazy(
  () => import("../pages/EnterpriseProjectDetailPage"),
);

//both
import TransactionList from "../pages/TransactionList";

const Forbidden = lazy(() => import("../pages/ForbiddenPage"));
const PrivateRoute = lazy(() => import("./proute"));
const TestPage = lazy(() => import("../pages/TestPage"));
const ErrorPage = lazy(() => import("../pages/404Page"));

const Template = lazy(() => import("../pages/template"));

const PublicLayout = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<></>}>
        <PublicLayout />
      </Suspense>
    ),
    children: [
      {
        path: "",
        element: (
          <Suspense fallback={<></>}>
            <PrivateRoute inverted={true}>
              <HomePage />
            </PrivateRoute>
          </Suspense>
        ),
      },
      {
        path: "home",
        element: <Navigate to={"/"} />,
      },
      {
        path: "freelancers",
        element: (
          <Suspense fallback={<></>}>
            <FreelancerSearchPage />
          </Suspense>
        ),
      },
      {
        path: "projects",
        element: (
          <Suspense fallback={<></>}>
            <ProjectSearchPage />
          </Suspense>
        ),
      },
      {
        path: "projects/:projectId",
        element: (
          <Suspense fallback={<></>}>
            <FreelancerProjectDetailPage />
          </Suspense>
        ),
      },
      {
        path: "forbidden",
        element: (
          <Suspense fallback={<></>}>
            <Forbidden />
          </Suspense>
        ),
      },
      {
        path: "test",
        element: (
          <Suspense fallback={<></>}>
            <TestPage />
          </Suspense>
        ),
      },
      {
        path: "template",
        element: (
          <Suspense fallback={<></>}>
            <PrivateRoute inverted={false} requiredRoles={[ROLE.ADMIN]}>
              <Template />
            </PrivateRoute>
          </Suspense>
        ),
      },
      {
        path: "fd",
        element: (
          <PrivateRoute inverted={false} requiredRoles={[ROLE.FREELANCER]}>
            <Outlet />
          </PrivateRoute>
        ),
        children: [
          {
            path: "projects",
            element: (
              <Suspense fallback={<></>}>
                <FreelancerProjectList />
              </Suspense>
            ),
          },
          {
            path: "report/earnings",
            element: (
              <Suspense fallback={<></>}>
                <FreelancerIncomeListPage />
              </Suspense>
            ),
          },
          {
            path: "report/transactions",
            element: (
              <Suspense fallback={<></>}>
                <TransactionList role={"freelancer"} />
              </Suspense>
            ),
          },
          {
            path: "account",
            element: (
              <Suspense fallback={<></>}>
                <FreelancerDetailPage />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "ed",
        element: (
          <PrivateRoute inverted={false} requiredRoles={[ROLE.ENTERPRISE]}>
            <Outlet />
          </PrivateRoute>
        ),
        children: [
          {
            path: "projects",
            element: (
              <Suspense fallback={<></>}>
                <EnterpriseProjectListPage />
              </Suspense>
            ),
          },
          {
            path: "projects/:projectId",
            element: (
              <Suspense fallback={<></>}>
                <EnterpriseProjectDetailPage />
              </Suspense>
            ),
          },
          {
            path: "new-project",
            element: (
              <Suspense fallback={<></>}>
                <EnterpriseCreateProjectPage />
              </Suspense>
            ),
          },
          {
            path: "edit-project/:projectId",
            element: (
              <Suspense fallback={<></>}>
                <EnterpriseCreateProjectPage edit={true} />
              </Suspense>
            ),
          },
          {
            path: "report/transactions",
            element: (
              <Suspense fallback={<></>}>
                <TransactionList role={"enterprise"} />
              </Suspense>
            ),
          },
          {
            path: "account",
            element: (
              <Suspense fallback={<></>}>
                <EnterpriseDetailPage />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "*",
        element: (
          <Suspense fallback={<></>}>
            <ErrorPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<></>}>
        <PrivateRoute inverted={true}>
          <LoginPage />
        </PrivateRoute>
      </Suspense>
    ),
  },
  {
    path: "/register",
    element: (
      <Suspense fallback={<></>}>
        <PrivateRoute inverted={true}>
          <SignupPage />
        </PrivateRoute>
      </Suspense>
    ),
  },
]);
