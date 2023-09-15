import { NextResponse } from "next/server"
import { revalidatePath, revalidateTag } from "next/cache"
import { sha256 } from "js-sha256"
import prisma from "@/config/prisma"
import { Deadline } from "@prisma/client"

export const dynamic = 'force-dynamic'


function validatePassword(password: string){
  console.log("validating")
  //you though you could just look in the code and find the password ahaha bozo
  const superSecretPassword = "1cf8531a22348eeb2abe9b891c939707aa5abfab759f1f6be7abc4a763968ebc"
  return sha256(password) == superSecretPassword
}

// export async function GET(request: Request){
//   try{
//     const data: Deadline[] = await prisma.deadline.findMany()

//     return NextResponse.json(data)
//   }catch(error){
//     return NextResponse.json({error: error, status: 500});
//   }
  
// }

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