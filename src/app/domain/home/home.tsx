import "./home";
import { LabelValue } from "@shared/models/label-value.interface";
import HomeCard from "./home-card/home-card";
import HeaderContent from "@shared/ui/header-content/header-content";

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
      <HeaderContent title="Home">
        <></>
      </HeaderContent>

      <div className="p-7">
        <section className="mb-2">
          <h3>Stage 1: PRE-GSO</h3>
          <small>Purchase Request Summary</small>
        </section>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4 mb-4">
          <HomeCard stage={1} requests={20} status="Submitted" />
          <HomeCard prReviews={sampleReview} stage={1} status="Review" />
          <HomeCard stage={1} requests={17} status="Approved" />
          <HomeCard stage={1} requests={6} status="Declined" />
        </div>

        <section className="mb-2">
          <h3>Stage 2: BAC</h3>
          <small>Purchase Request Summary</small>
        </section>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4 mb-4 ">
          <HomeCard stage={2} requests={22} status="Categorized" />
          <HomeCard stage={2} requests={12} status="Posted" />
          <HomeCard stage={2} requests={44} status="Bidding" />
          <HomeCard stage={2} requests={67} status="Awarded" />
        </div>

        <section className="mb-2">
          <h3>Stage 3: POST-GSO</h3>
          <small>Purchase Orders & Requests Summary</small>
        </section>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4 mb-4 ">
          <HomeCard
            stage={3}
            prReviews={sampleReview}
            poReviews={sampleOrder}
            status="PO Review"
          />
          <HomeCard stage={3} requests={222} orders={78} status="PO Approved" />
          <HomeCard stage={3} requests={121} orders={67} status="PO Declined" />
        </div>

        <section className="mb-2">
          <h3>Stage 4: Completion</h3>
          <small>Purchase Orders & Requests Summary</small>
        </section>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4 mb-4">
          <HomeCard
            stage={4}
            requests={1565}
            orders={500}
            status="Inspection"
          />
          <HomeCard
            stage={4}
            requests={1565}
            orders={500}
            status="Partial"
          />
          <HomeCard
            stage={4}
            requests={1565}
            orders={500}
            status="Fulfilled"
          />
          <HomeCard
            stage={4}
            requests={1565}
            orders={500}
            status="Unfulfilled"
          />
          <HomeCard
            stage={4}
            requests={1565}
            orders={500}
            status="Late"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
