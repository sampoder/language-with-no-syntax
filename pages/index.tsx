import Head from 'next/head'
import { Page, Text, Image, Display, Grid, Textarea, Button, Code, Card, Collapse, Link } from '@geist-ui/core'
import { useState } from 'react'

export default function Home() {
  const redirect = (url: string) => window.open(url)
  const [value, setValue] = useState()
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [stupid, setStupid] = useState(false)
  const handler = (e: any) => {
    setValue(e.target.value)
  }
  const submitHandler = async () => {
    setLoading(true)
    let res = await fetch('/api/execute', {
        method: 'POST',
        body: JSON.stringify({
          input: value
        })
      }).then(r => r.json())
    console.log(res)
    setResult(res.result)
    setLoading(false)
  }
   return (
    <div>
      <Head>
        <title>A Misadventure Into Syntaxless Programming</title>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🤬</text></svg>" />
        <meta property="og:image" content="https://cloud-lh691fdfi-hack-club-bot.vercel.app/0screenshot_2023-10-20_at_6.27.22___pm.png" />
        <meta property="og:description" content="Spoiler alert: it's very cursed. Enjoy!" />
      </Head>
      <Page dotBackdrop width="800px" padding={0}>
        <Text h3>A Misadventure Into Syntaxless Programming</Text>
        <Card my={1}>
          <p><b>Syntax sucks.</b> I don't know about you but sometimes I feel like that, so what if we had a programming language without syntax that simply "figured out" what you wanted it to do? Wouldn't that be great? Well in theory that's what this is. So go ahead, write some code in the box below and see it's output! There's no syntax... so type whatever.</p>
        </Card>
        <Card mb={1}>
          <i style={{cursor: 'pointer'}} onClick={() => setStupid(!stupid)}>This is incredibly stupid...</i>
          {stupid &&
            <><p>
              Yes, yes it is. And that's kind of why I built it... to show why syntax is important and actually helpful. This can be nice at first but it's incredibly frustrating to have the computer essentially guess what you mean.
            </p>
            <p>
              Secretly, all that this is doing is calling ChatGPT and asking it to convert what you type into Python. It then executes that Python on the server and spits out the output. No... I didn't create some insane programming language. Sorry to disappoint.
            </p></>}
        </Card>
        <Textarea width="100%"
         value={value}
         onChange={handler}
         height="200px"
         placeholder={`Print "Hello World"`}
        />
        <Button width="100%" type="success" mt={1} onClick={submitHandler} loading={loading}>Execute</Button>
        <Display my={0} width="100%">
          <Code block>
            {!result ? <i>Execute a "program" to see it's output!</i> : result }
          </Code>
        </Display>
        <Text p style={{textAlign: 'center'}} my={1}>Open-sourced at <Link color href="https://github.com/sampoder/language-with-no-syntax">sampoder/language-with-no-syntax</Link>.</Text>
      </Page>
    </div>
  )
}
