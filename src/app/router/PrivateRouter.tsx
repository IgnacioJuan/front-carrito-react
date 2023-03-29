import { useNavigate, Route } from "react-router-dom";

interface Props {
   loggedIn: boolean | undefined,
   component: any,
}

export function PrivateRouter({ loggedIn, component }: Props) {
   const navigate = useNavigate();

   if (!loggedIn) {
      navigate("/inicio");
      return null;
   }

   return <Route element={component} />;
}