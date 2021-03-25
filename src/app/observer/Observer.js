import Bilhete from "../models/Bilhete";

class Observer{
    static async updateObserver(observer,type){
        switch (type) {
            case "bilheteRemocao":
                await Bilhete.destroy({ where: { id: observer.dataValues.id }})
                break;
            //caso queria adicionar mais algum caso de update ao observer seguir a estrutura acima
            default:
                break;
        }
    }
}
export default Observer;