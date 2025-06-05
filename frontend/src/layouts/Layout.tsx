import { ReactNode } from "react";
import { Header, Hero, SearchBar, Footer } from "../components";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Hero />
      <SearchBar />
      <div className="px-10 md:px-40 pt-4 pb-4 grow">
        <div className="container mx-auto">{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
