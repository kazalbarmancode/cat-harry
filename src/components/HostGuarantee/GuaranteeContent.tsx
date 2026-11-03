import React from 'react';
import HostGuaranteeData from './HostGuaranteeData';
import HostGuaranteeTypes from '@/lib/types/HostGuaranteeTypes';

const GuaranteeContent =async () => {

  const res = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_BACKEND_URL}/host_guarantee`);
  const guarantees:HostGuaranteeTypes= await res.json();

  return <HostGuaranteeData guarantees={guarantees} />;
};

export default GuaranteeContent;