import { createCanvas, createImageData, loadImage } from 'canvas';
import pkg2 from 'minecraft-player';
const { minecraftPlayer } = pkg2;

import pkg from 'node-mc-api';
const { getProfile, getSkins } = pkg;

//
// const makeMeme = async ({
//   input,
// }) => {

//   if (!input) return undefined;

//   const canvas = createCanvas(200, 200);
//   const context = canvas.getContext("2d");

//   const fontSetting = "bold 50px Impact";
//   context.font = fontSetting;

//   const text = context.measureText(input);
//   const textWidth = text.width;

//   const image = await loadImage(url);

//   canvas.width = image.width;
//   canvas.height = image.height;


//   context.font = fontSetting;


//   const center = Math.floor((canvas.width - textWidth) / 2) | 5;
//   const bottom = canvas.height - 30;


//   context.drawImage(image, 0, 0);

//   context.fillStyle = "white";
//   context.fillText(input, center, bottom);

//   context.fillStyle = "black";
//   context.strokeText(input, center, bottom);

//   return canvas.toBuffer();
// };



const generatePfp = async (username) => {



  



  const canvas = createCanvas(300, 300);
  const context = canvas.getContext('2d')



  try {



    if (!username) {
      drawFailed(context);
      return canvas.toBuffer();
    }

    const newUsername = username;

    const { textures } = await pkg2(newUsername);



    const image = await loadImage(`https://crafatar.com/skins/${newUsername}.png`);
    const shading = await loadImage("static/20x20pshading.png");
    const shadingslim = await loadImage("static/20x20pshadingslim.png");

    if (!textures.slim) {
      if (image.height === 32) {

        context.drawImage(image, 8, 8, 8, 8, 8, 3, 8, 8); // Head (bottom layer)
        context.drawImage(image, 4, 8, 4, 8, 4, 3, 4, 8); // Head Side (bottom layer)
        context.drawImage(image, 44, 20, 3, 9, 15, 11, 3, 9); // Arm Right (bottom layer)
        context.drawImage(image, 20, 20, 7, 9, 8, 11, 7, 9); // Chest (Bottom layer)
        context.drawImage(image, 44, 20, 4, 9, 4, 11, 4, 9); // Arm Left (bottom layer)
        context.drawImage(image, 41, 20, 3, 9, 1, 11, 3, 9); // Arm Left Side (bottom layer)
        context.drawImage(image, 40, 8, 8, 8, 8, 3, 8, 8); // Head (top layer)
        context.drawImage(image, 32, 8, 3, 8, 3, 3, 3, 8); // Head Side (top layer)
        context.drawImage(image, 37, 8, 3, 8, 6, 3, 3, 8); // Head Side 2 (top layer)
        context.drawImage(shading, 0, 0, 20, 20)


      } else {
        // * BOTTOM LAYER
        context.drawImage(image, 8, 8, 8, 8, 8, 3, 8, 8); // Head (bottom layer)
        context.drawImage(image, 4, 8, 4, 8, 4, 3, 4, 8); // Head Side (bottom layer)
        context.drawImage(image, 36, 52, 3, 9, 15, 11, 3, 9); // Arm Right (bottom layer)
        context.drawImage(image, 20, 20, 7, 9, 8, 11, 7, 9); // Chest (Bottom layer)
        context.drawImage(image, 44, 20, 4, 9, 4, 11, 4, 9); // Arm Left (bottom layer)
        context.drawImage(image, 41, 52, 3, 9, 1, 11, 3, 9); // Arm Left Side (bottom layer)

        // * TOP LAYER 
        context.drawImage(image, 40, 8, 8, 8, 8, 3, 8, 8); // Head (top layer)
        context.drawImage(image, 32, 8, 3, 8, 3, 3, 3, 8); // Head Side (top layer)
        context.drawImage(image, 37, 8, 3, 8, 6, 3, 3, 8); // Head Side 2 (top layer)
        context.drawImage(image, 44, 36, 3, 9, 15, 11, 3, 9); // Arm Right (top layer)
        context.drawImage(image, 20, 36, 7, 9, 8, 11, 7, 9); // Chest (top layer)
        context.drawImage(image, 52, 52, 4, 9, 4, 11, 4, 9); // Arm Left (top layer)
        context.drawImage(image, 49, 52, 3, 9, 1, 11, 3, 9); // Arm Left Side (top layer)
        context.drawImage(shading, 0, 0, 20, 20)


      }

    } else {
      if (image.height === 32) {

        context.drawImage(image, 8, 8, 8, 8, 8, 3, 8, 8); // Head (bottom layer)
        context.drawImage(image, 4, 8, 4, 8, 4, 3, 4, 8); // Head Side (bottom layer)
        context.drawImage(image, 44, 20, 2, 9, 15, 11, 2, 9); // Arm Right (bottom layer)
        context.drawImage(image, 20, 20, 7, 9, 8, 13, 7, 9); // Chest (Bottom layer)
        context.drawImage(image, 44, 20, 3, 9, 4, 11, 3, 9); // Arm Left (bottom layer)
        context.drawImage(image, 41, 20, 3, 9, 1, 11, 3, 9); // Arm Left Side (bottom layer)
        context.drawImage(image, 40, 8, 8, 8, 8, 3, 8, 8); // Head (top layer)
        context.drawImage(image, 32, 8, 3, 8, 3, 3, 3, 8); // Head Side (top layer)
        context.drawImage(image, 37, 8, 3, 8, 6, 3, 3, 8); // Head Side 2 (top layer)
        context.drawImage(shadingslim, 0, 0, 20, 20)

      } else {
        // * BOTTOM LAYER
        context .drawImage(image, 8, 8, 8, 8, 8, 3, 8, 8); // Head (bottom layer)
        context .drawImage(image, 4, 8, 4, 8, 4, 3, 4, 8); // Head Side (bottom layer)
        context .drawImage(image, 36, 52, 2, 9, 15, 11, 2, 9); // Arm Right (bottom layer)
        context .drawImage(image, 20, 20, 7, 9, 8, 11, 7, 9); // Chest (Bottom layer)
        context .drawImage(image, 44, 20, 3, 9, 5, 11, 3, 9); // Arm Left (bottom layer)
        context .drawImage(image, 40, 20, 3, 9, 2, 11, 3, 9); // Arm Left Side (bottom layer)
        // * TOP LAYER
        context.drawImage(image, 40, 8, 8, 8, 8, 3, 8, 8); // Head (top layer)
        context.drawImage(image, 32, 8, 3, 8, 3, 3, 3, 8); // Head Side (top layer)
        context.drawImage(image, 37, 8, 3, 8, 6, 3, 3, 8); // Head Side 2 (top layer)
        context.drawImage(image, 44, 36, 2, 9, 15, 11, 2, 9); // Arm Right (top layer)
        context.drawImage(image, 20, 36, 7, 9, 8, 11, 7, 9); // Chest (top layer)
        context.drawImage(image, 52, 52, 3, 9, 5, 11, 3, 9); // Arm Left (top layer)
        context.drawImage(image, 49, 52, 3, 9, 2, 11, 3, 9); // Arm Left Side (top layer)
        context.drawImage(shadingslim, 0, 0, 20, 20)
        
      }
    }

    drawPixelated(canvas, context, 15, 0, 0)
    return canvas.toBuffer();
  
  }catch (e){}

}

