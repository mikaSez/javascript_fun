/**
 * Created by mis on 04/02/14.
 */

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


    this.paintOnCanvas = function(){
        var localCanvas = canvas.getCanvas();
        var height = localCanvas.height;
        var width = localCanvas.width;
        //distance = height/(this.getMaxDeep()+1);
        var context = localCanvas.getContext('2d');
        paintOnPosition(width/2+10, offset, this, context, "rgba(120,120,120,0.6)" );
    };

    this.getDeep = function(){
        return deep;
    };

    var paintOnPosition = function(x, y, element, context, color){
        context.beginPath();
        context.fillStyle = color;
        context.arc(x, y, 20, 0, Math.PI*2, false);
        context.fill();
        context.closePath();

        context.fillStyle = "white";
        context.fillText(element.getValue(),x,y+5);
        if(element.getLeft() != undefined){
            paintOnPosition(x-(15*(5-element.getDeep()+1)), y+distance, element.getLeft(), context, "red");
        }
        if(element.getRight() != undefined){
            paintOnPosition(x+(15*(5-element.getDeep()+1)), y+distance, element.getRight(), context, "black");
        }
    }
}


var tree = new Tree(4);
tree.addNew(3);
tree.addNew(2);
tree.addNew(1);
tree.addNew(8);
tree.addNew(9);
tree.addNew(5);
tree.addNew(4);

console.log(tree.getMaxDeep());
console.log(tree.getMaxDeep());

tree.setCanvas("canvas");

tree.paintOnCanvas();
