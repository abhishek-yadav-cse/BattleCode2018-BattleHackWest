var n=[12,13];
function aly(that, botID) {
    if (botID < 1) {
        return false
    }
    var bot = that.getRobot(botID);
    var me = that.me();
    if (bot.signal==n[me.team]) {
        return true
    }
    return false
}
var coords = [
    [bc.NORTHWEST, bc.NORTH, bc.NORTHEAST],
    [bc.WEST, 0, bc.EAST],
    [bc.SOUTHWEST, bc.SOUTH, bc.SOUTHEAST],
];

function Attack(that, FieldOfViz) {
    var me = that.me();
    var close = that.getVisibleRobots();
    for (var i in close) {
        //that.log(aly(that, close[i].id));
          if (close[i].id!=me.id&& !aly(that, close[i].id) && Math.abs(close[i].x - me.x) <= 1 && Math.abs(close[i].y - me.y) <= 1) {
              //that.log(((close[i].y-me.y)+1)+','+((close[i].x-me.x)+1));
              //that.log(JSON.stringify(me));
              //that.log(JSON.stringify(close[i]));
              return that.attack(coords[(close[i].y - me.y)+1][(close[i].x-me.x)+1]);
        //that.log( JSON.stringify(close))
         }
    }
}

function inPos(that, FieldOfViz) {
    if (aly(that, FieldOfViz[3][1]) && FieldOfViz[3][1] != bc.HOLE) {
        return true
    } else if (aly(that, FieldOfViz[3][5]) && FieldOfViz[3][5] != bc.HOLE) {
        return true
    } else if (aly(that, FieldOfViz[4][2]) && FieldOfViz[4][2] != bc.HOLE) {
        return true
    } else if (aly(that, FieldOfViz[4][4]) && FieldOfViz[4][4] != bc.HOLE) {
        return true;
    } else if (aly(that, FieldOfViz[2][4]) && FieldOfViz[2][4] != bc.HOLE) {
        return true;
    } else if (aly(that, FieldOfViz[2][2]) && FieldOfViz[2][2] != bc.HOLE) {
        return true;
    } else {
        return false;
    }
}

function avoidObstacles(that, dir) {
    //Check the location of robot
    var position;
    var directions = new Array();

    for (var i = dir; i < dir + 8; i++) {
        position = that.getInDirection(i % 8); //checks all directions NORTH,SOUTH,ETC
        directions.push(position);
    }

    var nextMoveDirection;

    for (var j = 0; j < 7; j++) {
        if (directions[j] === 0) {
            nextMoveDirection = (j + dir) % 8; //records the direction of next move
            break;
        }

    }
    return that.move(nextMoveDirection);
}

function tenTen(that) {
    //if(Turn>20){return;}
    me = that.me();
    //if(Math.sqrt((10-me.x)*(10-me.x)+(10-me.y)*(10-me.y))<4){
    //    return;
    //}
    seen = {
        x: 10,
        y: 10
    };
    if (seen) {
        var left = 0;
        if (seen.x > me.x) {
            left = -1;
        } else if (seen.x < me.x) {
            left = 1;
        }
        var down = 0;
        if (seen.y > me.y) {
            down = -10;
        } else if (seen.y < me.y) {
            down = 10;
        }
        switch (left + down) {
            case (0):
                return 0;
                break;
            case (1):
                return bc.WEST;
            case (-1):
                return bc.EAST;
            case (10):
                return bc.NORTH;
            case (-10):
                return bc.SOUTH;
            case (11):
                return bc.NORTHWEST;
            case (9):
                return bc.NORTHEAST;
            case (-11):
                return bc.SOUTHEAST;
            case (-9):
                return bc.SOUTHWEST;
        }
    }
}

function GoTo(that, X, Y) {
    //if(Turn>20){return;}
    me = that.me();
    //if(Math.sqrt((10-me.x)*(10-me.x)+(10-me.y)*(10-me.y))<4){
    //    return;
    //}
    seen = {
        x: X,
        y: Y
    };
    if (seen) {
        var left = 0;
        if (seen.x > me.x) {
            left = -1;
        } else if (seen.x < me.x) {
            left = 1;
        }
        var down = 0;
        if (seen.y > me.y) {
            down = -10;
        } else if (seen.y < me.y) {
            down = 10;
        }
        switch (left + down) {
            case (0):
                return 0;
                break;
            case (1):
                return bc.WEST;
            case (-1):
                return bc.EAST;
            case (10):
                return bc.NORTH;
            case (-10):
                return bc.SOUTH;
            case (11):
                return bc.NORTHWEST;
            case (9):
                return bc.NORTHEAST;
            case (-11):
                return bc.SOUTHEAST;
            case (-9):
                return bc.SOUTHWEST;
        }
    }
}

