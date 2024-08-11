"use server"

import prisma from "@/config/prisma"
import { Deadline } from "@prisma/client"
import { sha256 } from "js-sha256"
import { revalidatePath } from "next/cache"
import { env } from "@/config/env/server"

async function validatePassword(courseCode: string, password: string) {
  const course = await prisma.course.findUnique({
    where:{code: courseCode},
    include: {programme: true}
  })
  return sha256(password) == course?.programme.password
}

export async function createAction(formData: Deadline, password: string) {
  // validate password
  if (!validatePassword(formData.courseCode, password)) {
    console.log("password invalid")
    return false
  }

  // add deadline
  try {
    const { id, ...data } = formData
    await prisma.deadline.create({ data: data})
  } catch (error: unknown) {
    return false;
  }

  revalidatePath("/")
  revalidatePath("/api")
  return true
}

export async function deleteAction(courseCode: string, password: string, id: number) {
  if (!validatePassword(courseCode, password)) {
    console.log("password invalid")
    return false
  }

  await prisma.deadline.delete({ where: { id: id} })
  revalidatePath("/api")
  revalidatePath("/")
  return true
}

export async function editAction(formData: Deadline, password: string){
  // validate password
  if (!validatePassword(formData.courseCode, password)) {
    console.log("password invalid")
    return false
  }

  await prisma.deadline.update(
    {data:formData, 
      where:{ id : formData.id}
    }
  )

  revalidatePath("/")
  revalidatePath("/api")
  return true
}
