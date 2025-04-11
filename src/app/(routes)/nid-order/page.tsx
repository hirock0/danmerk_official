import SignCopyOrder from "@/components/signCopyOrder/signCopyOrder";
import HeadLineSlide from "@/components/headLineSlide/headLineSlide";
const NidOrderPage = () => {
  return (
    <div>
      <div className=" h-20 flex items-center">
        <HeadLineSlide headline={["Sign Copy"]} />
      </div>
      <div className=" bg-white mx-2 px-20">
        <SignCopyOrder textTitle={"NID Card Order"} />
      </div>
    </div>
  );
};

export default NidOrderPage;