function goTo(that, x, y) {
    //return that.move(GoTo(that, x, y));
    return avoidObstacles(that, GoTo(that, x, y));
}

var Fexcept={
    '3,2':true,
    '2,3':true,
    '3,4':true,
    '4,3':true
};

function Converge(that, FieldOfViz) {
    var ans;
    for (var i = 1; i < 6; i++) {
        for (var j = 1; j < 6; j++) {
            var c = 0;
            var bad=false;
            if (FieldOfViz[i - 1][j] == -1) {
                bad=true;
            }
            if (FieldOfViz[i + 1][j] == -1) {
                bad=true;
            }
            if (FieldOfViz[i][j - 1] == -1) {
                bad=true;
            }
            if (FieldOfViz[i][j + 1] == -1) {
                bad=true;
            }
            if (FieldOfViz[i - 1][j] > 1) {
                c++;
            }
            if (FieldOfViz[i + 1][j] > 1) {
                c++;
            }
            if (FieldOfViz[i][j - 1] > 1) {
                c++;
            }
            if (FieldOfViz[i][j + 1] > 1) {
                c++;
            }
            if(!bad&&c==4){
                if(i==3&&j==3){
                    return avoidObstacles(that,0);
                }
                if(Fexcept.hasOwnProperty(i+','+j)){return -1;}
            }
            if (!bad&&c >= 3&&FieldOfViz[i][j]!=-1) {
                if(Fexcept.hasOwnProperty(i+','+j)){return -1;}
                if (FieldOfViz[i - 1][j] == 0) {
                    ans = goTo(that, i - 1, j);
                }
                if (FieldOfViz[i + 1][j] == 0) {
                    ans = goTo(that, i + 1, j);
                }
                if (FieldOfViz[i][j - 1] == 0) {
                    ans = goTo(that, i, j - 1);
                }
                if (FieldOfViz[i][j + 1] == 0) {
                    ans = goTo(that, i, j + 1);
                }
            }
        }
    }
    return ans;
}

