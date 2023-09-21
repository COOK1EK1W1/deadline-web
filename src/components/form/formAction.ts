"use server"

import prisma from "@/config/prisma"
import { Deadline } from "@prisma/client"
import { sha256 } from "js-sha256"
import { revalidatePath } from "next/cache"

function validatePassword(password: string) {
  console.log("validating")
  //you though you could just look in the code and find the password ahaha bozo
  const truePassword = process.env.PASSWORD
  if (!truePassword) {
    console.error("no password in env")
    return false
  }
  const superSecretPassword = sha256(truePassword)
  return sha256(password) == superSecretPassword
}

export async function createAction(formData: Deadline, password: string) {
  // validate password
  if (!validatePassword(password)) {
    console.log("password invalid")
    return
  }

  //add deadline
  console.log("query")
  await prisma.deadline.create({ data: formData })
  revalidatePath("/")
}

export async function deleteAction(password: string, oldName: string, oldSubject: string) {

  if (!validatePassword(password)) {
    console.log("password invalid")
    return
  }

  await prisma.deadline.delete({ where: { name_subject: { name: oldName, subject: oldSubject } } })
  revalidatePath("/")

}

export async function editAction(formData: Deadline, password: string, oldName: string, oldSubject: string){
  // validate password
  if (!validatePassword(password)) {
    console.log("password invalid")
    return
  }

  await prisma.deadline.update(
    {data:formData, 
    where:{
      name_subject:{
        name:oldName, subject:oldSubject
      }
    }
  })
}