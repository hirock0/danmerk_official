import Marquee from "react-fast-marquee";
const HeadLineSlide = ({ headline }: { headline: string[] | any }) => {
  return (
    <div className=" w-full h-full py-5 px-5">
      <div className=" bg-white py-2 rounded-md">
        <Marquee>
          <div className=" flex items-center text-2xl text-blue-500 gap-5">
            {headline?.map((item: any, index: any) => (
              <p key={index}>{item}</p>
            ))}
          </div>
        </Marquee>
      </div>
    </div>
  );
};

export default HeadLineSlide;
