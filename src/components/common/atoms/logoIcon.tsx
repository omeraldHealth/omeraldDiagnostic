import { logoIcon } from '@/utils/constants/cloudinary';
import Image from 'next/image';
import Link from 'next/link';

export default function LogoIconComponent() {
  return (
    <div className="flex items-center space-x-2">
      <Link href="/" className="flex items-center">
        <Image
          src={logoIcon}
          alt="Logo"
          width={50}  // Adjusted width for better alignment
          height={50} // Adjusted height for better alignment
          quality={100}
          priority={true}
        />
      </Link>
    </div>
  );
}
