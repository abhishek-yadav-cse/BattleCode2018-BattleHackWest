## BattleHackWest-HackathonByMIT

Battlecode Nexus Game Spec

In the distant future, almost all nature and technology have been wiped out by global
catastrophe. All that remains are two opposing factions of microbots, red and blue, who
live on a wraparound grid randomly scattered with holes and obstacles. Microbots start
with 64HP, and are given a randomly generated integer ID at creation.
In each turn a microbots can either move to or attack a nearby square, and communicate
using up to 4 bits of signalling. Microbots have limited vision; they can only see within a
surrounding 7x7 region, and can only view the ID and signal bits of other microbots.
Microbots can heal and reproduce through the joint formation of nexi. If any 4 microbots
of the same team are in the following formation, with empty corners:
<pre>
                                     X
                                    X X
                                     X
 </pre>
 then a new microbot of that team will be created in the center square with 1HP. If a
microbot already exists in the spot, it’s health will be increased by 1HP.
The game ends when either one team is totally annihilated, or 200 rounds have passed.
After 200 rounds, the team with greater total HP wins. If both teams have equal HP after
200 rounds, the winner is determined by a coin flip.


# Javascript Bot Reference

Javascript is the primary language supported by Battlehack West, and the target all other
languages are compiled to, so it's a great choice to develop a bot in (especially for
beginners). Below is a bare minimum bot example:

`
<pre>
class MyRobot extends BCAbstractRobot {
turn() {
return this.move(bc.NORTH);
}
}
</pre>
`

The main container of your bot code is the MyRobot class, which must be a subclass of
BCAbstractRobot . BCAbstractRobot contains all sorts of useful methods that will
make developing your bot easier.

