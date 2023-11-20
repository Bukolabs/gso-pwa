import { useAddBidder } from "@core/query/bidder.query";
import "./new-bidder";
import { CreateBidderDto } from "@api/api";

/* eslint-disable-next-line */
export interface NewBidderProps {}

export function NewBidder() {
  const { mutate: addBidder } = useAddBidder();
  return (
    <div className="new-bidder">
      <h1>Welcome to, NewBidder</h1>
      <button
        onClick={() => {
          const newBidder = {
            name: "byong",
            email: "byong123@gmail.com",
          } as CreateBidderDto;
          addBidder(newBidder);
        }}
      >
        Add Bidder
      </button>
    </div>
  );
}

export default NewBidder;
