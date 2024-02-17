import { Puff } from "react-loader-spinner";

interface IProps {
  isLoading: boolean;
}

const Loader = ({ isLoading }: IProps) => {
  return (
    <Puff
      visible={isLoading}
      height="24"
      width="24"
      color="#7C4DFF"
      ariaLabel="puff-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
};

export default Loader;
