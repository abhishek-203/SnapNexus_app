import { Outlet, Navigate } from "react-router-dom";

const AuthLayout = () => {
  const isAuthnticated = false;

  return (
    <>
      {isAuthnticated ? (
        <Navigate to="/" />
      ) : (
        <>
          <section className="flex flex-1 justify-center bg-black text-white items-center flex-col py-10">
            <Outlet />
          </section>

          <img
            src="/assets/images/img.jpg"
            alt="logo"
            className="hidden-x1:block h-screen w-1/2 object-cover bg-no-repeat"
          />
        </>
      )}
    </>
  );
};

export default AuthLayout;
