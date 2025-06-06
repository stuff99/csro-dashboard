import React from 'react'
import { Button } from '../ui/button';
import  Link from 'next/link';

interface BackButtonProps {
  label: string;
  href: string;
}

const BackButton = ({label, href}: BackButtonProps) => {
  return (
        <Button variant="link" size="sm" className='font-normal w-full'>
            <Link href={href}>{label}</Link>
        </Button>
  )
}

export default BackButton