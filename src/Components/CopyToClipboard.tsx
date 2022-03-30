import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { ReactComponent as Copied } from '../ImageAssets/copied.svg'
import { ReactComponent as Copy } from '../ImageAssets/copy2clipboard_light.svg'

interface CopyText {
  text: string
}
const Container = styled.div`
  width: fit-content;
  height: fit-content;
  display: flex;
`
const CopySvg = styled(Copy)`
  fill: ${(props) => props.theme.btnborder};
  cursor: pointer;
`
const CopiedSvg = styled(Copied)`
  stroke: ${(props) => props.theme.btnborder};
  width: 22px;
  height: 22px;
`

export const CopyToClipboard = (props: CopyText) => {
  const [copied, setCopied] = useState<boolean>(false)

  const handleCopy = () => {
    setCopied(true)
    navigator.clipboard.writeText(props.text)
  }
  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => setCopied(false), 1000)
      return () => {
        clearTimeout(timeout)
      }
    }
  }, [copied])

  return (
    <Container>
      {copied ? <CopiedSvg /> : <CopySvg onClick={() => handleCopy()} />}
    </Container>
  )
}