function drawPixelated(img, context, zoom, x, y) {
  if (!zoom) zoom = 4; if (!x) x = 0; if (!y) y = 0;
  if (!img.id) img.id = "__img" + (drawPixelated.lastImageId++);
  var idata = drawPixelated.idataById[img.id];
  if (!idata) {
    const canvas = createCanvas(img.width, img.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    context.clearRect(0, 0, img.width, img.height);
    idata = drawPixelated.idataById[img.id] = ctx.getImageData(0, 0, img.width, img.height).data;
  }
  for (var x2 = 0; x2 < img.width; ++x2) {
    for (var y2 = 0; y2 < img.height; ++y2) {
      var i = (y2 * img.width + x2) * 4;
      var r = idata[i];
      var g = idata[i + 1];
      var b = idata[i + 2];
      var a = idata[i + 3];
      context.fillStyle = "rgba(" + r + "," + g + "," + b + "," + (a / 255) + ")";
      context.fillRect(x + x2 * zoom, y + y2 * zoom, zoom, zoom);
    }
  }
};
drawPixelated.idataById = {};
drawPixelated.lastImageId = 0;


import { createServer } from 'cors-anywhere'

// Listen on a specific port via the PORT environment variable
var port = process.env.PORT || 3000;




import express from 'express';
import 'fs';

const app = express();



async function drawFailed(ctx) {
  const failed = await loadImage("static/PFP/notFound.png");
  const shading = await loadImage("static/20x20pshading.png");

  ctx.clearRect(0, 0, 300, 300);
  ctx.resetTransform();
  ctx.drawImage(failed, 0, 0, 300, 300);
  ctx.scale(16, 16);
  ctx.drawImage(shading, 0, 0, 20, 20);
}

// Demo route
app.get("/generate", async (req, res) => {
  const query = req.query;

  const username = query.ign;

  const image = await generatePfp(req.query.ign);

  console.log(username);

  const headers = { "Content-Type": "image/png" };

  res.writeHead(200, headers);

  res.end(image);
});


app.listen(port, () => {
  console.log(`Server starting on port ${port}`)
})
