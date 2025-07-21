import Image from 'next/image';
import React from 'react';
import how_to_read_snapshots from './photos/how_to_read_snapshots.png';
import wilensky from './photos/wilensky.png';

function Info() {
  return (
    <div className="flex justify-center">
      <div className="mt-5 p-2.5 w-full max-w-[780px]">
        <div className="text-center  text-2xl mt-2.5">Intro</div>
        <p className=" text-base mb-2.5">
          I made (or rather improved upon) this simlation because understanding
          natural selection is fundamental to our study of life. Everyone can
          and should know it. Plus, it's really cool!
        </p>
        <div className="text-center  text-2xl mt-2.5">TLDR;</div>
        <p className=" text-base mb-2.5">
          This is an evolution simulation. Hover over a bug to eat it. Try to
          eat as many bugs as you can without letting your "hunger timer" run
          down to zero. After a minute or so of eating bugs, you will notice
          that the bugs will be harder to find. That's because the population is
          evolving to be more camouflaged with the environment.
        </p>
        <div className="text-center  text-2xl mt-2.5">
          How Does Natural Selection Work?
        </div>
        <p className=" text-base mb-2.5">
          If evolution is the observed phenomenon of hereditary change over
          time, then natural selection is the mechanism of that change. As for
          how it works, Richard Dawkins puts it most succinctly. Natural
          selection is "the differential survival of replicators."
        </p>

        <p className=" text-base mb-2.5">
          Or, to expand this into a few bullet points:
        </p>

        <ul className="mb-2.5">
          <li>
            Some things in the world make copies of themselves - they replicate.
          </li>
          <li>
            The copying process is really good, but not perfect. There is
            variation among replicators.
          </li>
          <li>
            Because variation exists, some replicators are better at replicating
            than others.
          </li>
          <li>
            In a world of finite resources, replicators replicating means that
            other replicators can't replicate.
          </li>
          <li>
            Successful replicators are thus metaphorically "selected" by nature.
          </li>
        </ul>
        <p className=" text-base mb-2.5">
          Let's pursue these points in further detail.
        </p>

        <p className=" text-base mb-2.5">
          As it turns out, there are things in the world that, because of their
          physical structure, automatically assemble copies of themselves.
          Dawkins points out that while replicators can in principle be made out
          of any material, the one's we are most familiar with are the moleules
          we call our genes. Or more specifically, the strands of DNA contained
          in most of our cells.
        </p>

        <p className=" text-base mb-2.5">
          It's hard to overstate what amazing trick replication is. For
          comparison, if a salt molecule is like putting on flip flops, then DNA
          is like intercepting an cruise missile by shooting a laser out of your
          butt.
        </p>

        <p className=" text-base mb-2.5">
          Paradoxially, any replicator worth it's salt will have in imperfect
        </p>

        <div className="text-center  text-2xl mt-2.5">
          What Does This Simulation Simulate?
        </div>
        <p className=" text-base mb-2.5">In Progress</p>

        <div className="text-center  text-2xl mt-2.5">
          How Does the Simulation Work?
        </div>
        <p className=" text-base mb-2.5">In Progress</p>

        <div className="text-center  text-2xl mt-2.5">
          How To Read Population Snapshots
        </div>
        <Image
          src={how_to_read_snapshots}
          alt="How to read population snapshots"
          width={780}
          height={400}
          style={{
            width: '100%',
            height: 'auto',
          }}
        />

        <div className="text-center  text-2xl mt-2.5">History</div>
        <p className=" text-base mb-2.5">
          This simulation, like its own bugs, has evolved over time. I've
          discerned at least three preceeding generations in the lineage:
        </p>
        <ol className="mb-2.5">
          <li>
            <span className="font-bold">June, 1986: </span> Beth Bishop and
            Charles Anderson describe a "board game" in
            <a href="https://files.eric.ed.gov/fulltext/ED272383.pdf">
              EVOLUTION BY NATURAL SELECTION: A TEACHING MODULE
            </a>
            . Played by hand, their game involved colored beads on a blanket.
          </li>
          <li>
            <span className="font-bold">mid 90's: </span>Steve Brewer of UMass
            made Bishop & Anderson's game into a computer program. The last
            version was released on 6/10/1995. I remember gazing upon the
            Brewer's version while researching this section, but it appears now
            to have been removed by UMass.
          </li>
          <li>
            <span className="font-bold">2005: </span>Uri Wilensky and M. Novak
            <a href="http://modelingcommons.org/browse/one_model/1454#model_tabs_browse_info">
              implemented the game
            </a>{' '}
            (below) in Wilensky's NetLogo platform , a general-purpose
            population simulator.
          </li>
        </ol>
        <Image
          src={wilensky}
          alt="Wilensky NetLogo implementation"
          width={780}
          height={400}
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
        <p className=" text-base mb-2.5">
          The present iteration of this simulation, I'm happy to introduce the
          following new features:
        </p>
        <ol className="mb-2.5">
          <li>
            <span className="font-bold">Population Snapshots:</span> graphical
            representation of bug lineage
          </li>
          <li>
            <span className="font-bold">Hunger Timer:</span>Makes for a more
            realistic simulation by introducing a time constraint
          </li>
          <li>
            <span className="font-bold">Dominant Colors:</span> A quick
            subjective comparision of bug colors vs. environment colors
          </li>
          <li>
            <span className="font-bold">Random Step:</span> Allows users to
            simulate genetic drift
          </li>
          <li>
            <span className="font-bold">Custom Initial Bugs:</span> Allows users
            to choose the intial set of bugs
          </li>
        </ol>
        <div className="text-center  text-2xl mt-2.5">Photo credits</div>
        <ul className="mb-2.5">
          <li>
            <span className="font-bold">sand:</span> "Sand from Gobi Desert" by
            Siim Sepp – Own work. Licensed under CC BY-SA 3.0 via Wikimedia
            Commons.
          </li>
          <li>
            <span className="font-bold">candy:</span> Marco Guidi/EyeEm/Getty
            Images
          </li>
          <li>
            <span className="font-bold">carpet:</span>{' '}
            <a href="https://www.homedepot.com/p/TrafficMASTER-Lake-View-Dovetail-Texture-12-ft-Carpet-HD102-102-1200-AB/308243816">
              Home Depot
            </a>
          </li>
          <li>
            <span className="font-bold">gravel:</span> Pet Solutions
          </li>
          <li>
            <span className="font-bold">leaves:</span> Minerva
            Studio/Shutterstock
          </li>
          <li>
            <span className="font-bold">grass:</span>{' '}
            <a href="https://www.pennington.com/all-products/grass-seed/resources/how-to-bring-your-lawn-back-to-life-in-5-simple-steps">
              Pennington
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Info;