function DiamondFormation(that, FieldOfViz) {
    //if (Turn < 20) {
    //    //return goTo(that, 10, 10);
    //}
    var C = Converge(that, FieldOfViz);
    if(C==-1){return;}
    if (C) {
        return C;
    }
    var xPos = -1000 //
    var yPos = -1000
    var didBreak = false;
    var minDistx = 10
    var minDisty = 10
    for (var i = 0; i < 7; i++) {
        for (var j = 0; j < 7; j++) {
            if (!(i == 3 && j == 3) && FieldOfViz[i][j] != bc.EMPTY && FieldOfViz[i][j] != bc.HOLE && (i != 3 && j != 3)){
                xPos = i;
                yPos = j;
                didBreak = true;
                break;
            }
        }
        if (didBreak) {
            break;
        }
    }
    var me=that.me();
    if (inPos(that, FieldOfViz)) {
        if(Math.sqrt((10-me.x)*(10-me.x)+(10-me.y)*(10-me.y))<3){return;}
        return goTo(that, 10, 10);
    }
    return goTo(that,10,10);
    /*
    if (xPos == -1000) {
        return avoidObstacles(that, tenTen(that));
    }

    if (xPos > 3 && yPos > 3) {
        return avoidObstacles(that, bc.NORTHEAST);
        //return that.move(bc.NORTHEAST);

    } else if (xPos < 3 && yPos < 3) {
        //  move towards lower left
        //return that.move(bc.SOUTHWEST);
        return avoidObstacles(that, bc.SOUTHWEST)
    } else if (xPos < 3 && yPos > 3) {
        // move upper left
        //return that.move(bc.NORTHWEST);
        return avoidObstacles(that, bc.NORTHWEST)
    } else if (xPos > 3 && yPos < 3) {
        //  movel ower right
        //return that.move(bc.SOUTHEAST)
        return avoidObstacles(that, bc.SOUTHEAST)
    } else if (xPos == 3 && yPos > 3) {
        // down
        //return that.move(bc.SOUTH)
        return avoidObstacles(that, bc.SOUTH)

    } else if (xPos == 3 && yPos < 3) {
        //move up
        //return that.move(bc.NORTH)
        return avoidObstacles(that, bc.NORTH)
    } else if (xPos > 3 && yPos == 3) {
        //move left
        //return that.move(bc.EAST)
        return avoidObstacles(that, bc.EAST)
    } else if (xPos < 3 && yPos == 3) {
        //move right;
        //return that.move(bc.WEST)
        return avoidObstacles(that, bc.WEST)
    } else {
        return goTo(10,10);
        //         return avoidObstacles(that,Math.floor(Math.random()*8))
    }*/
}
class MyRobot extends BCAbstractRobot {
    turn() {
        //Turn++;
        var me = this.me();
        var map = this.getVisibleMap();
        //var A = Attack(this, map);
        //if (A !== undefined) {
        //    return A;
        //}
        var temp = DiamondFormation(this, map);


        var seeing = this.getVisibleRobots();
        var seen = false;
        var closest = Infinity;
        var Atk=Attack(this,map);
        //this.signal((me.signal + large) % 15);
        this.signal(n[me.team]);
        if(Atk){return Atk;}
        if(temp){return temp;}
        // DiamondFormation(seeing, this)
        /*
        for (var i in seeing) {
            if (me.id!=seeing[i].id&&(seeing[i].signal == me.signal || seeing[i].signal == (me.signal + large) % 15 )&& Math.sqrt(Math.pow(me.x - seeing[i].x, 2) + Math.pow(me.y - seeing[i].y, 2)) < closest) {
                seen = seeing[i];
                closest = Math.sqrt(Math.pow(me.x - seeing[i].x, 2) + Math.pow(me.y - seeing[i].y, 2));
                //this.log(i);
            }
        }
        this.log(closest);*/
    }
}
/*var OurIDs={};
var start = Math.floor(Math.random() * 16);
var large = Math.floor(Math.random() * 100 + 15);

class MyRobot extends BCAbstractRobot {


    avoidObstacles(dir) {
        //Check the location of robot
        var position;
        var directions = new Array();

        for (var i = dir; i < 7; i++) {
            position = this.getInDirection(i); //checks all directions NORTH,SOUTH,ETC
            directions.push(position);
        }

        var nextMoveDirection;

        for (var j = 0; j < 7; j++) {
            if (directions[j] === 0) {
                nextMoveDirection = j; //records the direction of next move
                break;
            }

        }
        return this.move(nextMoveDirection);
    }

    turn() {

        //      var map = this.getVisibleMap();
        //       this.log(map);
        var me = this.me();
        //for(var i in me){
        //    this.log(i+':'+me[i]);
        //}//log me

        //if(!OurIDs.hasOwnProperty(me.id)){
        //    OurIDs[me.id]=true;
        //}
        //return this.avoidObstacles();
        var seeing = this.getVisibleRobots();
        var seen = false;
        var closest = Infinity;
        for (var i in seeing) {
            if (me.id!=seeing[i].id&&(seeing[i].signal == me.signal || seeing[i].signal == (me.signal + large) % 15 )&& Math.sqrt(Math.pow(me.x - seeing[i].x, 2) + Math.pow(me.y - seeing[i].y, 2)) < closest) {
                seen = seeing[i];
                closest = Math.sqrt(Math.pow(me.x - seeing[i].x, 2) + Math.pow(me.y - seeing[i].y, 2));
                //this.log(i);
            }
        }
        this.log(closest);
        if (closest < 2) {
            return;
        }
        this.signal((me.signal + large) % 15);
        if (seen) {
            var left = 0;
            if (seen.x > me.x) {
                left = -1;
            } else if (seen.x < me.x) {
                left = 1;
            }
            var down = 0;
            if (seen.y > me.y) {
                down = -10;
            } else if (seen.y < me.y) {
                down = 10;
            }
            switch (left + down) {
                case (0):
                    break;
                case (1):
                    return (this.move(bc.WEST));
                case (-1):
                    return (this.move(bc.EAST));
                case (10):
                    return (this.move(bc.NORTH));

                case (-10):
                    return (this.move(bc.SOUTH));
                case (11):
                    return (this.move(bc.NORTHWEST));
                case (9):
                    return (this.move(bc.NORTHEAST));
                case (-11):
                    return (this.move(bc.SOUTHEAST));
                case (-9):
                    return (this.move(bc.SOUTHWEST));
            }
        }
        if (this.x > 0 && this.y > 0) {
            return (this.move(bc.SOUTHWEST));
        } else if (this.x > 0) {
            return (this.move(bc.WEST));
        } else if (this.y > 0) {
            return (this.move(bc.SOUTH));
        }
        return this.move(Math.floor(Math.random() * 8));
        //return this.move(bc.NORTH);
    }
}
/**
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
*/
//abhi
/* finds free cell to move into to avoid collisions
            //Check the location of robot
           // var map = this.getVisibleMap();
           // var nearbyRobots = this.getVisibleRobots();

            var position;
            var directions = new Array();
            ol0p;.
            for(var i =0; i< 7;i++){
                position = this.getInDirection(i); //checks all directions NORTH,SOUTH,ETC
                directions.push(position);
            }

            var nextMoveDirection;

            for(var j=0; j <7;j++){
                if(directions[j] === 0){
                     nextMoveDirection =j; //records the direction of next move
                     break;
                }

            }

           // this.log(directions.toString() + " ::::: " + nextPosition);

            return this.move(nextMoveDirection);

    */
