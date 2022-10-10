class skyStatus {

    constructor() {

    }

    returnValue = (value) => {
        let img = '';
        let text = '';

        let inputValue = Number(value);

        switch (inputValue) {
            case 1:
                img = 'status_1.jpg'
                text = '햇빛이 짱짱해요!'
                break;
            case 2:
                img = 'status_2.jpg'
                text = '이렇게 맑은 날~'
                break;
            case 3:
                img = 'status_3.jpg'
                text = '하늘이 맑아요!'
                break;
            case 4:
                img = 'status_4.jpg'
                text = '이런 날씨 딱 좋아!'
                break;
            case 5:
                img = 'status_5.jpg'
                text = '구름이 조금 낀 날~'
                break;
            case 6:
                img = 'status_6.jpg'
                text = '구름낀 하늘~ 이런 분위기 좋아~'
                break;
            case 7:
                img = 'status_7.jpg'
                text = '우중충한 하늘.. 매력있어'
                break;
            case 8:
                img = 'status_8.jpg'
                text = '비가 왔다가 그쳤다가..'
                break;
            case 9:
                img = 'status_9.jpg'
                text = '비가 오고 그래서 니 생각이 났어'
                break;
            case 10:
                img = 'status_10.jpg'
                text = '비가 많이 오네'
                break;

        }

        const result = [img,text];

        return result;


    }


}
export default skyStatus;