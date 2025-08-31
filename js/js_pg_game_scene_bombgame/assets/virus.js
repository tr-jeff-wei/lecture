class Virus{
    static DIR_X=[1,-1,0,0] ;
    static DIR_Y=[0,0,1,-1] ;
    static CDIR_X=[16,-16,0,0] ;
    static CDIR_Y=[0,0,16,-16] ;
    static STEP=100 ;

    constructor( sx,sy,img , my_map){
               
        this.sx = sx ;
        this.sy = sy ;
        this.img = img ;
        this.my_map = my_map ;
        this.direction=floor(random(4));        
        this.step_counter=Virus.STEP;

    }

    move_show(){
        // move next
        let check_status = this.check_forward_available() ;
        if( check_status=='hit'){
            // hit target
            this.sx+=Virus.DIR_X[ this.direction] ;
            this.sy+=Virus.DIR_Y[ this.direction] ;
            return 'hit' ;
        }

        if( check_status==false  || (this.step_counter<0 && this.sx%32==16 && this.sy%32==16)   ){
            this.direction = floor(random(4));
            this.step_counter=Virus.STEP ;          
        }else{
            this.sx+=Virus.DIR_X[ this.direction] ;
            this.sy+=Virus.DIR_Y[ this.direction] ;
        }

        this.step_counter-- ;

        imageMode(CENTER) ;
        image( this.img , this.sx , this.sy , 32 , 32 ) ;
        imageMode(CORNER) ;
        // noFill();
        // circle(this.sx,this.sy,3);
        // circle(this.sx,this.sy,32);

    }

    check_forward_available(){
        let tx = this.sx+Virus.CDIR_X[ this.direction] ;
        let ty = this.sy+Virus.CDIR_Y[ this.direction] ;
        // noFill();
        // circle(tx,ty,3);

        if( tx<0 || ty<0 || tx>=this.my_map.length || ty>=this.my_map[0].length ){
            return false ;
        }

        if(this.my_map[tx][ty]=='d'){
            return 'hit' ;
        }else if( this.my_map[tx][ty]=='x' || this.my_map[tx][ty]=='s'){            
            return true ;
        }else{
            return false ;
        }
    }


}