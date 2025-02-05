import Link from 'next/link';
import { Sitter } from '../types/sitter';

export default function SitterCard({ ...sitter }: Sitter) {
  return (
    <div className='sitter-card'>
      <h3>{sitter.firstName}</h3>
      <p>{sitter.bio}</p>
      <Link href={`/sitters/${sitter.sitterId}`}>
        <button>View Profile</button>
      </Link>
    </div>
  );
}
