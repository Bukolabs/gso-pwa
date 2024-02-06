import { LabelValue } from "@shared/models/label-value.interface";
import OfficeCircle from "../office-circle/office-circle";
import "./review-section";
import classNames from "classnames";

export interface ReviewSectionProps {
  reviewers: LabelValue[];
  classname?: string;
}

export function ReviewSection({ classname, reviewers }: ReviewSectionProps) {
  return (
    <div className={classNames("review-section", classname)}>
      <section className="bg-secondary py-4 text-white">
        <p className="text-sm text-center mb-2 text-white">Flow of Reviewers</p>
        <section className="flex justify-center gap-2">
          {reviewers.map((item, id) => (
            <OfficeCircle
              key={id}
              label={item.label}
              value={item.value}
              isIcon={true}
              isLightBg={false}
            />
          ))}
        </section>
      </section>
    </div>
  );
}

export default ReviewSection;
