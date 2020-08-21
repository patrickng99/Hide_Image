var imgInput1 = document.getElementById("fInput1");
var imgInput2 = document.getElementById("fInput2");
var image1 = null;
var image2 = null;
var final = null;
function upload1() {
  var canv1 = document.getElementById("canv1");
  image1 = new SimpleImage(imgInput1);
  image1.drawTo(canv1);
}
function upload2() {
  var canv2 = document.getElementById("canv2");
  image2 = new SimpleImage(imgInput2);
  image2.drawTo(canv2);
}
function crop(image, width, height) {
  var copy = new SimpleImage(width, height);
  for (var pix of image.values()) {
    var x = pix.getX();
    var y = pix.getY();
    if (x < copy.getWidth() && y < copy.getHeight()) {
      copy.setPixel(x, y, pix);
    }
  }
  return copy;
}
function chop(image) {
  //Initializing the final image
  var width = image.getWidth();
  var height = image.getHeight();
  //chop images
  for (var pixel of image.values()) {
    var red = pixel.getRed();
    var green = pixel.getGreen();
    var blue = pixel.getBlue();
    //Setting the new rgb values
    red = red / 16;
    green = green / 16;
    blue = blue / 16;
    //Setting the pixel values
    pixel.setRed(red);
    pixel.setGreen(green);
    pixel.setBlue(blue);
  }
  return image;
}
function combineImages(image2Hide, frontImage) {
  var height = image2Hide.getHeight();
  var width = frontImage.getWidth();
  var combined = new SimpleImage(width, height);
  var pixel1, pixel2;
  for (var pixel of combined.values()) {
    var x = pixel.getX();
    var y = pixel.getY();
    pixel1 = image2Hide.getPixel(x, y);
    pixel2 = frontImage.getPixel(x, y);
    pixel.setRed(pixChange(pixel1.getRed(), pixel2.getRed()));
    pixel.setGreen(pixChange(pixel1.getGreen(), pixel2.getGreen()));
    pixel.setBlue(pixChange(pixel1.getBlue(), pixel2.getBlue()));
  }
  return combined;
}
function pixChange(value1, value2) {
  return value2 * 16 + value1;
}
function hide() {
  image1 = crop(image1, image2.width, image2.height);
  image2 = crop(image2, image2.width, image2.height);
  image1 = chop(image1);
  image2 = chop(image2);
  final = combineImages(image1, image2);
  var canv3 = document.getElementById("canv3");
  final.drawTo(canv3);
}
function reset() {
  var canvas1 = document.getElementById("canv1");
  var canvas2 = document.getElementById("canv2");
  var canvas3 = document.getElementById("canv3");
  var ctx1 = canvas1.getContext("2d");
  var ctx2 = canvas2.getContext("2d");
  var ctx3 = canvas3.getContext("2d");
  ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
  ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
  ctx3.clearRect(0, 0, canvas3.width, canvas3.height);
  image1 = null;
  image2 = null;
}
function download() {
  var canvas3 = document.getElementById("canv3");
  var link = document.getElementById("link");
  link.setAttribute("download", "myDownload.png");
  link.setAttribute(
    "href",
    canvas3.toDataURL("image/png").replace("image/png", "image/octet-stream")
  );
  link.click();
}