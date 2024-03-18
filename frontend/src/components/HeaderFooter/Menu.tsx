import Link from "next/link";
import React, { useState } from "react";
import { BsChevronDown } from "react-icons/bs";

interface MenuItem {
  id: number;
  name: string;
  url?: string;
  subMenu?: boolean;
}

interface SubMenuItem {
  id: number;
  name: string;
}

interface MenuProps {
  showCatMenu: boolean;
  setShowCatMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const Menu: React.FC<MenuProps> = ({ showCatMenu, setShowCatMenu }) => {
  const [data] = useState<MenuItem[]>([
    { id: 1, name: "Home", url: "/" },
    { id: 2, name: "About", url: "/about" },
    { id: 3, name: "Categories", subMenu: true },
    { id: 4, name: "Contact", url: "/contact" },
  ]);

  const [subMenuData] = useState<SubMenuItem[]>([
    { id: 1, name: "Jordan" },
    { id: 2, name: "Sneakers" },
    { id: 3, name: "Running shoes" },
    { id: 4, name: "Football shoes" },
  ]);

  return (
    <>
      <ul className="hidden md:flex items-center gap-8 font-medium text-black">
        {data.map((item) => {
          return (
            <React.Fragment key={item.id}>
              {!!item?.subMenu ? (
                <li
                  className="cursor-pointer flex items-center gap-2 relative"
                  onMouseEnter={() => setShowCatMenu(true)}
                  onMouseLeave={() => setShowCatMenu(false)}
                >
                  {item.name}
                  <BsChevronDown size={14} />

                  {showCatMenu && (
                    <ul className="bg-white absolute top-6 left-0 min-w-[256px] rounded-lg px-1 py-1 text-black shadow-lg">
                      {subMenuData.map((submenu) => {
                        return (
                          <Link
                            key={submenu.id}
                            href={"/"}
                            onClick={() => setShowCatMenu(false)}
                          >
                            <li className="h-12 flex justify-between items-center px-3 hover:bg-black/[0.03] rounded-md">
                              {submenu.name}{" "}
                            </li>
                          </Link>
                        );
                      })}
                    </ul>
                  )}
                </li>
              ) : (
                <li className="cursor-pointer">
                  <Link href={"/"}>{item.name}</Link>
                </li>
              )}
            </React.Fragment>
          );
        })}
      </ul>
    </>
  );
};

export default Menu;
