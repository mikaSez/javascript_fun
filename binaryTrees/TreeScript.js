/**
 * Created by mis on 04/02/14.
 */


function getRandomColor(){
    var red = Math.floor(Math.random()*255);
    var green = Math.floor(Math.random()*255);
    var blue = Math.floor(Math.random()*255);

    return red + ',' +  green + ',' + blue;
}
function Tree(val, deepLevel){
    var left = undefined;
    var right = undefined;

    var deep = deepLevel != undefined?deepLevel: 0;
    var value = val;

    canvas = (function(){
        this.canvas;

        return {
            setCanvas : function(element){
                this.canvas = element;
            },
            getCanvas : function(){
                return this.canvas;
            }

        }
    })();

    var setCanvas = function(canvas){

    }
    this.addNew = function(element){
        var temp = element;
        if(temp == undefined  || value == temp ){
            console.log("element already in the tree or is undefined");
            return;
        }
        if(temp > value){
            if(right != undefined){
                right.addNew(element);
            } else{
                right = new Tree(element, deep+1);
            }
        } else{
            if(left != undefined){
                left.addNew(element);
            } else{
                left = new Tree(element, deep+1);
            }
        }
    };

    this.getValue = function(){
        return value;
    };

    this.getLeft = function(){
        return left;
    };

    this.getRight = function(){
        return right;
    };


    this.getMeLeftToRight = function(){
        if(left != undefined)
            left.getMeLeftToRight();

        console.log(value + " : "  + deep);
        if(right != undefined)
            right.getMeLeftToRight();

    };

    this.getMaxDeep = function(){
        if(left == undefined && right == undefined){
            return deep;
        }
        if(left == undefined || right == undefined){
            var element = left || right;
            return element.getMaxDeep();
        }
        var leftDeep = left.getMaxDeep();
        var rightDeep = right.getMaxDeep();
        return leftDeep>rightDeep?leftDeep:rightDeep;
    };
    this.setCanvas = function(canvasID){
        canvas.setCanvas(document.getElementById(canvasID));
    }

    var offset = 30;
    var distance = 50;

    var radius = 17;
    this.paintOnCanvas = function(){
        var localCanvas = canvas.getCanvas();
        var height = localCanvas.height;
        var width = localCanvas.width;
        var horizontalPosition = width/2+10;
        //distance = height/(this.getMaxDeep()+1);
        var context = localCanvas.getContext('2d');
        context.fillStyle = "white";
        context.fillRect(0,0,width,height);
        context.beginPath();
        context.fillStyle = "rgba(120,120,120,0.6)";
        context.arc(horizontalPosition, offset, radius, 0, Math.PI*2, false);
        context.fill();
        context.closePath();

        context.fillStyle = "white";
        context.fillText(this.getValue(),horizontalPosition-3,offset+2);
       //

        var offsetLeft = left.getMaxDeep() * 40;

        var offsetRight = right.getMaxDeep() * 40;
        if(this.getLeft() != undefined){
            paintLineToPosition(horizontalPosition, offset+radius,horizontalPosition-offsetLeft, offset+distance, context);
            paintOnPosition(horizontalPosition-offsetLeft, offset+distance, this.getLeft(), context, "red");
       }
         if(this.getRight() != undefined){
             paintLineToPosition(horizontalPosition, offset+radius,horizontalPosition+offsetRight, offset+distance, context);
             paintOnPosition(horizontalPosition+offsetRight, offset+distance, this.getRight(), context, "blue");
        }



    };
    var paintLineToPosition = function(x,y,toX,toY, context){

        context.lineWidth = 2;
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(toX, toY);
        context.stroke();
    };
    this.getDeep = function(){
        return deep;
    };

    var paintOnPosition = function(x, y, element, context, color){

        context.beginPath();
        context.fillStyle = color;
        context.arc(x, y, radius, 0, Math.PI*2, false);
        context.fill();
        context.closePath();




        context.fillStyle = "white";
        context.fillText(element.getValue(),x-3,y+2);
        if(element.getLeft() != undefined){
            paintLineToPosition(x, y+radius,x-(10*(element.getLeft().getDeep()+1)), y+distance, context);
            paintOnPosition(x-(10*(element.getLeft().getDeep()+1)), y+distance, element.getLeft(), context, "red");
        }
        if(element.getRight() != undefined){

            paintLineToPosition(x, y+radius,x+(10*(element.getRight().getDeep()+1)), y+distance, context);

            paintOnPosition(x+(10*(element.getRight().getDeep()+1)), y+distance, element.getRight(), context, "blue");
        }
    }
}


var tree = new Tree(75);
var n = 30;
while(n--)
tree.addNew(Math.floor(Math.random()*150));
console.log(tree.getMaxDeep());
console.log(tree.getMaxDeep());

tree.setCanvas("canvas");

tree.paintOnCanvas();
