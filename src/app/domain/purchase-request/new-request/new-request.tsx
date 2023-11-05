import { Button } from "primereact/button";
import HeaderContent from "../../../core/ui/header-content/header-content";
import "./new-request";
import useScreenSize from "../../../core/utility/screen-size";
import { useNavigate } from "react-router-dom";


export function NewRequest() {
  const { isMobile } = useScreenSize();
  const navigate = useNavigate();

  return (
    <div className="new-request">
      <HeaderContent title="New Request" onBack={() => navigate('../')}>
        <div className="flex gap-2">
          <Button
            className="w-full block"
            label="Save"
            text={isMobile}
          ></Button>
        </div>
      </HeaderContent>
    </div>
  );
}

export default NewRequest;
