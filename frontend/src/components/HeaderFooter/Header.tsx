"use client";
import React, { useState, useEffect } from "react";
import Wrapper from "./Wrapper";
import Link from "next/link";
import Menu from "./Menu";
import MenuMobile from "./MenuMobile";

import { BsPerson } from "react-icons/bs";
import { BiMenuAltRight } from "react-icons/bi";
import { VscChromeClose } from "react-icons/vsc";
import { signOut, useSession } from "next-auth/react";
import { Popover } from "antd";
import { LogOut, Plus, ScrollText, Settings, User } from "lucide-react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showCatMenu, setShowCatMenu] = useState(false);
  // const [show, setShow] = useState("translate-y-0");
  // const [lastScrollY, setLastScrollY] = useState(0);

  // const controlNavBar = () => {
  //   window.scrollY > 200
  //     ? window.scrollY > lastScrollY && !mobileMenu
  //       ? setShow("-translate-y-[80px]")
  //       : setShow("shadow-sm")
  //     : setShow("translate-y-0");
  //   setLastScrollY(window.scrollY);
  // };

  // useEffect(() => {
  //   window.addEventListener("scroll", controlNavBar);
  //   return () => {
  //     window.removeEventListener("scroll", controlNavBar);
  //   };
  // }, [lastScrollY]);

  const handleSignOut = () => {
    Swal.fire({
      title: "Are you sure ?",
      showDenyButton: true,
      //   showCancelButton: true,
      confirmButtonText: "Yes",
      //   denyButtonText: `Don't save`,
      icon: "warning",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await signOut({
          redirect: false,
        });
        Swal.fire({
          title: "Success!",
          text: "Successfully Signout!",
          icon: "success",
        }).then(() => {
          router.push("/auth/signin");
        });
      }
    });
  };

  const content = (
    <div className="w-[200px]">
      <div className=" py-4 px-2">
        <h2 className="text-base font-medium">
          {session?.user?.first_name} {session?.user?.last_name}
        </h2>
        <h3 className="-mt-1 text-xs line-clamp-1 text-gray-700">
          {session?.user?.email}
        </h3>
      </div>
      <hr className="py-1" />
      <ul className="space-y-1">
        <Link href={"/profile"}>
          <li className="flex hover:bg-gray-100 transition-all ease-in-out cursor-pointer p-2 rounded-lg items-center gap-2">
            <User size={18} />
            My Account
          </li>
        </Link>
        <Link href={"/new-listing"}>
          <li className="flex hover:bg-gray-100 transition-all ease-in-out cursor-pointer p-2 rounded-lg items-center gap-2">
            <Plus size={18} />
            New Listing
          </li>
        </Link>
        <Link href={"/my-listing"}>
          <li className="flex hover:bg-gray-100 transition-all ease-in-out cursor-pointer p-2 rounded-lg items-center gap-2">
            <ScrollText size={18} />
            My Listing
          </li>
        </Link>
        <Link href={"/settings"}>
          <li className="flex hover:bg-gray-100 transition-all ease-in-out cursor-pointer p-2 rounded-lg items-center gap-2">
            <Settings size={18} />
            Settings
          </li>
        </Link>
        <li
          onClick={handleSignOut}
          className="flex hover:bg-gray-100 transition-all ease-in-out cursor-pointer p-2 rounded-lg items-center gap-2"
        >
          <LogOut size={18} />
          Sign Out
        </li>
      </ul>
    </div>
  );

  return (
    <header
      className={`w-full h-[12svh] shadow-md bg-white flex items-center justify-between z-20 sticky top-0 transition-transform duration-300`}
    >
      <Wrapper className="h-[60px] flex justify-between items-center">
        <Link href={"/"} className="flex">
          <h2 className="font-[500] text-[28px] lg:text-[35px] font-logoFont">
            Vintage Watch
          </h2>
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
            <Popover
              className="cursor-pointer"
              content={content}
              trigger="click"
              placement="bottomRight"
            >
              <div className="flex items-center gap-2 transition-all ease-in-out hover:bg-gray-100 p-2 rounded-full lg:pr-4">
                <div className="h-8 w-8 overflow-hidden rounded-full">
                  <img
                    src="https://st4.depositphotos.com/14903220/22197/v/450/depositphotos_221970610-stock-illustration-abstract-sign-avatar-icon-profile.jpg"
                    alt=""
                    className="h-ful w-full object-cover"
                  />
                </div>
                <div className="hidden lg:block">
                  <h2 className="text-sm font-medium">
                    {session?.user?.first_name} {session?.user?.last_name}
                  </h2>
                  <h3 className="-mt-1 text-xs text-gray-700">Account</h3>
                </div>
              </div>
            </Popover>
          ) : (
            <Link href={"/auth/signin"}>
              <div className="flex items-center gap-2 transition-all ease-in-out hover:bg-gray-100 p-2 rounded-full lg:pr-4">
                <div className="h-8 w-8 overflow-hidden rounded-full">
                  <img
                    src="https://st4.depositphotos.com/14903220/22197/v/450/depositphotos_221970610-stock-illustration-abstract-sign-avatar-icon-profile.jpg"
                    alt=""
                    className="h-ful w-full object-cover"
                  />
                </div>
                <div className="hidden lg:block">
                  <h2 className="text-sm font-medium">Account</h2>
                  <h3 className="-mt-1 text-xs text-gray-700">Sign in</h3>
                </div>
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
