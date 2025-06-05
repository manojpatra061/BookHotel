import { useAppContext } from "@/contexts/AppContext";
import LogoutButton from "./LogoutButton";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import { LinkButton } from ".";

const NavMenu = () => {
  const { isLoggedIn } = useAppContext();
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);

  return (
    <>
      {/* for mobile screen */}
      <div className="md:hidden">
        <GiHamburgerMenu
          className="text-white text-4xl"
          onClick={() => {
            setIsNavOpen(!isNavOpen);
          }}
        />
        {isNavOpen && (
          <div className="z-50 absolute right-5 w-[90%] h-fit py-4 px-4 bg-gray-200">
            <nav className="flex flex-col gap-2">
              {isLoggedIn ? (
                <>
                  {[
                    { linkTo: "/my-hotels", linkText: "my hotels" },
                    { linkTo: "/add-hotel", linkText: "add hotel" },
                  ].map((linkDetails, i) => (
                    <LinkButton
                      key={i}
                      linkTo={linkDetails.linkTo}
                      linkText={linkDetails.linkText}
                      linkType="simple"
                      onClick={() => setIsNavOpen(false)}
                    />
                  ))}
                  <LogoutButton />
                </>
              ) : (
                <>
                  {[
                    { linkTo: "/login", linkText: "login" },
                    { linkTo: "/register", linkText: "register" },
                  ].map((linkDetails, i) => (
                    <LinkButton
                      key={i}
                      linkTo={linkDetails.linkTo}
                      linkText={linkDetails.linkText}
                      linkType="simple"
                      onClick={() => setIsNavOpen(false)}
                    />
                  ))}
                </>
              )}
            </nav>
          </div>
        )}
      </div>
      {/* For medium to large screen */}
      <div className="hidden md:block">
        <span className="flex gap-4">
          {isLoggedIn ? (
            <>
              {[
                { linkTo: "/my-hotels", linkText: "my hotels" },
                { linkTo: "/add-hotel", linkText: "add hotel" },
              ].map((linkDetails, i) => (
                <LinkButton
                  key={i}
                  linkTo={linkDetails.linkTo}
                  linkText={linkDetails.linkText}
                  linkType="simple"
                />
              ))}
              <LogoutButton />
            </>
          ) : (
            <>
              {[
                { linkTo: "/login", linkText: "login" },
                { linkTo: "/register", linkText: "register" },
              ].map((linkDetails, i) => (
                <LinkButton
                  key={i}
                  linkTo={linkDetails.linkTo}
                  linkText={linkDetails.linkText}
                  linkType="simple"
                />
              ))}
            </>
          )}
        </span>
      </div>
    </>
  );
};

export default NavMenu;
