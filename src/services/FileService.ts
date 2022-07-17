import mongoose from "mongoose";
import { FileResponseDto } from "../interfaces/file/FileResponseDto";
import File from "../models/File";

const createFile = async (link: string, fileName: string): Promise<FileResponseDto> => {
    try {
        const file = new File({
            link,
            fileName
        });

        await file.save();

        const data = {
            _id: file._id,
            link
        }

        return data;

    } catch (error) {
        console.log(error);
        throw error;
    }
}


export default {
    createFile,
}