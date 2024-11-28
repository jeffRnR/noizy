import Tagline from "./Tagline";
const Heading = ({ className, title, text, tag }) => {
  return (
    <div className={`${className} max-w-[50rem] mx-auto mb-6 lg:mb-6`}>
      {title && <h2 className="h2 text-center mx-2 ">{title}</h2>}
      {text && <p className="body-2 mt-4 text-n-4">{text}</p>}
      {tag && <Tagline className="mb-4 justify-center mt-4 ">{tag}</Tagline>}
    </div>
  );
};

export default Heading;
