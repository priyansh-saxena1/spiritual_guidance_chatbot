import React from "react"

// Simple toast implementation as placeholder for sonner
const toast = {
  success: (message: string) => console.log('SUCCESS:', message),
  error: (message: string) => console.error('ERROR:', message),
  info: (message: string) => console.log('INFO:', message),
}

type ToasterProps = React.HTMLAttributes<HTMLDivElement>

const Toaster = ({ ...props }: ToasterProps) => {
  // Simple placeholder toaster component
  return <div {...props} style={{ display: 'none' }} />
}

export { Toaster, toast }
