"use server"

import prisma from "@/config/prisma"
import { Deadline } from "@prisma/client"
import { sha256 } from "js-sha256"
import { revalidatePath } from "next/cache"
import { env } from "@/config/env/server"

function validatePassword(password: string) {
  const superSecretPassword = sha256(env.PASSWORD)
  return sha256(password) == superSecretPassword
}

export async function createAction(formData: Deadline, password: string) {
  // validate password
  if (!validatePassword(password)) {
    console.log("password invalid")
    return false
  }

  //add deadline
  console.log("query")
  await prisma.deadline.create({ data: formData })
  revalidatePath("/")
  return true
}

export async function deleteAction(password: string, oldName: string, oldSubject: string) {

  if (!validatePassword(password)) {
    console.log("password invalid")
    return false
  }

  await prisma.deadline.delete({ where: { name_subject: { name: oldName, subject: oldSubject } } })
  revalidatePath("/")
  return true

}

export async function editAction(formData: Deadline, password: string, oldName: string, oldSubject: string){
  // validate password
  if (!validatePassword(password)) {
    console.log("password invalid")
    return false
  }

  await prisma.deadline.update(
    {data:formData, 
    where:{
      name_subject:{
        name:oldName, subject:oldSubject
      }
    }
  })



  revalidatePath("/")
  return true
}