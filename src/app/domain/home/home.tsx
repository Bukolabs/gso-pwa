import "./home";
import HomeCard from "./home-card/home-card";
import HeaderContent from "@shared/ui/header-content/header-content";
import {
  useGetStage1SummaryQy,
  useGetStage1SummaryReviewQy,
  useGetStage2SummaryQy,
  useGetStage3SummaryQy,
  useGetStage3SummaryReviewQy,
  useGetStage4SummaryQy,
} from "@core/query/dashboard.query";
import { ApiToFormService } from "@core/services/api-to-form.service";
import { useNavigate } from "react-router-dom";
import SkeletonList from "@shared/ui/skeleton-list/skeleton-list";
import { Sidebar } from "primereact/sidebar";
import { useState } from "react";
import QrScanner from "@core/ui/qr-scanner/qr-scanner";
import { Button } from "primereact/button";

function Home() {
  const [qrVisible, setQrVisible] = useState(false);

  const { data: stage1, isLoading: s1Loading } = useGetStage1SummaryQy();
  const { data: stage1Review } = useGetStage1SummaryReviewQy();

  const { data: stage2, isLoading: s2Loading } = useGetStage2SummaryQy();

  const { data: stage3, isLoading: s3Loading } = useGetStage3SummaryQy();
  const { data: stage3Review } = useGetStage3SummaryReviewQy();

  const { data: stage4, isLoading: s4Loading } = useGetStage4SummaryQy();

  const navigate = useNavigate();

  const stage1Model = ApiToFormService.MapCountCardSummary(
    stage1?.data || [],
    stage1Review?.data || []
  );
  const stage2Model = ApiToFormService.MapCountCardSummary(
    stage2?.data || [],
    [],
    "orders"
  );
  const stage3Model = ApiToFormService.MapCountCardSummary(
    stage3?.data || [],
    stage3Review?.data || [],
    "orders"
  );
  const stage4Model = ApiToFormService.MapCountCardSummary(
    stage4?.data || [],
    [],
    "orders"
  );

  const handleRequestAction = (filter: string) => {
    navigate(`request?${filter}`);
  };
  const handleOrderAction = (filter: string) => {
    navigate(`order?${filter}`);
  };
  const handleReviewAction = (filter: string) => {
    navigate(`request?${filter}`);
  };
  const handleOrderReviewAction = (filter: string) => {
    navigate(`order?${filter}`);
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
        {stage1Model.map((item, id) => (
          <div key={id} className="flex items-center gap-4">
            <HomeCard
              {...item}
              onRequestAction={handleRequestAction}
              onReviewerAction={handleReviewAction}
            />
            {id <= 1 ? <i className="pi pi-arrow-right"></i> : <span></span>}
          </div>
        ))}
      </div>

      <section className="mb-2">
        <h3>Stage 2: BAC</h3>
        <small>Purchase Request Summary</small>
      </section>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4 mb-4 ">
        {stage2Model.map((item, id) => (
          <div key={id} className="flex items-center gap-4">
            <HomeCard key={id} {...item} onOrderAction={handleOrderAction} />
            {id <= 2 ? <i className="pi pi-arrow-right"></i> : <span></span>}
          </div>
        ))}
      </div>

      <section className="mb-2">
        <h3>Stage 3: POST-GSO</h3>
        <small>Purchase Orders & Requests Summary</small>
      </section>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4 mb-4 ">
        {stage3Model.map((item, id) => (
          <div key={id} className="flex items-center gap-4">
            <HomeCard
              key={id}
              {...item}
              onOrderAction={handleOrderAction}
              onOrderReviewerAction={handleOrderReviewAction}
            />
            {id <= 0 ? <i className="pi pi-arrow-right"></i> : <span></span>}
          </div>
        ))}
      </div>

      <section className="mb-2">
        <h3>Stage 4: Completion</h3>
        <small>Purchase Orders & Requests Summary</small>
      </section>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4 mb-4">
        {stage4Model.map((item, id) => (
          <div key={id} className="flex items-center gap-4">
            <HomeCard key={id} {...item} onOrderAction={handleOrderAction} />
            {id <= 1 ? <i className="pi pi-arrow-right"></i> : <span></span>}
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <div className="page">
      <HeaderContent title="Home">
        <></>
      </HeaderContent>

      <div className="p-7">
        {!s1Loading && !s2Loading && !s3Loading && !s4Loading
          ? dashboard
          : displayLoading}
      </div>

      <Sidebar visible={qrVisible} onHide={() => setQrVisible(false)} fullScreen>
        <QrScanner />
      </Sidebar>
      <Button
        label="Scan Qr"
        icon="pi pi-camera"
        className="fixed right-2 bottom-28 md:bottom-2 cursor-pointer z-[999]"
        onClick={() => setQrVisible(true)}
      />
    </div>
  );
}

export default Home;
