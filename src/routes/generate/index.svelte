<script lang="ts">
    // @ts-ignore else svelte gets errored? dk why tbh
    import { onMount } from "svelte";
    import SaveButton from "@components/SaveButton.svelte";
    import ArrowButton from "@components/ArrowButton.svelte";
    import Popup from "@components/Popup.svelte";
    import SEO from "@components/SEO.svelte";
    import generatePfp from "@scripts/generateProfile";
    import { mergeCanvases } from "@scripts/utils";
    import { defaultSkin } from "$lib/rendering/mojang";
    import { getUUID } from "$lib/rendering/mojang";
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";

    const urlSearchParamIGN = $page.url.searchParams.get("ign") || null;






    let username = "";
    let firefoxPopup = false;

    function dataURItoBlob(dataURI) {
        // convert base64 to raw binary data held in a string
        // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
        var byteString = atob(dataURI.split(",")[1]);

        // separate out the mime component
        var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

        // write the bytes of the string to an ArrayBuffer
        var ab = new ArrayBuffer(byteString.length);

        // create a view into the buffer
        var ia = new Uint8Array(ab);

        // set the bytes of the buffer to the correct values
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        // write the ArrayBuffer to a blob, and you're done
        var blob = new Blob([ab], { type: mimeString });
        return blob;
    }

    let profileCanvas: HTMLCanvasElement;
    let profileCtx: CanvasRenderingContext2D;
    onMount(async () => {
        if (!urlSearchParamIGN)
            goto("/generate?ign=enbnuuy", { replaceState: false });
        else username = urlSearchParamIGN.replace(/[^a-z0-9_]/gi, "");

        profileCanvas = window.document.getElementById(
            "profileCanvas"
        ) as HTMLCanvasElement;
        profileCanvas.width = 300;
        profileCanvas.height = 300;
        profileCtx = profileCanvas.getContext("2d");
        profileCtx.scale(16, 16);
        profileCtx.imageSmoothingEnabled = false;

        await generatePfp(username || "dopadream", profileCtx);

        redirectToPicture();

    });

    // async function savePicture() {
    //     const merged = await mergeCanvases([profileCanvas]);
    //     const link = document.createElement("a");
    //     link.download = `mcpfp - ${username || "unknown"}.png`;
    //     link.href = merged.toDataURL();
    //     link.click();
    // }

    // async function copyPicture() {
    //     if (navigator.userAgent.indexOf("Firefox") != -1) {
    //         if (!firefoxPopup) {
    //             firefoxPopup = true;
    //             setTimeout(() => (firefoxPopup = false), 5000);
    //         }
    //     } else {
    //         const merged = await mergeCanvases([profileCanvas]);
    //         merged.toBlob(function (blob) {
    //             const item = new ClipboardItem({ "image/png": blob });
    //             navigator.clipboard.write([item]);
    //         });
    //     }
    // }

    async function redirectToPicture() {
        const merged = await mergeCanvases([profileCanvas]);
        const url = merged.toDataURL();
        dataURItoBlob(url);
            merged.toBlob(function (blob) {
                const objectURL = URL.createObjectURL(blob);
                window.location.replace(objectURL);
            });
        }

    


    // let timeout;
    // async function validateInput(e) {
    //     username = username.replace(/[^a-z0-9_]/gi, "");

    //     try {
    //         await generatePfp(username, profileCtx);

    //         clearTimeout(timeout);
    //         timeout = setTimeout(async () => {
    //             await generatePfp(username, profileCtx);
    //             goto(`/generate?ign=${username}`, {
    //                 replaceState: true,
    //                 keepfocus: true,
    //             });
    //         }, 0);
    //     } catch (e) {
    //         await generatePfp(null, profileCtx);
    //     }
    // }


	// // you may need to edit this code once to get it to work..
	// // hacky way to get the userbase code (puttin in svelte:head didn't work)
    // var script = document.createElement( "script" );
    // script.src='https://sdk.userbase.com/2/userbase.js';
    // document.head.appendChild( script );
    // let user = null;
    // const {userbase} = window; window.userbase = null;
    // const databaseName = 'files';
    // let fileItems = [];
    // const changeHandler = (items) => fileItems = items;
    // let uploadFilePromise;
    // function uploadFile(e) {
    //     const file = e.target.files[0];
    //     const randomId = Math.random().toString().substring(2);
    //     uploadFilePromise = userbase.insertItem({databaseName, item: randomId})
    //         .then(() => {
    //             const {itemId} = fileItems.filter(({fileId, item}) => randomId === item && !fileId)[0];
    //             userbase.uploadFile({databaseName, itemId, file});
    //         })
    // }
    // let filesCache = {};
    // async function getFile(fileId) {
    //     const {file} = await userbase.getFile({databaseName, fileId});
    //     filesCache[fileId] = file;
    //     return file;
    // }
    // let atBottom = false; let imagesToShow = 2;
    // $: if (atBottom && imagesToShow < fileItems.length) imagesToShow += 1

