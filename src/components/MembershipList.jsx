import { check } from "../assets";
import { pricing } from "../constants";
import Button from "./Button";

const MembershipList = () => {
  return (
    <div className="flex gap-[1rem] max-lg:flex-wrap justify-center">
      {pricing.map((item) => (
        <div
          key={item.id}
          className="w-[19rem] max-lg:w-full h-full px-6 bg-n-8 border-2 
          border-color-7 rounded-[2rem] lg:w-auto even:py-14 odd:py-8 "
        >
          <h4 className="h4 mb-4">{item.title}</h4>
          <p className="body-2 min-h-[4rem] mb-3 text-n-1/50">
            {item.description}
          </p>
          <div className="flex items-center h-[5.5rem] mb-6">
            {item.monthlyPrice && (
              <>
                <div className="text-[0.75rem] sm:text-[1rem] text-n-2 align-middle">
                  KES{" "}
                </div>
                <div className="text-[2rem] leading-none font-bold sm:text-[3.5rem]">
                  {item.oneOffPrice}{" "}
                  <span className="text-[1.25rem] sm:text-[2rem] align-middle">
                    {" "}
                    +{" "}
                    <span className="text-[0.75rem] sm:text-[1rem] align-middle text-n-2">
                      KES
                    </span>{" "}
                    {item.monthlyPrice}{" "}
                    <span className="text-n-2 text-[0.75rem] sm:text-[1rem] align-middle">
                      / month
                    </span>
                  </span>
                </div>
              </>
            )}
          </div>

          <Button
            className="w-full mb-6"
            href={
              item.oneOffPrice ? "/pricing" : "mailto:noizynightke@gmail.com"
            }
            //white={!!item.oneOffPrice}
          >
            {item.oneOffPrice ? "Get started" : "Contact us"}
          </Button>
          <ul>
            {item.features.map((feature, index) => (
              <li
                key={index}
                className="flex items-start py-5 border-t border-n-4"
              >
                <img src={check} alt="check" width={24} height={24} />
                <p className="body-2 ml-4">{feature}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default MembershipList;
