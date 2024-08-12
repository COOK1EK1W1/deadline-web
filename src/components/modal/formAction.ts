"use server"

import prisma from "@/config/prisma"
import { Deadline } from "@prisma/client"
import { sha256 } from "js-sha256"
import { revalidatePath, revalidateTag } from "next/cache"
import { env } from "@/config/env/server"

async function validatePassword(courseCode: string, password: string) {
  const course = await prisma.course.findUnique({
    where:{code: courseCode},
    include: {programme: true}
  })
  return (password === course?.programme.password)
}

export async function createAction(formData: Deadline, password: string) {
  if (!await validatePassword(formData.courseCode, password)){
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

  revalidatePath("/api")
  revalidateTag("deadline-cache")
  return true
}

export async function deleteAction(courseCode: string, password: string, id: number) {
  if (!await validatePassword(courseCode, password)) {
    console.log("password invalid")
    return false
  }

  await prisma.deadline.delete({ where: { id: id} })
  revalidatePath("/api")
  revalidateTag("deadline-cache")
  return true
}

export async function editAction(formData: Deadline, password: string){
  // validate password
  if (!await validatePassword(formData.courseCode, password)) {
    console.log("password invalid")
    return false
  }

  await prisma.deadline.update(
    {data:formData, 
      where:{ id : formData.id}
    }
  )

  revalidateTag("deadline-cache")
  revalidatePath("/api")
  return true
}
