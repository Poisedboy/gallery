import { ThreeCircles } from "react-loader-spinner";

interface IProps {
  width: number;
  height: number;
  isLoading: boolean;
  color?: string;
}

const Loader = ({ isLoading, width, height, color = "#7C4DFF" }: IProps) => {
  return (
    <ThreeCircles
      visible={isLoading}
      height={height}
      width={width}
      color={color}
      ariaLabel="puff-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
};

export default Loader;
