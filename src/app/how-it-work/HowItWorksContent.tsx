import { HowItTypes } from '@/lib/types/HowItTypes';
import HowItWorksData from '@/components/howItWork/HowItWorksData';

export default async function HowItWorksContent() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_BACKEND_URL}/how_it_works`, {
    cache: 'no-store',
  });
  const howItWork: HowItTypes[] = await res.json();

  return <HowItWorksData howItWork={howItWork} />;
}