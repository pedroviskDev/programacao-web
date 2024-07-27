import { PrismaClient, Major } from "@prisma/client";

import { createMajorDto } from "../types/major";

const prisma = new PrismaClient();

export const createMajor = async (major: createMajorDto): Promise<Major> =>{
    return prisma.major.create({data: major});
}

export const getMajors = async (): Promise<Major[]>=>{
    return prisma.major.findMany();
}

export const getMajor = async (id: string): Promise<Major | null> =>{
    return prisma.major.findUnique({where: {id} });
}