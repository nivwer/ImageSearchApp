import Divider from "@/components/Divider/Divider";
import Spinner from "@/components/Spinner/Spinner";

function LoadingPage() {
  return (
    <Divider children={<Spinner />}/>
  );
}

export default LoadingPage;
