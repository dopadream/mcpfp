import type { Canvas } from "canvas";



async function mergeCanvases(canvases: Canvas[]) {
	const canvas = document.createElement("canvas");
	canvas.width = canvases[0].width;
	canvas.height = canvases[0].height;

	const ctx = canvas.getContext("2d");
	for (const c of canvases) {
		const imageVersion = new Image();
		await new Promise(r => {
			imageVersion.onload = r, imageVersion.src = c.toDataURL()
		})
		ctx.drawImage(imageVersion, 0, 0)
	}

	return canvas
}

export {
	mergeCanvases
}