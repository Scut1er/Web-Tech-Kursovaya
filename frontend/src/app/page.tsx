import { routesData } from "@utils/constants";
import { redirect } from "next/navigation";
import { ReactElement } from "react";

const Home = (): ReactElement => {
    redirect(routesData.LOBBY.path);
};

export default Home;
