import { useRouteError } from "react-router-dom";

export const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);
  return (
    //work on this later
    <div>
      <h1>Page not found</h1>
    </div>
  );
};
