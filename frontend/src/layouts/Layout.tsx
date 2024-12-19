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
      <div className="flex-grow pt-9 pb-4 px-10 md:px-40">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
