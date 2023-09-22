import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { sha256 } from "js-sha256"
import prisma from "@/config/prisma"
import { Deadline } from "@prisma/client"
import { env } from '@/config/env/server';

export const dynamic = 'force-dynamic'


function validatePassword(password: string){
  console.log("validating")
  const truePassword = env.PASSWORD
  if (!truePassword) {
    console.error("no password in env")
    return false
  }
  const superSecretPassword = sha256(truePassword)
  return sha256(password) == superSecretPassword
}


export async function POST(request: Request){
  try{
    if (!request.body){
      return NextResponse.json({error: "Invalid request"}, {status: 500})
    }

    //TODO add validation for type
    let data: Deadline&{password: string} = await JSON.parse(await request.text())
    console.log(data)
    if (!validatePassword(data.password)){
      return NextResponse.json({error: "Permission denied"}, {status: 401})
    }

    const {password, ...rest} = data;
    await prisma.deadline.create({data:rest})

    console.log("query")
    revalidatePath("/")
    return NextResponse.json({status: 200})
    
  }catch(err){
    console.log(err)
    return NextResponse.json({error: err}, {status: 500})
  }
  
}

export async function DELETE(request: Request){
  try{
    const data: Deadline&{password:string} = await JSON.parse(await request.text())
    console.log("query")
    if (!validatePassword(data.password)){
      return NextResponse.json({error: "Permission denied"}, {status: 401})
    }
    console.log(data)
    await prisma.deadline.delete({where :{name_subject: {name: data.name, subject:data.subject}}})
    revalidatePath("/")
    return NextResponse.json({status: 200})
    
  }catch(err){
    console.log(err)
    return NextResponse.json({error: err}, {status: 500})

  }
}

export async function PUT(request: Request){
  try{
    const data: Deadline&{password: string, oldName: string, oldSubject: string} = await JSON.parse(await request.text())
    if (!validatePassword(data.password)){
      return NextResponse.json({error: "Permission denied"}, {status: 401})
    }

    console.log("query")
    const {password, oldName, oldSubject, ...rest} = data
    
    await prisma.deadline.update(
      {data:rest, 
      where:{
        name_subject:{
          name:oldName, subject:oldSubject
        }
      }
    })

    revalidatePath("/")
    console.log(data)
    return NextResponse.json({status: 200})

  }catch(err){
    console.log(err)
    return NextResponse.json({error: err}, {status: 500})

  }
}