import { useState } from 'react'
import QRCode from 'react-qrcode-logo'
import './QrCodePage.css'

const QR_CODE_ID = 'generated-qr-code'
const MIN_SIZE = 64
const MAX_SIZE = 1024

const QrCodePage = () => {
  const [data, setData] = useState('')
  const [sizeInput, setSizeInput] = useState('256')
  const [error, setError] = useState('')

  const size = Number(sizeInput)
  const isSizeValid = Number.isInteger(size) && size >= MIN_SIZE && size <= MAX_SIZE
  const hasQrCode = data.trim().length > 0 && isSizeValid

  const handleDownload = () => {
    const canvas = document.getElementById(QR_CODE_ID)

    if (!(canvas instanceof HTMLCanvasElement)) {
      setError('The QR code is not ready to download. Please try again.')
      return
    }

    try {
      const link = document.createElement('a')
      link.href = canvas.toDataURL('image/png')
      link.download = 'qr-code.png'
      link.click()
      setError('')
    } catch (downloadError) {
      console.error('Unable to download QR code:', downloadError)
      setError('The QR code could not be downloaded. Please try again.')
    }
  }

  const handlePrint = () => {
    setError('')
    window.print()
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">QR code generator</h1>
          <p className="mt-2 text-sm text-gray-600">
            Enter text or a link, choose a size, then print or download your QR code.
          </p>
        </div>

        <div className="qr-controls grid gap-5 sm:grid-cols-2">
          <label className="sm:col-span-2">
            <span className="mb-2 block text-sm font-medium text-gray-700">Data</span>
            <textarea
              className="min-h-28 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              value={data}
              onChange={(event) => {
                setData(event.target.value)
                setError('')
              }}
              placeholder="Enter text, a URL, or any other data"
              rows={4}
            />
          </label>

          <label>
            <span className="mb-2 block text-sm font-medium text-gray-700">Size (pixels)</span>
            <input
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              type="number"
              min={MIN_SIZE}
              max={MAX_SIZE}
              step="1"
              value={sizeInput}
              onChange={(event) => {
                setSizeInput(event.target.value)
                setError('')
              }}
              aria-invalid={!isSizeValid}
              aria-describedby="qr-size-help"
            />
            <span id="qr-size-help" className="mt-1 block text-xs text-gray-500">
              Choose a size from {MIN_SIZE} to {MAX_SIZE} pixels.
            </span>
          </label>
        </div>

        {!isSizeValid && (
          <p className="mt-4 text-sm text-red-600" role="alert">
            Enter a whole number between {MIN_SIZE} and {MAX_SIZE}.
          </p>
        )}

        {error && (
          <p className="mt-4 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}

        <div className="mt-8 flex min-h-64 items-center justify-center rounded-lg bg-gray-50 p-4">
          {hasQrCode ? (
            <div className="qr-printable flex flex-col items-center gap-3">
              <QRCode fgColor="#2f4646" logoOpacity={0.6} removeQrCodeBehindLogo={false} logoImage='./rn1.png' qrStyle='dots' id={QR_CODE_ID} value={data} logoWidth={size + 30} logoHeight={size + 30} size={size} />
              <span className="qr-print-label max-w-full break-all text-center text-xs text-gray-500">
                {data}
              </span>
            </div>
          ) : (
            <p className="text-center text-sm text-gray-500">
              {data.trim() ? 'Choose a valid size to generate your QR code.' : 'Your QR code will appear here.'}
            </p>
          )}
        </div>

        <div className="qr-controls mt-6 flex flex-wrap justify-center gap-3">
          <button
            className="rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            type="button"
            onClick={handlePrint}
            disabled={!hasQrCode}
          >
            Print QR code
          </button>
          <button
            className="rounded-md border border-blue-600 px-5 py-2.5 text-sm font-medium text-blue-700 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
            type="button"
            onClick={handleDownload}
            disabled={!hasQrCode}
          >
            Download PNG
          </button>
        </div>
      </section>
    </main>
  )
}

export default QrCodePage
