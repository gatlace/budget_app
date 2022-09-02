import useDebounce from "hooks/useDebounce";
import { useRouter } from "next/router";
import React from "react";
import { PieChart } from "react-minimal-pie-chart";
import pageStyles from "styles/Page.module.scss";

export interface Props {
  merchants: MerchantData[];
}

export interface MerchantData {
  title: string;
  value: number;
  color: string;
}

const MerchantPie = (props: Props) => {
  const [hovered, setHovered] = React.useState(null as number | null);
  const debouncedHovered = useDebounce(hovered, 100);
  const segmentShift = 5;
  const router = useRouter();

  return (
    <div className={pageStyles.displayContainer}>
      <h1 className={pageStyles.displayHeader}>Merchants</h1>
      <div className="flex flex-col items-center text-sm">
        {props.merchants.map((merchant, index) => {
          return (
            <div
              key={index}
              style={{ backgroundColor: merchant.color }}
              className="w-max text-center"
            >
              {merchant.title} {merchant.color}
            </div>
          );
        })}
      </div>
      {props.merchants.length > 0 ? (
        <PieChart
          data={props.merchants}
          radius={PieChart.defaultProps.radius - segmentShift}
          style={{ height: "300px", zIndex: "1" }}
          segmentsStyle={{
            transition: "all 0.1s ease-in-out",
            cursor: "pointer",
          }}
          animate={true}
          label={({ dataEntry }) => dataEntry.percentage.toFixed(0) + "%"}
          labelPosition={45}
          labelStyle={{
            fontSize: "6px",
            fontFamily: "sans-serif",
            fill: "#fff",
            fontWeight: "bold",
          }}
          segmentsShift={(index: number) =>
            index === debouncedHovered ? segmentShift : 0
          }
          onMouseOver={(_, index) => setHovered(index)}
          onMouseOut={() => setHovered(null)}
          onClick={(_, index) => {
            router.push(`/merchants/${props.merchants[index].title}`);
          }}
        />
      ) : (
        "No transactions found"
      )}
    </div>
  );
};

export default MerchantPie;
