import React from "react"

export default function RootLayout({ children }) {
  return (
    <>
      <script
        type="module"
        defer
        src="https://cdn.jsdelivr.net/npm/ldrs/dist/auto/helix.js"
      ></script>

      {children}
    </>
  )
}