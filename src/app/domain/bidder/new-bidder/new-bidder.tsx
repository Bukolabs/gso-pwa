import { useAddBidder } from "@core/query/bidder.query";
import "./new-bidder";
import { CreateBidderDto } from "@api/api";
import { FormProvider, useForm } from "react-hook-form";
import { BidderFormRule, BidderFormSchema } from "@core/model/form.rule";
import { bidderFormDefault } from "@core/model/form.default";
import { zodResolver } from "@hookform/resolvers/zod";
import BidderForm from "./bidder-form/bidder-form";

/* eslint-disable-next-line */
export interface NewBidderProps {}

export function NewBidder() {
  const { mutate: addBidder } = useAddBidder();

  const formMethod = useForm<BidderFormSchema>({
    defaultValues: bidderFormDefault,
    resolver: zodResolver(BidderFormRule),
  });

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

      <FormProvider {...formMethod}>
        <BidderForm />
      </FormProvider>
    </div>
  );
}

export default NewBidder;
