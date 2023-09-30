import spinnerSVG from "./spinner.svg";
import Image from 'next/image';

type Props = {
  size: number;
};

export default function Spinner({ size }: Props) {
  return (
    <Image src={spinnerSVG} alt="Loading..." width={size} height={size} className='max-w-none' />
  );
}
