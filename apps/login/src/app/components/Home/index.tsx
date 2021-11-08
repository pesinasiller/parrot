import { RootStateOrAny, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { MenuEdition } from "@parrot/menu-edition";

export default function Home() {
  const history = useHistory();
  const { authenticated } = useSelector((state: RootStateOrAny) => state);
  if (!authenticated) {
    history.push('/login');
  }
  return <MenuEdition />;
}
