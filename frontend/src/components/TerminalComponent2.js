import React from 'react'
import { XTerm } from 'react-xtermjs'

const TerminalComponent2 = () => {
  const onData = (data) => {
    console.log(`Received data: ${data}`)
  }

  const onResize = (cols, rows) => {
    console.log(`Terminal resized to ${cols} columns and ${rows} rows`)
  }

  return (
    <XTerm
      onData={onData}
      onResize={onResize}
      options={{ cursorBlink: true }}
      style={{ width: '100%', height: '100%' }}
    />
  )
}
export default TerminalComponent2;
