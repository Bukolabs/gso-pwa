import { useGetRequestorSummary } from "@core/query/dashboard.query";
import "./requestor-home.scss";
import { ApiToFormService } from "@core/services/api-to-form.service";
import HeaderContent from "@shared/ui/header-content/header-content";
import SkeletonList from "@shared/ui/skeleton-list/skeleton-list";
import HomeCard from "../home-card/home-card";
import { useNavigate } from "react-router-dom";

/* eslint-disable-next-line */
export interface RequestorHomeProps {}

export function RequestorHome() {
  const { data, isLoading } = useGetRequestorSummary();
  const navigate = useNavigate();

  const stages = ApiToFormService.MapCountCardSummary(data?.data || [], []);
  const stage1 = [stages[0], stages[1], stages[2], stages[3], stages[4], stages[5]];
  const stage2 = [stages[6], stages[7], stages[8], stages[9]];
  const stage3 = [stages[10], stages[11], stages[12]];
  const stage4 = [stages[13], stages[14], stages[15]];

  const handleRequestAction = (filter: string) => {
    navigate(`../request?${filter}`);
  };

  const displayLoading = (
    <div className="card">
      <SkeletonList count={4} mode="dashboard" />
    </div>
  );
  const dashboard = (
    <section>
      <section className="mb-2">
        <h3>Stage 1: PRE-GSO</h3>
        <small>Purchase Request Summary</small>
      </section>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4 mb-4">
        {stage1.map((item, id) => (
          <div key={id} className="flex items-center gap-4">
            <HomeCard {...item} onRequestAction={handleRequestAction} />
            {id <= 1 ? <i className="pi pi-arrow-right"></i> : <span></span>}
          </div>
        ))}
      </div>

      <section className="mb-2">
        <h3>Stage 2: BAC</h3>
        <small>Purchase Request Summary</small>
      </section>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4 mb-4 ">
        {stage2.map((item, id) => (
          <div key={id} className="flex items-center gap-4">
            <HomeCard {...item} onRequestAction={handleRequestAction} />
            {id <= 1 ? <i className="pi pi-arrow-right"></i> : <span></span>}
          </div>
        ))}
      </div>

      <section className="mb-2">
        <h3>Stage 3: POST-GSO</h3>
        <small>Purchase Orders & Requests Summary</small>
      </section>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4 mb-4 ">
        {stage3.map((item, id) => (
          <div key={id} className="flex items-center gap-4">
            <HomeCard {...item} onRequestAction={handleRequestAction} />
            {id <= 1 ? <i className="pi pi-arrow-right"></i> : <span></span>}
          </div>
        ))}
      </div>

      <section className="mb-2">
        <h3>Stage 4: Completion</h3>
        <small>Purchase Orders & Requests Summary</small>
      </section>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4 mb-4">
        {stage4.map((item, id) => (
          <div key={id} className="flex items-center gap-4">
            <HomeCard {...item} onRequestAction={handleRequestAction} />
            {id <= 1 ? <i className="pi pi-arrow-right"></i> : <span></span>}
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <div className="requestor-home">
      <HeaderContent title="Home">
        <></>
      </HeaderContent>

      <div className="p-7">{!isLoading ? dashboard : displayLoading}</div>
    </div>
  );
}

export default RequestorHome;
