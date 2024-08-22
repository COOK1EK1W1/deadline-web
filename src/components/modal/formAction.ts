"use server"

import prisma from "@/config/prisma"
import { Course, Deadline } from "@prisma/client"
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

async function validatePasswordProgramme(programmeCode: string, password: string) {
  const programme = await prisma.programme.findUnique({
    where:{code: programmeCode},
  })
  return (password === programme?.password)
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




export async function createCourseAction(formData: Course, password: string) {
  if (!await validatePassword(formData.code, password)){
    console.log("password invalid")
    return false
  }

  // add deadline
  try {
    await prisma.course.create({ data: formData})
  } catch (error: unknown) {
    return false;
  }

  revalidatePath("/api")
  revalidateTag("deadline-cache")
  return true
}

export async function deleteCourseAction(courseCode: string, password: string) {
  if (!await validatePassword(courseCode, password)) {
    console.log("password invalid")
    return false
  }

  await prisma.course.delete({ where: { code: courseCode} })
  revalidatePath("/api")
  revalidateTag("deadline-cache")
  return true
}

export async function editCourseAction(formData: Course, password: string){
  // validate password
  if (!await validatePasswordProgramme(formData.programmeCode, password)) {
    console.log("password invalid")
    return false
  }
  
  await prisma.course.upsert(
    {where: {code: formData.code},
    update:{...formData},
    create: {...formData}}
  )

  revalidateTag("deadline-cache")
  revalidatePath("/api")
  return true
}
