class returnSky{

    constructor(){
        
    }

    returnValue = (value)=>{
        if(value<5){
            return "맑음";
        }else if(value<8){
            return "구름 많음";
        }else{
            return "흐림"
        }
        

    }


}
export default returnSky;