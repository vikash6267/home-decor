const {uploadImageToCloudinary,cloudinaryUploadImg} = require("../utills/imageUploader")

exports.imageUpload = async(req,res)=>{
    try{
    const thumbnail = req.files.file  

    const thumbnailImage = await uploadImageToCloudinary(
        thumbnail,
        process.env.FOLDER_NAME
      )

      res.status(200).json({
        success:true,
        message:"Image upload successfully",
        thumbnailImage
      })


    }catch(error){

    }
}





exports.uploadImages = async (req, res) => {
  try {
    console.log("enter the uplooad")

    const uploader = (path) => cloudinaryUploadImg(path, "images");
    const urls = [];
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ status: 'fail', message: 'No files uploaded' });
    }
    console.log("Images",files)
    for (const file of files) {
      const { path } = file;
      const newpath = await uploader(path);
      console.log(newpath);
      urls.push(newpath);
      fs.unlinkSync(path);
    }
    const images = urls.map((file) => {
      return file;
    });
    res.json(images);
  } catch (error) {
    console.log("image upload error", error)
    throw new Error(error);
  }
};