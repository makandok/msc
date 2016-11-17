//var canvs = document.getElementById("dsurf");
//var ctx = canvs.getContext("2d");
	
//function drawcell(ctx, xcoord, ycoord, symbolsize){
//    ctx.beginPath();
//    ctx.moveTo(xcoord, ycoord);
//    ctx.lineTo(xcoord+symbolsize, ycoord);
//    ctx.lineTo(xcoord+symbolsize, ycoord+symbolsize);
//    ctx.lineTo(xcoord, ycoord+symbolsize);
//    ctx.lineTo(xcoord, ycoord);
//    //ctx.closePath();
//    ctx.stroke();
//    ctx.fill();
//};
	
//(function drawcells(ctx, legenditems, symbolsize) {
//    ctx.strokeStyle = "black";
//    ctx.lineWidth = 2;
//    //ctx.fillStyle = "rgba(0,0,255,1)";
//    ctx.translate(10, 10);
	
//    var cellgap = 4; //symbolsize/10;
//    var currentrow = 0;	
//    for (var itemindx in legenditems) {
//        //if(itemindx%3!=0)continue;
//        //we create a square for this item
//        console.log(itemindx);
//        var x1=(itemindx*symbolsize) + itemindx*cellgap;
//        var y1=0;
		
//        var y2=(itemindx*symbolsize) + itemindx*cellgap;
//        var x2=0;
	
//        var fract = ((itemindx*1.0)+1)/legenditems.length;
//        ctx.fillStyle = "rgba(0,0,255," + fract + ")";
//        drawcell(ctx, x2, y2 , symbolsize);	
	
//        //we write the symbol label
//        //we determine a font size proportional to the symbol e.g. 80% size
//        var fontsize= symbolsize-(symbolsize*2/10);
//        ctx.font=fontsize+"px Segoe UI";
//        ctx.fillStyle = "black";
//        ctx.fillText(legenditems[itemindx], x2+(symbolsize+cellgap+cellgap), y2+((symbolsize+cellgap+cellgap)/2));	
	
//        console.log("(x,y): ("+x2+", "+ y2+")");
//        currentrow++;
//    }

//})(ctx, ["0 - 10", "11 - 15", "16 - 30", "31 - 80", "81 - 100"],20);