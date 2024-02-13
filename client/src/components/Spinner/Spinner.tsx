import { GiSpinalCoil } from "react-icons/gi";

function Spinner() {
  return (
    <div className="animate-spin">
      <GiSpinalCoil className="scale-x-[-1]"/>
    </div>
  );
}

export default Spinner;
