const bcrypt = require("bcryptjs");
const helpers ={}

//encripta la contraseña de manera hasheada
helpers.encryptPassword = async (password)=>{
    const salt= await bcrypt.genSalt(10);//crea un hash de 10 vueltas 
    const hash =await bcrypt.hash(password,salt);//con esto cifra la contraseña
    return hash;
};
//para el logueo
helpers.matchPassword = async(password, savedPassword)=>{
    try {
        return await bcrypt.compare(password, savedPassword);//compara con lo que ya tengo 

    } catch (error) {
        console.log(error);
    }
};

module.exports = helpers;