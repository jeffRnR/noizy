"use client";
import { Link, useLocation } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";

import { noizy_logo, noizylogo_new } from "../assets";
import { navigation } from "../constants";
import Button from "./Button";
import MenuSvg from "../assets/svg/MenuSvg";
import { HamburgerMenu } from "./design/Header";
import { useState } from "react";

const Header = () => {
  const pathname = useLocation();
  const [openNavigation, setOpenNavigation] = useState(false);

  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
      enablePageScroll();
    } else {
      setOpenNavigation(true);
      disablePageScroll();
    }
  };
  const handleClick = () => {
    if (!openNavigation) return;
    enablePageScroll();
    setOpenNavigation(false);
  };
  return (
    <div
      className={`fixed left-0 top-0 w-full z-50 border-b
    border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm transition-all duration-700 ease-in-out
    ${openNavigation ? "bg-n-8" : "bg-n-8/90 backdrop:blur-sm"}`}
    >
      <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4 transition-all duration-700 ease-in-out">
        <a
          className="block w-[12rem] xl:mr-8 transition-all duration-700 ease-in-out"
          href="/"
        >
          <img
            src={noizylogo_new}
            alt="Noizy Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
        </a>
        <nav
          className={`${
            openNavigation ? "flex" : "hidden"
          } fixed top-[5rem] left-0 right-0 bottom-0 
        bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent transition-all duration-700 ease-in-out`}
        >
          <div
            className="relative z-2 flex flex-col items-center 
            justify-center m-auto lg:flex-row  h-full my-6 transition-all duration-700 ease-in-out"
          >
            {navigation.map((item) => (
              <Link
                key={item.id}
                // href={item.url}
                to={`${item.url}`}
                onClick={handleClick}
                className={`block relative font-code text-2xl uppercase text-n-1 
                    transition-colors duration-700 ease-in-out hover:text-color-1 ${
                      item.onlyMobile ? "lg:hidden" : ""
                    } px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold transition-all duration-700 ease-in-out
                     ${
                       item.url === pathname.pathname
                         ? "z-2 lg:text-color-1"
                         : "lg:text-n-1f"
                     } lg:leading-5 lg:hover:text-color-1 xl:px-12`}
              >
                {item.title}
              </Link>
            ))}
          </div>
          <HamburgerMenu />
        </nav>
        {/* <Button className="hidden lg:flex" href="/login">
          Sign In
        </Button> */}
        <Button
          className="ml-auto lg:hidden"
          px="px-3"
          onClick={toggleNavigation}
        >
          <MenuSvg openNavigation={openNavigation} />
        </Button>
      </div>
    </div>
  );
};

export default Header;
