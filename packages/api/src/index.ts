import { PrismaClient } from '@prisma/client'
import { Hono } from 'hono'

interface Student {
  id: string
  name: string
  school: string
  major: string
  score?: number
  isPassed?: boolean
  note?: string
}

const prisma = new PrismaClient()
const app = new Hono().basePath('/api')

app.post('/student', async (c) => {
  const student = await c.req.json()
  await prisma.student.create({ data: student })
  return c.text('', 201)
})

app.get('/student/:id', async (c) => {
  const { id } = c.req.param()
  const student = await prisma.student.findUnique({
    where: { id },
    select: { id: true, name: true, isPassed: true },
  })
  return student !== null ? c.json(student) : c.text('', 404)
})

app.get('/students', async (c) => {
  const students = await prisma.student.findMany()
  return c.json(students)
})

app.put('/students', async (c) => {
  const students = (await c.req.json()) as Student[]
  const execution = students.map((student) =>
    prisma.student.update({
      where: { id: student.id },
      data: student,
    })
  )
  await Promise.all(execution)
  return c.text('', 200)
})

export default app
