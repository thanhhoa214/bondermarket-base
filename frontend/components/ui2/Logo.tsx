import logoIcon from '@/public/logo.svg';
import Image from 'next/image';
import Link from 'next/link';

const Logo = () => {
  return (
    <Link href={'/app'}>
      <Image src={logoIcon} alt="Bondermarket" width={40} height={40} className="cursor-pointer" />
    </Link>
  );
};

export default Logo;
