import { companyLogos } from "../constants";

const CompanyLogos = ({ clasName }) => {
  return (
    <div className={clasName}>
      <h5 className="tagline mt-6 text-center text-n-1/50">Facilitated By</h5>
      <ul className="flex">
        {companyLogos.map((logo, index) => (
          <li
            className="flex items-center justify-center flex-1 h-[8.5rem]"
            key={index}
          >
            <img src={logo} width={40} height={40} alt={logo} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompanyLogos;
