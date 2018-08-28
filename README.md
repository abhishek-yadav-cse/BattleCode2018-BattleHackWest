# BattleHackWest-HackathonByMIT

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


## Javascript Bot Reference

Javascript is the primary language supported by Battlehack West, and the target all other
languages are compiled to, so it's a great choice to develop a bot in (especially for
beginners). Below is a bare minimum bot example:

<pre>
class MyRobot extends BCAbstractRobot {
turn() {
return this.move(bc.NORTH);
}
}
</pre>

The main container of your bot code is the MyRobot class, which must be a subclass of
BCAbstractRobot . BCAbstractRobot contains all sorts of useful methods that will
make developing your bot easier.

![alt text](https://github.com/abhishek-yadav-cse/BattleCode2018-BattleHackWest/blob/master/Rule.png)


## Some default functions and values that can be used

<pre>
this.me(): Returns an object containing details about your bot, including .health and .id.
this.log(message): Print a message to the command line. You cannot use ordinary console.log in Battlehack for security reasons.
this.signal(integer): Set your signal bits to a certain value 0 to 15 inclusive.
this.getRobot(id): Returns a robot object with the given integer ID. Returns null if such a robot is not in your vision.
this.getVisibleRobots(): Returns a list of all robot objects visible to you.
this.getVisibleMap(): Returns a 7x7 2d int array of your robot's current vision, where a value of bc.EMPTY means there's nothing there, bc.HOLE means the square is impassable, and if the value is neither hole or empty, the ID of the robot occupying that space.
this.getRelativePos(dX,dY): A shortcut to get what's in the square (dX,dY) away. Returns a robot object if one is there, otherwise bc.EMPTY or bc.HOLE.
this.getInDirection(direction): Returns the output of this.getRelativePos in the specified direction.
this.move(direction): Returns an action to move in a given direction.
this.attack(direction): Returns an action to attack in a given direction.
bc.NORTH:2
bc.NORTHEAST:1
bc.EAST:0
bc.SOUTHEAST:7
bc.SOUTH:6
bc.SOUTHWEST:5
bc.WEST:4
bc.NORTHWEST:3
bc.EMPTY:0
bc.HOLE:-1
</pre>


