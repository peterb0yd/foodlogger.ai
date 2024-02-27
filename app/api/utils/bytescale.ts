import * as Bytescale from "@bytescale/sdk";

export const bytescaleUploader = new Bytescale.UploadManager({
    apiKey: process.env.BYTE_SCALE_API_KEY as string,
})

export const bytescaleProcesser = new Bytescale.FileApi({
    apiKey: process.env.BYTE_SCALE_API_KEY as string,
})

export const BytescaleUrlBuilder = Bytescale.UrlBuilder;