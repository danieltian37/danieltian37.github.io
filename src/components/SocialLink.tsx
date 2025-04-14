import Image from 'next/image';
import Link from 'next/link';

interface SocialLinkProps {
  href: string;
  icon: string;
  label: string;
}

const SocialLink = ({ href, icon, label }: SocialLinkProps) => {
  return (
    <Link 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="p-2 rounded-full bg-background/80 backdrop-blur-sm border border-secondary/20 hover:border-primary/50 transition-colors"
      aria-label={label}
    >
      <Image 
        src={icon} 
        alt={label}
        width={24}
        height={24}
        className="w-6 h-6"
        style={{ width: 'auto', height: 'auto' }}
      />
    </Link>
  );
};

export default SocialLink; 