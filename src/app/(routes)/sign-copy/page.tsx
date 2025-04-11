import HeadLineSlide from "@/components/headLineSlide/headLineSlide";
import SignCopyOrder from "@/components/signCopyOrder/signCopyOrder";

const SignCopyPage = () => {
  return (
    <div>
      <div className=" h-20 flex items-center">
        <HeadLineSlide headline={["Sign Copy"]} />
      </div>
      <div className=" bg-white mx-2 px-20">
        <SignCopyOrder textTitle = {"Sign Copy Order"} />
      </div>
    </div>
  );
};

export default SignCopyPage;
