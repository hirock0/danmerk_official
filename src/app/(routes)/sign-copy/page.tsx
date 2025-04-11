import HeadLineSlide from "@/components/headLineSlide/headLineSlide"
import SignCopyOrder from "@/components/signCopyOrder/signCopyOrder"

const SignCopyPage = () => {
    return (
        <div>
            <div className=" h-20 flex items-center">
                <HeadLineSlide headline={["Sign Copy"]}/>
            </div>
            <SignCopyOrder/>
        </div>
    )
}

export default SignCopyPage
