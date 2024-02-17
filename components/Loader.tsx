import { Puff } from "react-loader-spinner";

interface IProps {
  width: number;
  height: number;
  isLoading: boolean;
}

const Loader = ({ isLoading, width, height }: IProps) => {
  return (
    <Puff
      visible={isLoading}
      height={height}
      width={width}
      color="#7C4DFF"
      ariaLabel="puff-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
};

export default Loader;
