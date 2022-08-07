import React from "react";
import {
  StyledContainer,
  StyledSectionHeader,
  StyledP,
  StyledContentColumn,
  Bold,
  Ul,
  Li,
  Ol,
} from "./InfoStyles";
import wilensky from "./photos/wilensky.png";

function Info() {
  return (
    <StyledContainer>
      <StyledContentColumn>
        <StyledSectionHeader>Intro</StyledSectionHeader>
        <StyledP>
          I made (or rather improved upon) this simlation because understanding
          natural selection is fundamental to our study of life. Everyone can
          and should know it. Plus, it's really cool!
        </StyledP>
        <StyledSectionHeader>TLDR;</StyledSectionHeader>
        <StyledP>
          This is an evolution simulation. Hover over a bug to eat it. Try to
          eat as many bugs as you can without letting your "hunger timer" run
          down to zero. After a minute or so of eating bugs, you will notice
          that the bugs will be harder to find. That's because the population is
          evolving to be more camouflaged with the environment.
        </StyledP>

        <StyledSectionHeader>What is Natural Selection?</StyledSectionHeader>
        <StyledP>
          Richard Dawkins puts it most succinctly. Natural selection is "the
          differential survival of replicators." Hold up, what's a replicator? A
          replicator is anything that makes copies of itself. As it turns out,
          there are things in the world that, because of how they are shaped,
          will make copies of themselves. Dawkins points out that replicators
          can be made out of any physical medium, but the one's we are most
          familiar with are our genes. Or more specifically, the strands of DNA
          contained in most of our cells.
        </StyledP>
        <StyledP>
          Some molecules are more interesting than others. For example, if a
          salt molecule is like putting on flip flops, then DNA is like
          intercepting an cruise missile by shooting a laser out of your butt.
          That's because DNA makes copies of itself. It's completely bonkers.
          Why does it do that? There are no reasons execept one: the structure
          of DNA guarantees it. If you happen to be a DNA-shaped molecule, given
          a supply of "building materials" you'll automatically make copies of
          yourself. You're a mindless machine. You're a replicator.
        </StyledP>
        <StyledP>
          Let's return to our definition - natural selection is the differential
          survival of replicators. We've nailed down what a replicator is. What
          does "differential survival" mean? Simply put, it's "different
          survival ability". If you have a group of replicators (some would call
          it a population), and members of the group are slightly different from
          one another, then some members will be better at replicating than
          others. A slight difference in shape could give you a slight advantage
          in your environment. And a slight advantage could be the difference
          between falling apart and successfully replicating. That, in a
          nutshell, is what's meant by "differential survival".
        </StyledP>
        <StyledP>
          With the key parts of our definition established, let me backtrack
          just one step. How do we get a group of replicators that are all
          slightly different from one another? The answer is that the copying
          process is not 100% perfect. Replicators sometimes make mistakes. What
          results are copies (or "offspring") that are basically the same, but
          slightly different from their "parent". Maybe their differences make
          them better at replicating, or maybe they defects that make it harder
          to replicate (And, as Dennett points out, copying fidelity is a
          feauture of replicators that is itself optimized by natural
          selection). Either way, this is how you get variation in a population.
        </StyledP>
        <StyledP>
            At this point we have enough material to 
        </StyledP>

        <StyledSectionHeader>What Does This Simulation Simulate?</StyledSectionHeader>
        <StyledP>
          In Progress
        </StyledP>

        <StyledSectionHeader>How Does the Simulation Work?</StyledSectionHeader>
        <StyledP>
          In Progress
        </StyledP>

        <StyledSectionHeader>History</StyledSectionHeader>
        <StyledP>
          This simulation, like its own bugs, has evolved over time. I've
          discerned at least three preceeding generations in the lineage:
        </StyledP>
        <Ol>
          <Li>
            <Bold>June, 1986: </Bold> Beth Bishop and Charles Anderson describe
            a "board game" in
            <a href="https://files.eric.ed.gov/fulltext/ED272383.pdf">
              EVOLUTION BY NATURAL SELECTION: A TEACHING MODULE
            </a>
            . Played by hand, their game involved colored beads on a blanket.
          </Li>
          <Li>
            <Bold>mid 90’s: </Bold>Steve Brewer of UMass made Bishop &
            Anderson's game into a computer program. The last version was
            released on 6/10/1995. I rememberd gazing upon the Brewer's version
            while researching this section, but it appears now to have been
            removed by UMass.
          </Li>
          <Li>
            <Bold>2005: </Bold>Uri Wilensky and M. Novak
            <a href="http://modelingcommons.org/browse/one_model/1454#model_tabs_browse_info">
              implemented the game
            </a>{" "}
            (below) in Wilensky’s NetLogo platform , a general-purpose
            population simulator.
          </Li>
        </Ol>
        <img
          style={{
            width: "100%",
          }}
          src={wilensky}
        />
        <StyledP>
          The present iteration of this simulation, I'm happy to introduce the
          following new features:
        </StyledP>
        <Ol>
          <Li>
            <Bold>Population Snapshots:</Bold> graphical representation of bug
            lineage
          </Li>
          <Li>
            <Bold>Hunger Timer:</Bold>Makes for a more realistic simulation by
            introducing a time constraint
          </Li>
          <Li>
            <Bold>Dominant Colors:</Bold> A quick subjective comparision of bug
            colors vs. environment colors
          </Li>
          <Li>
            <Bold>Random Step:</Bold> Allows users to simulate genetic drift
          </Li>
          <Li>
            <Bold>Custom Initial Bugs:</Bold> Allows users to choose the intial
            set of bugs
          </Li>
        </Ol>
        <StyledSectionHeader>Photo credits</StyledSectionHeader>
        <Ul>
          <Li>
            <Bold>sand:</Bold> “Sand from Gobi Desert” by Siim Sepp – Own work.
            Licensed under CC BY-SA 3.0 via Wikimedia Commons.
          </Li>
          <Li>
            <Bold>candy:</Bold> Marco Guidi/EyeEm/Getty Images
          </Li>
          <Li>
            <Bold>carpet:</Bold>{" "}
            <a href="https://www.homedepot.com/p/TrafficMASTER-Lake-View-Dovetail-Texture-12-ft-Carpet-HD102-102-1200-AB/308243816">
              Home Depot
            </a>
          </Li>
          <Li>
            <Bold>gravel:</Bold> Pet Solutions
          </Li>
          <Li>
            <Bold>leaves:</Bold> Minerva Studio/Shutterstock
          </Li>
          <Li>
            <Bold>grass:</Bold>{" "}
            <a href="https://www.pennington.com/all-products/grass-seed/resources/how-to-bring-your-lawn-back-to-life-in-5-simple-steps">
              Pennington
            </a>
          </Li>
        </Ul>
      </StyledContentColumn>
    </StyledContainer>
  );
}

export default Info;
