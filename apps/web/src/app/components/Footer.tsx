import Link from 'next/link';
import React from 'react';

export const citation = `Novak, M. and Wilensky, U. (2005). NetLogo Bug Hunt Camouflage model. http://ccl.northwestern.edu/netlogo/models/BugHuntCamouflage. Center for Connected Learning and Computer-Based Modeling, Northwestern University, Evanston, IL.`;

export const citationDescription = `This simulation has an interesting history. Its most recent ancestor is a NetLogo model of the same name created by U. Wilensky and M. Novak.  `;

function Footer() {
  return (
    <div className="bg-[rgb(188,204,200)] w-full p-2.5">
      <p className=" mt-2.5 break-words">
        {citationDescription}
        <Link href="/info">more info.</Link>
      </p>
    </div>
  );
}

export default Footer;
