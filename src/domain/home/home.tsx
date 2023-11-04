import HomeCard from "./home-card/home-card";

function Home() {
  return (
    <div>
      <h1>Home</h1>

      <div className="card flex flex-col gap-2 justify-content-center">
        <HomeCard status="Submitted" />
        <HomeCard status="Review" hasReview={true} />
      </div>
    </div>
  );
}

export default Home;
