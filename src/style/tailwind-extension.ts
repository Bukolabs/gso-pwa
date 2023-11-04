import classNames from "classnames";
import { PrimeReactPTOptions } from "primereact/api";
import Tailwind from "primereact/passthrough/tailwind";

export const styleExtension = {
  ...Tailwind,
  tag: {
    root: function root(item: any) {
      var props = item.props;
      return {
        className: classNames(
          "inline-flex items-center justify-center",
          "bg-caribbean-green-500 text-white text-xs font-semibold px-2 py-1 ",
          {
            "bg-gray-500 ": props.severity === "secondary",
            "bg-caribbean-green-500 ": props.severity === "success",
            "bg-blue-500 ": props.severity === "info",
            "bg-orange-500 ": props.severity === "warning",
            "bg-purple-500 ": props.severity === "help",
            "bg-red-500 ": props.severity === "danger",
          },
          {
            "rounded-md": !props.rounded,
            "rounded-full": props.rounded,
          }
        ),
      };
    },
    value: "leading-6",
    icon: "mr-1 text-sm",
  },
} as PrimeReactPTOptions;