</script>

<SEO
    description="Generate a free profile picture for {urlSearchParamIGN}!"
    username={urlSearchParamIGN}
/>

<div id="wrapper">
    <div id="preview">
        <!-- <div id="inputWrapper">
            <input
                type="text"
                spellcheck="false"
                maxlength="16"
                pattern="[a-zA-Z0-9_]+"
                bind:value={username}
                on:input={validateInput}
                placeholder="Enter username"
            />
        </div> -->

        <div id="uiWrapper">
            <div id="canvasWrapper">
                <canvas id="profileCanvas" />
            </div>
        </div>

        <!-- <div id="SaveButtonWrapper">
            <SaveButton on:click={savePicture} text="save" />
            <SaveButton on:click={copyPicture} text="copy" />
        </div> -->
    </div>

    <!-- {#if firefoxPopup}
        <Popup type="failed" message="Firefox does not support this :(" />
    {/if} -->
</div>

<!-- <style lang="scss">
    $background-color: #1b2531;
    $background-color-dark: #191f27;
    $coloured-text: #da4167;


    #wrapper {
        height: calc(100vh - 20rem - 5rem);
        width: 100%;

        display: flex;
        flex-direction: row;
        align-items: center;
    }

    #preview {
        display: inline-block;
        width: auto;
        height: auto;

        margin-left: 0rem;
        margin-bottom: 0rem;

        #uiWrapper {
            // display: flex;
            // align-items: center;
        }

        #canvasWrapper {

        }

        // #SaveButtonWrapper {
        //     margin-top: 2rem;
        //     display: flex;
        //     flex-direction: row;

        //     gap: 2rem;

        //     justify-content: center;
        // }

        // #inputWrapper {
        //     display: flex;
        //     align-self: center;

        //     input {
        //         margin-left: auto;
        //         margin-right: auto;
        //         margin-bottom: 1rem;

        //         color: $lightMode-background-color;
        //         filter: drop-shadow(7px 7px 4px rgba(0, 0, 0, 0.25));

        //         background-color: transparent;
        //         border: none;

        //         font-size: 2rem;
        //         text-align: center;

        //         &:focus {
        //             outline: none !important;
        //         }

        //         &:invalid {
        //             color: #ff5555;
        //         }
        //     }
        // }
    }

    :global(body.dark-mode) #preview #inputWrapper input {
        color: $background-color-dark;
    }

    // @media only screen and (max-width: 810px) {
    //     #wrapper {
    //         flex-direction: column;
    //         align-items: center;
    //         justify-content: center;
    //     }

    //     #preview {
    //         margin-left: 0;
    //         margin-right: 0;

    //         #canvasWrapper {
    //             #profileCanvas {
    //                 position: absolute;

    //                 left: 0;
    //                 top: 0;
    //             }

    //             canvas {
    //                 $scale-factor: 1.4;
    //                 width: calc(320px / $scale-factor);
    //                 height: calc(320px / $scale-factor);
    //             }
    //         }

    //         // #SaveButtonWrapper {
    //         //     margin-top: 1rem;
    //         //     gap: 1rem;
    //         // }

    //         // #inputWrapper {
    //         //     display: flex;
    //         //     align-self: center;

    //         //     input {
    //         //         margin-left: auto;
    //         //         margin-right: auto;
    //         //         margin-bottom: 1rem;

    //         //         color: $lightMode-background-color;
    //         //         filter: drop-shadow(7px 7px 4px rgba(0, 0, 0, 0.25));

    //         //         background-color: transparent;
    //         //         border: none;

    //         //         font-size: 2rem;
    //         //         text-align: center;

    //         //         &:focus {
    //         //             outline: none !important;
    //         //         }

    //         //         &:invalid {
    //         //             color: #ff5555;
    //         //         }
    //         //     }
    //         // }
    //     }
    // }
</style> -->
