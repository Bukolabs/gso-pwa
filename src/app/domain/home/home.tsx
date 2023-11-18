import { LabelValue } from "../../shared/models/label-value.interface";
import HomeCard from "./home-card/home-card";

function Home() {
  const sampleReview = [
    {
      label: "GSO",
      value: "12",
    },
    {
      label: "Treasurer",
      value: "2",
    },
  ] as LabelValue[];
  const sampleOrder = [
    {
      label: "GSO",
      value: "12",
    },
    {
      label: "Treasurer",
      value: "2",
    },
  ];
  
  return (
    <div className="page">
      <h1>Home</h1>

      <div className="card flex flex-col gap-2 justify-content-center">
        <HomeCard stage={1} requests={20} status="Submitted" />
        <HomeCard prReviews={sampleReview} stage={1} status="Review" />
        <HomeCard stage={2} requests={22} status="Categorized" />
        <HomeCard stage={3} requests={22} orders={13} status="PO Approved" />
        <HomeCard
          stage={4}
          prReviews={sampleReview}
          poReviews={sampleOrder}
          status="PO Review"
        />
        <HomeCard stage={4} requests={1565} orders={500} status="PO Approved" />
        <HomeCard stage={4} requests={1565} orders={500} status="PO Approved" />
        <HomeCard stage={4} requests={1565} orders={500} status="PO Approved" />
        <HomeCard stage={4} requests={1565} orders={500} status="PO Approved" />
        <HomeCard stage={4} requests={1565} orders={500} status="PO Approved" />
      </div>
    </div>
  );
}

export default Home;
