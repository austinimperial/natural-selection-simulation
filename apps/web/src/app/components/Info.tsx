import Image from 'next/image';
import how_to_read_snapshots from './photos/how_to_read_snapshots.png';
import wilensky from './photos/wilensky.png';

function Info() {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col mt-5 p-2.5 w-full max-w-[780px] h2:mb-3">
        <h2 className="text-center text-2xl mt-2.5">What is this game?</h2>
        <p className="text-base mb-2.5">
          This interactive simulation lets you experience evolution of
          camouflage in real time. Acting as a bug-eating predator, your actions
          become the selection pressure that drives the evolution of the bug
          population.
        </p>

        <h2 className="text-center text-2xl mt-2.5">How to play</h2>
        <p className="text-base mb-2.5">
          You are a predator hunting bugs. Eat them by hovering your mouse over
          them (or tapping if on mobile). Your hunger timer counts down
          constantly, and you’ll need to keep eating to survive. If you do die,
          you can keep playing, but the objective should be to go as long as you
          can without dying. In just a few minutes of playing, you'll see the
          bug population evolve a camouflage strategy. It's a classic survival
          of the fittest situation - the bugs that are harder to see against the
          background image will tend to survive and procreate.
        </p>

        <h2 className="text-center text-2xl mt-2.5">This is too easy!</h2>
        <p className="text-base mb-2.5">
          If the default settings are too easy, it can feel like you're
          pretending to go after the easiest-to-see bugs just to 'make the
          simulation work'. Doing so is a good demonstration of artificial
          selection, like what we do with our staple crops. But luckily, there's
          a way to get good old fashioned natural selection. If the default
          settings feel too easy, just alter the settings! Make the game harder
          by decreasing the hunger timer or making the bugs smaller.{' '}
          <b>
            You should be able to adjust the settings so that the optimal
            hunting strategy to go after the most conspicuous bugs
          </b>
          . Similarly, if you're living a care free life pursuing a 'combing'
          strategy (i.e. just dragging the cursor around until you get a bug)
          you should be able to alter the settings so that this is not the most
          effective strategy. As long as it feels like the genuinely best
          strategy is to hunt for the most conspicuous bugs, you'll see the bug
          population evolve to be more camouflaged with its environment.
        </p>

        <h2 className="text-center text-2xl mt-2.5">
          How does the simulation work?
        </h2>
        <ul className="mb-2.5 list-disc pl-5">
          <li>
            This species of bug, let's call it <em>scarabidus chromatis</em> has
            a single gene that controls its color.
          </li>
          <li>
            The bug population begins with each bug having a randomly chosen
            color. That is to say, each bug has a different allele of the color
            gene.
          </li>
          <li>
            The population stays constant—when you eat a bug, it’s immediately
            replaced.
          </li>
          <li>
            The replacement is a child of a randomly selected surviving bug.
          </li>
          <li>
            The child inherits the parent’s color gene, but with a small
            mutation in its red, green, and blue (RGB) values.
          </li>
          <li>
            The only trait that evolves is color, which affects how visible bugs
            are against the background.
          </li>
          <li>
            Bugs that blend in are less likely to be eaten, so their genes
            (colors) are more likely to persist.
          </li>
          <li>
            Over time, the population evolves to match the background—an
            adaptive response to selection pressure.
          </li>
        </ul>

        <h2 className="text-center text-2xl mt-2.5">Simulation controls</h2>
        <ul className="mb-2.5 list-disc pl-5">
          <li>
            <span className="font-bold">Population Size:</span> Total number of
            bugs present at any time.
          </li>
          <li>
            <span className="font-bold">Phenotypic Distance:</span> Controls how
            much the color gene can change with each reproduction. For example,
            if the parent bug's color gene is RGB(50,50,50) and the phenotypic
            distance is set to 7, the offspring bug will be either RGB(59,59,59)
            or RGB(43,43,43)
          </li>
          <li>
            <span className="font-bold">Custom Initial Bugs:</span> Instead of
            randomly chosen colors, you can set whatever colors you want in the
            initial population
          </li>
          <li>
            <span className="font-bold">Background:</span> Changes the
            environment to test camouflage under different conditions.
          </li>
          <li>
            <span className="font-bold">Grow Speed:</span> If the bugs just pop
            into existence fully formed it tends to catch the eye, making them
            easier to spot. This could potentially skew the simulation by giving
            you, the predator, a hunting strategy that does not depend on color.
            Having the bugs grow slowly diminishes this effect.
          </li>
          <li>
            <span className="font-bold">Max Offspring Radius:</span>This is the
            maximum distance that an offspring bug will spawn from its parent.
          </li>
          <li>
            <span className="font-bold">World Wrap:</span>If the offspring
            distance is out of bounds, it will wrap around, like in Pac Man. If
            world wrap is off, bugs will tend to cluster around the edges.{' '}
          </li>
          <li>
            <span className="font-bold">Flash on Death:</span> When you die of
            starvation the screen flashes red. Turn it off if this is annoying
            to you.
          </li>
          <li>
            <span className="font-bold">Random Step:</span> You can let the
            simulation run for a given number of steps. Instead of you choosing
            which bugs are eaten, a random bug is chosen each step. See the
            section below about genetic drift
          </li>
        </ul>

        <h2 className="text-center text-2xl mt-2.5">A note on genetic drift</h2>
        <p className="text-base mb-2.5"></p>
        <p className="text-base mb-2.5">
          Genetic drift is the random fluctuation of allele frequencies in a
          population. In other words, it is evolution in the <em>absence</em> of
          selection pressures. It's somewhat counterintuitive. For example, if
          you start out with, say, 50 different alleles in a population, and
          leave it to a random process to choose which ones get to replicate,
          you end up with a severe reduction in the overall number of alleles in
          the population. Those alleles 'drifted' to a higher frequency purely
          by chance. This games's 'random step' feature lets you simulate
          genetic drift. Reset the game and select a random step of 500. You
          will see that the diversity of the initial population is not
          sustained. A few lucky alleles will have drifted to higher
          frequencies.
        </p>

        <h2 className="text-center text-2xl mt-2.5">
          How To Read Population Snapshots
        </h2>
        <Image
          src={how_to_read_snapshots}
          alt="How to read population snapshots"
          width={780}
          height={400}
          style={{ width: '100%', height: 'auto' }}
        />
        <p className="text-base mb-2.5">
          Population snapshots tell the story of the evolving bug population.
          Switch from 'grid' view to 'line' view to trace the survival of
          individual bugs throughout the simulation.
        </p>

        <h2 className="text-center text-2xl mt-2.5">
          A Brief History of the Simulation
        </h2>
        <p className="text-base mb-2.5">
          This simulation is part of a long tradition of teaching evolution
          through interactive models:
        </p>
        <ol className="mb-2.5 list-decimal pl-5">
          <li>
            <span className="font-bold">1986:</span> Bishop & Anderson create{' '}
            <a
              className="underline"
              href="https://files.eric.ed.gov/fulltext/ED272383.pdf"
            >
              a classroom activity using colored beads.
            </a>
          </li>
          <li>
            <span className="font-bold">1990s:</span> Steve Brewer develops a
            computer version at UMass. I once saw this webpage years ago, but
            it's since been taken down.
          </li>
          <li>
            <span className="font-bold">2005:</span> Wilensky and Novak
            implement a NetLogo version (
            <a
              className="underline"
              href="http://modelingcommons.org/browse/one_model/1454#model_tabs_browse_info"
            >
              view here
            </a>
            ).
          </li>
        </ol>
        <Image
          src={wilensky}
          alt="Wilensky NetLogo implementation"
          width={780}
          height={400}
          style={{ width: '100%', height: 'auto' }}
        />

        <p className="text-base mb-2.5">
          This is Wilensky and Novaks' version. My version introduces several
          new features:
        </p>
        <ol className="mb-2.5 list-decimal pl-5">
          <li>
            <span className="font-bold">Population Snapshots:</span> Visualize
            allele frequencies changing over time.
          </li>
          <li>
            <span className="font-bold">Hunger Timer:</span> Makes contrast
            hunting the optimal strategy
          </li>
          <li>
            <span className="font-bold">Dominant Colors:</span> Compare bug
            colors with the background in real time.
          </li>
          <li>
            <span className="font-bold">Random Step:</span> Simulate genetic
            drift.
          </li>
          <li>
            <span className="font-bold">Custom Initial Bugs:</span> Set the
            starting alleles manually.
          </li>
        </ol>

        <h2 className="text-center text-2xl mt-2.5">Photo Credits</h2>
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
            <span className="font-bold">everything else:</span> generated with
            chatGPT
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Info;
