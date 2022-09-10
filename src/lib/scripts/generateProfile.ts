import { expect } from "chai";


export type ModelType = "default" | "slim";


import { inferModelType, loadSkinToCanvas, loadImage, isTextureSource } from "skinview-utils";
import { createCanvas, createImageData } from 'canvas'


import { getSkin } from "$lib/rendering/mojang";
import { getUUID } from "$lib/rendering/mojang";
import { defaultSkin } from "$lib/rendering/mojang";





async function generatePfp(username: string, ctx: any) {
	try {
		if (!username) {
			drawFailed(ctx);
			return;
		}

		async function loadSkin(src: string | Buffer) {
			const texture = await loadImage(src);
			const canvas = document.createElement("canvas");
			const ctx = canvas.getContext('2d');
			loadSkinToCanvas(canvas, texture);
			return canvas;
		}
		const canvas = createCanvas(256, 256, "svg");
		const ctx = canvas.getContext('2d');
		const skinImage = await loadImage(`https://frozen-tundra-55986.herokuapp.com/https://minotar.net/skin/${username}.png`);

		loadImage(`https://frozen-tundra-55986.herokuapp.com/https://minotar.net/skin/${username}.png`).then(async (image) => {
			const UUID = await getUUID(username);
			const skinModel = inferModelType(await loadSkin(`https://frozen-tundra-55986.herokuapp.com/https://minotar.net/skin/${username}.png`))
			const shading = await loadImage("/20x20pshading.png");
			const shadingslim = await loadImage("/20x20pshadingslim.png");




			if (skinModel == "default") {

				if (image.height === 32) {

					ctx.drawImage(image, 8, 8, 8, 8, 8, 3, 8, 8); // Head (bottom layer)
					ctx.drawImage(image, 4, 8, 4, 8, 4, 3, 4, 8); // Head Side (bottom layer)
					ctx.drawImage(image, 44, 20, 3, 9, 15, 11, 3, 9); // Arm Right (bottom layer)
					ctx.drawImage(image, 20, 20, 7, 9, 8, 11, 7, 9); // Chest (Bottom layer)
					ctx.drawImage(image, 44, 20, 4, 9, 4, 11, 4, 9); // Arm Left (bottom layer)
					ctx.drawImage(image, 41, 20, 3, 9, 1, 11, 3, 9); // Arm Left Side (bottom layer)
					ctx.drawImage(image, 40, 8, 8, 8, 8, 3, 8, 8); // Head (top layer)
					ctx.drawImage(image, 32, 8, 3, 8, 3, 3, 3, 8); // Head Side (top layer)
					ctx.drawImage(image, 37, 8, 3, 8, 6, 3, 3, 8); // Head Side 2 (top layer)

				} else {
					// * BOTTOM LAYER
					ctx.drawImage(image, 8, 8, 8, 8, 8, 3, 8, 8); // Head (bottom layer)
					ctx.drawImage(image, 4, 8, 4, 8, 4, 3, 4, 8); // Head Side (bottom layer)
					ctx.drawImage(image, 36, 52, 3, 9, 15, 11, 3, 9); // Arm Right (bottom layer)
					ctx.drawImage(image, 20, 20, 7, 9, 8, 11, 7, 9); // Chest (Bottom layer)
					ctx.drawImage(image, 44, 20, 4, 9, 4, 11, 4, 9); // Arm Left (bottom layer)
					ctx.drawImage(image, 41, 52, 3, 9, 1, 11, 3, 9); // Arm Left Side (bottom layer)

					// * TOP LAYER
					ctx.drawImage(image, 40, 8, 8, 8, 8, 3, 8, 8); // Head (top layer)
					ctx.drawImage(image, 32, 8, 3, 8, 3, 3, 3, 8); // Head Side (top layer)
					ctx.drawImage(image, 37, 8, 3, 8, 6, 3, 3, 8); // Head Side 2 (top layer)
					ctx.drawImage(image, 44, 36, 3, 9, 15, 11, 3, 9); // Arm Right (top layer)
					ctx.drawImage(image, 20, 36, 7, 9, 8, 11, 7, 9); // Chest (top layer)
					ctx.drawImage(image, 52, 52, 4, 9, 4, 11, 4, 9); // Arm Left (top layer)
					ctx.drawImage(image, 49, 52, 3, 9, 1, 11, 3, 9); // Arm Left Side (top layer)
					ctx.drawImage(shading, 0, 0, 20, 20);


				}

			} else if (skinModel == "slim") {
				console.log(skinModel)
				console.log(getUUID(username))
				if (image.height === 32) {
					ctx.drawImage(image, 8, 8, 8, 8, 8, 3, 8, 8); // Head (bottom layer)
					ctx.drawImage(image, 4, 8, 4, 8, 4, 3, 4, 8); // Head Side (bottom layer)
					ctx.drawImage(image, 44, 20, 2, 9, 15, 11, 2, 9); // Arm Right (bottom layer)
					ctx.drawImage(image, 20, 20, 7, 9, 8, 13, 7, 9); // Chest (Bottom layer)
					ctx.drawImage(image, 44, 20, 3, 9, 4, 11, 3, 9); // Arm Left (bottom layer)
					ctx.drawImage(image, 41, 20, 3, 9, 1, 11, 3, 9); // Arm Left Side (bottom layer)
					ctx.drawImage(image, 40, 8, 8, 8, 8, 3, 8, 8); // Head (top layer)
					ctx.drawImage(image, 32, 8, 3, 8, 3, 3, 3, 8); // Head Side (top layer)
					ctx.drawImage(image, 37, 8, 3, 8, 6, 3, 3, 8); // Head Side 2 (top layer)
					ctx.drawImage(shadingslim, 0, 0, 20, 20)

				} else {
					// * BOTTOM LAYER
					ctx.drawImage(image, 8, 8, 8, 8, 8, 3, 8, 8); // Head (bottom layer)
					ctx.drawImage(image, 4, 8, 4, 8, 4, 3, 4, 8); // Head Side (bottom layer)
					ctx.drawImage(image, 36, 52, 2, 9, 15, 11, 2, 9); // Arm Right (bottom layer)
					ctx.drawImage(image, 20, 20, 7, 9, 8, 11, 7, 9); // Chest (Bottom layer)
					ctx.drawImage(image, 44, 20, 3, 9, 5, 11, 3, 9); // Arm Left (bottom layer)
					ctx.drawImage(image, 40, 20, 3, 9, 2, 11, 3, 9); // Arm Left Side (bottom layer)

					// * TOP LAYER
					ctx.drawImage(image, 40, 8, 8, 8, 8, 3, 8, 8); // Head (top layer)
					ctx.drawImage(image, 32, 8, 3, 8, 3, 3, 3, 8); // Head Side (top layer)
					ctx.drawImage(image, 37, 8, 3, 8, 6, 3, 3, 8); // Head Side 2 (top layer)
					ctx.drawImage(image, 44, 36, 2, 9, 15, 11, 2, 9); // Arm Right (top layer)
					ctx.drawImage(image, 20, 36, 7, 9, 8, 11, 7, 9); // Chest (top layer)
					ctx.drawImage(image, 52, 52, 3, 9, 5, 11, 3, 9); // Arm Left (top layer)
					ctx.drawImage(image, 49, 52, 3, 9, 2, 11, 3, 9); // Arm Left Side (top layer)
					ctx.drawImage(shadingslim, 0, 0, 20, 20)
				}
			}

			drawPixelated(canvas,ctx,13,0,-2)


			console.log('<img src="' + canvas.toDataURL() + '" />')

			var newcanvas = document.getElementById("profileCanvas");
			var newctx = newcanvas.getContext("2d");
	
	
			loadImage(canvas.toDataURL()).then((image) => {
				newctx.drawImage(image, 0, 0, 256, 256)
			})


		})





	} catch (e) {
		drawFailed(ctx);
	}
}

