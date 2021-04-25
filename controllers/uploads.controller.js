const { response, request } = require('express');




const uploadImage = (req = request, res = response) => {


    if(!req.file){
        return res.status(400).json({
            message : 'There are not images attached'
        });
    }

    
    return res.json({
        message : 'Image uploaded successfully'
    });  

}


module.exports = {
    uploadImage
}