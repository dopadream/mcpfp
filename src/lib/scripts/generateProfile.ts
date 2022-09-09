import { expect } from "chai";

export type TextureCanvas = HTMLCanvasElement | OffscreenCanvas;
export type TextureSource = HTMLImageElement | HTMLVideoElement | ImageBitmap | TextureCanvas;
export type ModelType = "default" | "slim";


import { inferModelType, loadSkinToCanvas, loadImage, isTextureSource } from "skinview-utils";


import { getSkin } from "$lib/rendering/mojang"; 
import { getUUID } from "$lib/rendering/mojang";
import { defaultSkin } from "$lib/rendering/mojang";

async function generateAlexPfp(username: string, ctx: any) {
	try {
		if (!username) {
			drawFailed(ctx);
			return;
		}

		async function loadSkin(src: string) {
			const texture = await loadImage(src);
			const canvas = document.createElement("canvas");
			loadSkinToCanvas(canvas, texture);
			return canvas;
		}

		const skinImage = await loadImage(`https://frozen-tundra-55986.herokuapp.com/https://minotar.net/skin/${username}.png`);
		const UUID = await getUUID(username);
		const skinModel = inferModelType(await loadSkin(skinImage))
		const shading = await loadImage("/20x20pshading.png");
		const shadingslim = await loadImage("/20x20pshadingslim.png");
		const backdrop = await loadImage("/backdropshading.png");

		ctx.clearRect(0, 0, 300, 300);
		ctx.drawImage(backdrop, 0, 0, 20, 20);
		

		if (skinModel == "default") {
		if (skinImage.height === 32) {
			ctx.drawImage(skinImage, 8, 8, 8, 8, 8, 3, 8, 8); // Head (bottom layer)
			ctx.drawImage(skinImage, 4, 8, 4, 8, 4, 3, 4, 8); // Head Side (bottom layer)
			ctx.drawImage(skinImage, 44, 20, 3, 9, 15, 11, 3, 9); // Arm Right (bottom layer)
			ctx.drawImage(skinImage, 20, 20, 7, 9, 8, 11, 7, 9); // Chest (Bottom layer)
			ctx.drawImage(skinImage, 44, 20, 4, 9, 4, 11, 4, 9); // Arm Left (bottom layer)
			ctx.drawImage(skinImage, 41, 20, 3, 9, 1, 11, 3, 9); // Arm Left Side (bottom layer)
			ctx.drawImage(skinImage, 40, 8, 8, 8, 8, 3, 8, 8); // Head (top layer)
			ctx.drawImage(skinImage, 32, 8, 3, 8, 3, 2, 3, 8); // Head Side (top layer)

		} else {
			// * BOTTOM LAYER
			ctx.drawImage(skinImage, 8, 8, 8, 8, 8, 3, 8, 8); // Head (bottom layer)
			ctx.drawImage(skinImage, 4, 8, 4, 8, 4, 3, 4, 8); // Head Side (bottom layer)
			ctx.drawImage(skinImage, 36, 52, 3, 9, 15, 11, 3, 9); // Arm Right (bottom layer)
			ctx.drawImage(skinImage, 20, 20, 7, 9, 8, 11, 7, 9); // Chest (Bottom layer)
			ctx.drawImage(skinImage, 44, 20, 4, 9, 4, 11, 4, 9); // Arm Left (bottom layer)
			ctx.drawImage(skinImage, 41, 52, 3, 9, 1, 11, 3, 9); // Arm Left Side (bottom layer)

			// * TOP LAYER
			ctx.drawImage(skinImage, 40, 8, 8, 8, 8, 3, 8, 8); // Head (top layer)
			ctx.drawImage(skinImage, 32, 8, 3, 8, 3, 2, 3, 8); // Head Side (top layer)
			ctx.drawImage(skinImage, 44, 36, 3, 9, 15, 11, 3, 9); // Arm Right (top layer)
			ctx.drawImage(skinImage, 20, 20, 7, 9, 8, 11, 7, 9); // Chest (top layer)
			ctx.drawImage(skinImage, 52, 52, 4, 9, 4, 11, 4, 9); // Arm Left (top layer)
			ctx.drawImage(skinImage, 49, 52, 3, 9, 1, 11, 3, 9); // Arm Left Side (top layer)
			ctx.drawImage(shading, 0, 0, 20, 20);
		}
	} else if (skinModel == "slim")  {
		console.log(skinModel)
		console.log(getUUID(username))
		if (skinImage.height === 32) {
			ctx.drawImage(skinImage, 8, 8, 8, 8, 8, 3, 8, 8); // Head (bottom layer)
			ctx.drawImage(skinImage, 4, 8, 4, 8, 4, 3, 4, 8); // Head Side (bottom layer)
			ctx.drawImage(skinImage, 44, 20, 2, 9, 15, 11, 2, 9); // Arm Right (bottom layer)
			ctx.drawImage(skinImage, 20, 20, 7, 9, 8, 13, 7, 9); // Chest (Bottom layer)
			ctx.drawImage(skinImage, 44, 20, 3, 9, 4, 11, 3, 9); // Arm Left (bottom layer)
			ctx.drawImage(skinImage, 41, 20, 3, 9, 1, 11, 3, 9); // Arm Left Side (bottom layer)
			ctx.drawImage(skinImage, 40, 8, 8, 8, 8, 3, 8, 8); // Head (top layer)
			ctx.drawImage(skinImage, 32, 8, 3, 8, 3, 2, 3, 8); // Head Side (top layer)

		} else {
			// * BOTTOM LAYER
			ctx.drawImage(skinImage, 8, 8, 8, 8, 8, 3, 8, 8); // Head (bottom layer)
			ctx.drawImage(skinImage, 4, 8, 4, 8, 4, 3, 4, 8); // Head Side (bottom layer)
			ctx.drawImage(skinImage, 36, 52, 2, 9, 15, 11, 2, 9); // Arm Right (bottom layer)
			ctx.drawImage(skinImage, 20, 20, 7, 9, 8, 13, 7, 9); // Chest (Bottom layer)
			ctx.drawImage(skinImage, 44, 20, 3, 9, 5, 11, 3, 9); // Arm Left (bottom layer)
			ctx.drawImage(skinImage, 40, 20, 3, 9, 2, 11, 3, 9); // Arm Left Side (bottom layer)

			// * TOP LAYER
			ctx.drawImage(skinImage, 40, 8, 8, 8, 8, 3, 8, 8); // Head (top layer)
			ctx.drawImage(skinImage, 32, 8, 3, 8, 3, 2, 3, 8); // Head Side (top layer)
			ctx.drawImage(skinImage, 44, 36, 2, 9, 15, 11, 2, 9); // Arm Right (top layer)
			ctx.drawImage(skinImage, 20, 20, 7, 9, 8, 11, 7, 9); // Chest (top layer)
			ctx.drawImage(skinImage, 52, 52, 3, 9, 4, 11, 3, 9); // Arm Left (top layer)
			ctx.drawImage(skinImage, 49, 52, 2, 9, 1, 11, 2, 9); // Arm Left Side (top layer)
			ctx.drawImage(shadingslim, 0, 0, 20, 20);

		}
	}

	console.log(skinModel)

	
	} catch (e) {
		drawFailed(ctx);
	}
}

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

export default generateAlexPfp