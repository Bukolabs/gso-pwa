import "./home";
import { LabelValue } from "@shared/models/label-value.interface";
import HomeCard, { HomeCardProps } from "./home-card/home-card";
import HeaderContent from "@shared/ui/header-content/header-content";
import {
  useGetStage1SummaryQy,
  useGetStage1SummaryReviewQy,
} from "@core/query/dashboard.query";
import { ApiToFormService } from "@core/services/api-to-form.service";
import { useNavigate } from "react-router-dom";

function Home() {
  const { data: stage1 } = useGetStage1SummaryQy();
  const { data: stage1Review } = useGetStage1SummaryReviewQy();
  const navigate = useNavigate();

  const stage1Model = ApiToFormService.MapCountCardSummary(
    stage1?.data || [],
    stage1Review?.data || []
  );
  const stage2Model = [
    {
      status: "CATEGORIZED",
      requests: 0,
      orders: 0,
    },
    {
      status: "POSTED",
      requests: 0,
      orders: 0,
    },
    {
      status: "BIDDING",
      requests: 0,
      orders: 0,
    },
    {
      status: "AWARDED",
      requests: 0,
      orders: 0,
    },
  ] as HomeCardProps[];
  const stage3Model = [
    {
      status: "PO-REVIEW",
      requests: 0,
      orders: 0,
      poReviews: [
        { label: "CGSO", value: 0 },
        { label: "CTO", value: 0 },
        { label: "CMO", value: 0 },
      ] as LabelValue<number>[],
      prReviews: [
        { label: "CGSO", value: 0 },
        { label: "CTO", value: 0 },
        { label: "CMO", value: 0 },
      ] as LabelValue<number>[],
    },
    {
      status: "PO-APPROVED",
      requests: 0,
      orders: 0,
    },
    {
      status: "PO-DECLINED",
      requests: 0,
      orders: 0,
    },
  ] as HomeCardProps[];
  const stage4Model = [
    {
      status: "INSPECTION",
      requests: 0,
      orders: 0,
    },
    {
      status: "PARTIAL",
      requests: 0,
      orders: 0,
    },
    {
      status: "FULFILLED",
      requests: 0,
      orders: 0,
    },
    {
      status: "UNFULFILLED",
      requests: 0,
      orders: 0,
    },
  ] as HomeCardProps[];

  const handleRequestAction = (filter: string) => {
    navigate(`request?${filter}`);
  };
  const handleReviewAction = (filter: string) => {
    console.log(filter);
    navigate(`request?${filter}`);
  };

  return (
    <div className="page">
      <HeaderContent title="Home">
        <></>
      </HeaderContent>

      <div className="p-7">
        <section className="mb-2">
          <h3>Stage 1: PRE-GSO</h3>
          <small>Purchase Request Summary</small>
        </section>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4 mb-4">
          {stage1Model.map((item, id) => (
            <HomeCard
              key={id}
              {...item}
              onRequestAction={handleRequestAction}
              onReviewerAction={handleReviewAction}
            />
          ))}
        </div>

        <section className="mb-2">
          <h3>Stage 2: BAC</h3>
          <small>Purchase Request Summary</small>
        </section>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4 mb-4 ">
          {stage2Model.map((item, id) => (
            <HomeCard
              key={id}
              {...item}
              onRequestAction={handleRequestAction}
            />
          ))}
        </div>

        <section className="mb-2">
          <h3>Stage 3: POST-GSO</h3>
          <small>Purchase Orders & Requests Summary</small>
        </section>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4 mb-4 ">
          {stage3Model.map((item, id) => (
            <HomeCard
              key={id}
              {...item}
              onRequestAction={handleRequestAction}
            />
          ))}
        </div>

        <section className="mb-2">
          <h3>Stage 4: Completion</h3>
          <small>Purchase Orders & Requests Summary</small>
        </section>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4 mb-4">
          {stage4Model.map((item, id) => (
            <HomeCard
              key={id}
              {...item}
              onRequestAction={handleRequestAction}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