function openCanvasContentInNewWindow(canvas) {
	canvas.toBlob(blob => {
	  const objectURL = URL.createObjectURL(blob);
	  window.location.replace(objectURL);
	}, 'image/png');
  }


function drawPixelated(img,context,zoom,x,y){
	if (!zoom) zoom=4; if (!x) x=0; if (!y) y=0;
	if (!img.id) img.id = "__img"+(drawPixelated.lastImageId++);
	var idata = drawPixelated.idataById[img.id];
	if (!idata){
	  const canvas = createCanvas(img.width, img.height);
	  const ctx = canvas.getContext('2d');
	  ctx.drawImage(img,0,0);
	  context.clearRect(0, 0, img.width, img.height);
	  idata = drawPixelated.idataById[img.id] = ctx.getImageData(0,0,img.width,img.height).data;
	}
	for (var x2=0;x2<img.width;++x2){
	  for (var y2=0;y2<img.height;++y2){
		var i=(y2*img.width+x2)*4;
		var r=idata[i  ];
		var g=idata[i+1];
		var b=idata[i+2];
		var a=idata[i+3];
		context.fillStyle = "rgba("+r+","+g+","+b+","+(a/255)+")";
		context.fillRect(x+x2*zoom, y+y2*zoom, zoom, zoom);
	  }
	}
  };
  drawPixelated.idataById={};
  drawPixelated.lastImageId=0;



async function drawFailed(ctx) {
	const failed = await loadImage("/PFP/notFound.png");
	const shading = await loadImage("/20x20pshading.png");
	const backdrop = await loadImage("/backdropshading.png");

	ctx.clearRect(0, 0, 300, 300);
	ctx.drawImage(backdrop, 0, 0, 20, 20);
	ctx.resetTransform();
	ctx.drawImage(failed, 0, 0, 300, 300);
	ctx.scale(16, 16);
	ctx.drawImage(shading, 0, 0, 20, 20)
}

export default generatePfp