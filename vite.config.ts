import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import OpenAI from 'openai'

function readBody(req: any): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = ''
    req.on('data', (chunk: Buffer) => {
      data += chunk.toString()
    })
    req.on('end', () => resolve(data))
    req.on('error', reject)
  })
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const openAiApiKey =
    env.OPENAI_API_KEY ||
    process.env.OPENAI_API_KEY ||
    env.VITE_OPENAI_API_KEY ||
    process.env.VITE_OPENAI_API_KEY

  return {
    plugins: [
    react(),
    tailwindcss(),
    {
      name: 'local-chat-api',
      configureServer(server) {
        server.middlewares.use('/api/chat', async (req, res, next) => {
          if (req.method !== 'POST') return next()

          try {
            const rawBody = await readBody(req)
            const parsed = rawBody ? JSON.parse(rawBody) : {}
            const message = parsed?.message
            const context = parsed?.context

            if (!message) {
              res.statusCode = 400
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ error: 'Missing message' }))
              return
            }

            if (!openAiApiKey) {
              res.statusCode = 500
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ error: 'OPENAI_API_KEY is not set in your environment' }))
              return
            }

            const client = new OpenAI({ apiKey: openAiApiKey })
            const input = context
              ? [
                  {
                    role: 'system',
                    content:
                      'You are assisting with Time & Attendance operations. Prefer answers grounded in the provided operational context. If context is missing for a requested detail, say what is missing.',
                  },
                  {
                    role: 'system',
                    content: `Current Time & Attendance context:\n${JSON.stringify(context, null, 2)}`,
                  },
                  {
                    role: 'user',
                    content: message,
                  },
                ]
              : message
            const response = await client.responses.create({
              model: 'gpt-4o-mini',
              input,
            })

            const text = response.output_text ?? (response.output?.[0] as any)?.content?.[0]?.text ?? ''
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ text }))
          } catch (error: any) {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: error?.message ?? 'Unknown server error' }))
          }
        })
      },
    },
    ],
    server: {
      port: 5401,
    },
  }
})
