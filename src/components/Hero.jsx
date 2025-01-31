import {
  curve,
  heroBackground,
  noizy_1,
  noizy_2,
  noizy_3,
  noizy_logo,
  noizy_moon,
  noizylogo_new,
} from "../assets";
import Button from "./Button";
import Section from "./Section";
import { BackgroundCircles, BottomLine, Gradient } from "./design/Hero";
import { heroIcons } from "../constants";
import { ScrollParallax } from "react-just-parallax";
import { useRef } from "react";
import CompanyLogos from "./CompanyLogos";

const Hero = () => {
  const parallaxRef = useRef(null);
  return (
    <Section
      className="pt-[12rem] -mt-[5.25rem]"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="hero"
    >
      <div className="container relative" ref={parallaxRef}>
        <div
          className="relative z-1 max-w-[62rem] mx-auto text-center
         mb-[4rem] md:mb-20 lg:mb:[6rem]"
        >
          <h1 className="h1 mb-6">
            <span className="inline-block relative">
              Noizy Nightz
              {/* <img
                src={curve}
                className="absolute top-full left-0 w-full xl:-mt-2"
                width={624}
                height={8}
                alt="curve"
              ></img> */}
            </span>
          </h1>
          <p className="body-1 max-w-xl mx-auto mb-6 text-n-2 lg:mb-8">
            An event platform in Nairobi to celebrate diverse music genres
          </p>
          <Button href="#events">Events</Button>
        </div>
        <div className="relative max-w-[23rem] mx-auto md:max-w-5xl xl:mb-24">
          <div className="relative z-1 p-0.5 rounded-2xl bg-conic-gradient">
            <div className="relative bg-n-8 rounded-[1rem] ">
              <div className="h-[1.4rem] bg-n-10 rounded-t-[0.9rem] " />

              <div
                className="aspect-[1/1] rounded-b-[0.9rem] overflow-hidden 
              md:aspect-[605/595] lg:aspect-[1124/585]"
              >
                <img
                  src={noizy_moon}
                  className="w-full scale-[1] translate-y-[0] md:scale-[1]
                  md:-translate-y-[10%] lg:-translate-y-[41%]"
                  width={1024}
                  height={490}
                  alt="hero"
                />
                <ScrollParallax isAbsolutelyPositioned>
                  <ul
                    className="hidden absolute -left-[5.5rem] bottom-[7.5rem] 
                    px-1 py-1 bg-n-9/40 backdrop-blur border 
                    border-n-1/10 rounded-2xl xl:flex"
                  >
                    {heroIcons.map((icon, index) => (
                      <li className="p-5" key={index}>
                        <img src={icon} alt={icon} width={24} height={24} />
                      </li>
                    ))}
                  </ul>
                </ScrollParallax>
              </div>
            </div>

            <Gradient />
          </div>
          <div
            className="absolute -top-[34%] left-1/2 w-[220%] -translate-x-1/2
          md:-top[46%] md:w-[138%] lg:-w-[104%]"
          >
            <img
              src={noizy_logo}
              className="w-full opacity-10 rounded-2xl"
              alt="hero-bg"
              width={1440}
              height={1800}
            />
          </div>
          {/* <BackgroundCircles /> */}
        </div>

        <CompanyLogos className="hidden relative z-10 mt-20 lg:block" />
      </div>
      <BottomLine />
    </Section>
  );
};

export default Hero;
