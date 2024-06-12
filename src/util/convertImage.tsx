class ImageUtil {
    convertImageToBase64 = (file: any) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            return reader.result
        };
    }
}

var imageUtil = new ImageUtil()

export default imageUtil