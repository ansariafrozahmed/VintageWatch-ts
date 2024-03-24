"use client";
import React, { useState, useEffect } from "react";
import Wrapper from "./Wrapper";
import Link from "next/link";
import Menu from "./Menu";
import MenuMobile from "./MenuMobile";

import { BsPerson } from "react-icons/bs";
import { BiMenuAltRight } from "react-icons/bi";
import { VscChromeClose } from "react-icons/vsc";
import { useSession } from "next-auth/react";

const Header = () => {
  const { data: session, status } = useSession();
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showCatMenu, setShowCatMenu] = useState(false);
  const [show, setShow] = useState("translate-y-0");
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavBar = () => {
    window.scrollY > 200
      ? window.scrollY > lastScrollY && !mobileMenu
        ? setShow("-translate-y-[80px]")
        : setShow("shadow-sm")
      : setShow("translate-y-0");
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavBar);
    return () => {
      window.removeEventListener("scroll", controlNavBar);
    };
  }, [lastScrollY]);

  return (
    <header
      className={`w-full h-[12svh] shadow-md bg-white flex items-center justify-between z-20 sticky top-0 transition-transform duration-300 ${show}`}
    >
      <Wrapper className="h-[60px] flex justify-between items-center">
        <Link href={"/"} className="flex">
          <h1 className="font-[500] text-[35px] font-logoFont">
            Vintage Watch
          </h1>
        </Link>

        <Menu showCatMenu={showCatMenu} setShowCatMenu={setShowCatMenu} />

        {mobileMenu && (
          <MenuMobile
            showCatMenu={showCatMenu}
            setShowCatMenu={setShowCatMenu}
            setMobileMenu={setMobileMenu}
          />
        )}

        <div className="flex items-center gap-2 text-black">
          {session ? (
            <Link href={"/profile"}>
              <div className="flex items-center gap-2 transition-all ease-in-out hover:bg-gray-100 p-2 rounded-full pr-4">
                <div className="h-8 w-8 overflow-hidden rounded-full">
                  <img
                    src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
                    alt=""
                    className="h-ful w-full object-cover"
                  />
                </div>
                <div className="">
                  <h2 className="text-sm font-medium">
                    {session?.user?.first_name} {session?.user?.last_name}
                  </h2>
                  <h3 className="-mt-1 text-xs text-gray-700">
                    {session?.user?.email}
                  </h3>
                </div>
              </div>
            </Link>
          ) : (
            <Link href={"/auth/signin"}>
              <div className="flex items-center gap-1 transition-all ease-in-out hover:bg-gray-100 py-2 rounded-full px-4">
                <BsPerson size={20} />
                <h2 className=" font-medium">Sign in</h2>
              </div>
            </Link>
          )}

          {/* icon end */}

          {/* Mobile Icon Start */}
          <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex md:hidden justify-center items-center hover:bg-[#a855f7]/[0.5] cursor-pointer relative -mr-2">
            {mobileMenu ? (
              <VscChromeClose
                className="text-[16px]"
                onClick={() => setMobileMenu(false)}
              />
            ) : (
              <BiMenuAltRight
                className="text-[25px]"
                onClick={() => setMobileMenu(true)}
              />
            )}
          </div>
          {/* Mobile Icon end */}
        </div>
      </Wrapper>
    </header>
  );
};

export default Header;
